import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';

export type PlanTier = 'Starter' | 'Growth' | 'Professional';

interface SubscriptionContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isFeatureLocked: (feature: string) => boolean;
  upgradePlan: (newPlan: PlanTier) => Promise<void>;
}

interface UserProfile {
  userId: string;
  email: string;
  plan: PlanTier;
  fullName?: string;
  businessName?: string;
  createdAt: string;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const PLANS: Record<PlanTier, { name: string; leadLimit: number; features: string[] }> = {
  Starter: {
    name: 'Starter',
    leadLimit: 50,
    features: ['overview', 'leads', 'forms', 'pipeline', 'basic_automations', 'calendar', 'settings']
  },
  Growth: {
    name: 'Growth',
    leadLimit: 500,
    features: ['overview', 'leads', 'forms', 'pipeline', 'basic_automations', 'calendar', 'settings', 'ai_qualification', 'multi_step_automations', 'whatsapp_sms', 'advanced_analytics']
  },
  Professional: {
    name: 'Professional',
    leadLimit: 1000000,
    features: ['all']
  }
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Subscribe to profile changes
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const unsubProfile = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            // New user, create default profile if not exists (though usually handled at signup)
          }
          setLoading(false);
        });
        return () => unsubProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const isFeatureLocked = (feature: string) => {
    if (!profile) return true;
    const plan = PLANS[profile.plan];
    if (plan.features.includes('all')) return false;
    return !plan.features.includes(feature);
  };

  const upgradePlan = async (newPlan: PlanTier) => {
    if (!user) return;
    await setDoc(doc(db, 'users', user.uid), { plan: newPlan }, { merge: true });
  };

  return (
    <SubscriptionContext.Provider value={{ user, profile, loading, isFeatureLocked, upgradePlan }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
