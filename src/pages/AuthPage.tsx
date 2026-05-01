import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Lock, 
  User, 
  Briefcase, 
  Phone, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Chrome, 
  Github,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { cn } from '../../lib/utils';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import { PlanTier } from '../contexts/SubscriptionContext';

// Reuse shadcn-like components if available, otherwise define minimal premium ones
const Input = ({ label, type, placeholder, icon: Icon, value, onChange, error, togglePassword }: any) => {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="space-y-2 w-full group">
      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-primary transition-colors">
        {label}
      </label>
      <div className="relative">
        <div className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300",
          "group-focus-within:text-primary"
        )}>
          {Icon && <Icon size={18} />}
        </div>
        <input
          type={isPassword ? (show ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            "w-full bg-[#12121A] border border-[#2A2A35] rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 transition-all duration-300 outline-none",
            "focus:border-primary focus:shadow-[0_0_20px_rgba(124,58,237,0.15)] focus:ring-1 focus:ring-primary/20",
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider mt-1">{error}</p>}
    </div>
  );
};

const Button = ({ children, className, loading, ...props }: any) => (
  <button
    className={cn(
      "w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(124,58,237,0.3)] hover:shadow-[0_15px_40px_rgba(124,58,237,0.4)]",
      className
    )}
    disabled={loading}
    {...props}
  >
    {loading ? (
      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    ) : (
      <>
        {children}
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </>
    )}
  </button>
);

interface AuthPageProps {
  onSuccess: (user: any) => void;
  onBackToHome?: () => void;
  initialTab?: 'login' | 'signup';
  initialPlan?: PlanTier;
}

export const AuthPage: React.FC<AuthPageProps> = ({ 
  onSuccess, 
  onBackToHome, 
  initialTab = 'login',
  initialPlan = 'Starter'
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    businessName: '',
    businessType: 'Solar Company',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeTab === 'signup') {
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            setIsLoading(false);
            return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // Create user profile in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          userId: user.uid,
          email: formData.email,
          fullName: formData.fullName,
          businessName: formData.businessName,
          businessType: formData.businessType,
          plan: initialPlan,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        await updateProfile(user, { displayName: formData.fullName });

        setShowSuccess(true);
        setTimeout(() => {
          onSuccess(user);
        }, 2000);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        onSuccess(userCredential.user);
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center p-6 text-white font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 max-w-md"
        >
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-primary/20 rounded-3xl flex items-center justify-center text-primary border border-primary/30 relative">
              <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full" />
              <CheckCircle2 size={48} className="relative mb-0.5 ml-0.5" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight">Welcome to Purple 🚀</h1>
            <p className="text-slate-400 font-medium">Let's get your automation set up.</p>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] flex flex-col lg:flex-row text-white font-sans overflow-hidden">
      {/* Left Side: Branding / Value Prop */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-[#0B0B0F] via-[#12121A] to-[#0B0B0F] p-20 flex-col justify-between overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px] -z-10" />
        
        <div className="relative z-10">
          <button 
            onClick={onBackToHome}
            className="mb-20 hover:opacity-80 transition-opacity cursor-pointer text-left"
          >
            <Logo className="text-white" />
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl space-y-8"
          >
            <h1 className="text-6xl font-black tracking-tight leading-[1.1]">
              Automate Your Lead <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Follow-Up.</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Join South African service businesses using Purple to turn leads into booked appointments automatically.
            </p>
            
            {/* Visual Element */}
            <div className="mt-12 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#12121A]/80 border border-white/5 rounded-3xl p-1 backdrop-blur-xl">
                 <div className="bg-[#0B0B0F] rounded-[1.4rem] p-6 space-y-4">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                       <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                          <Sparkles size={20} />
                       </div>
                       <div>
                          <div className="text-xs font-black uppercase tracking-widest text-slate-500">AI Automation</div>
                          <div className="text-sm font-bold">New appointment booked</div>
                       </div>
                    </div>
                    <div className="space-y-2 opacity-50">
                       <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                       <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 border-t border-white/5 pt-10 mt-20">
           <p className="text-slate-500 font-bold tracking-wide">
             "Purple paid for itself in the first week just from improved follow-up speed."
           </p>
           <span className="text-xs font-black uppercase tracking-[0.2em] text-primary mt-2 block">Andre P., Contractor</span>
        </div>
      </div>

      {/* Right Side: Auth Card */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-[#0B0B0F] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.05),transparent_70%)] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md z-10"
        >
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight mb-2">
               {activeTab === 'login' ? 'Welcome Back.' : 'Get Started.'}
            </h2>
            <p className="text-slate-500 font-medium">
               {activeTab === 'login' ? 'Log in to manage your automations.' : 'Join hundreds of SA business owners.'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-[#12121A] p-1 rounded-2xl mb-8 border border-[#2A2A35]">
            {(['login', 'signup'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-3 px-6 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 relative",
                  activeTab === tab ? "text-white" : "text-slate-500 hover:text-slate-300"
                )}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#2A2A35] rounded-xl z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab === 'login' ? 'Login' : 'Sign Up'}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === 'login' ? (
                <motion.div
                  key="login-fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <Input 
                    label="Email Address" 
                    type="email" 
                    placeholder="name@business.co.za" 
                    icon={Mail} 
                    value={formData.email}
                    onChange={(e: any) => handleInputChange('email', e.target.value)}
                  />
                  <Input 
                    label="Password" 
                    type="password" 
                    placeholder="••••••••" 
                    icon={Lock} 
                    value={formData.password}
                    onChange={(e: any) => handleInputChange('password', e.target.value)}
                  />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="w-5 h-5 bg-[#12121A] border border-[#2A2A35] rounded-md flex items-center justify-center transition-all group-hover:border-primary">
                        <input type="checkbox" className="hidden" />
                        {/* Custom checkbox icon if needed */}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Remember Me</span>
                    </label>
                    <button type="button" className="text-[11px] font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
                      Forgot Password?
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="signup-fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Full Name" type="text" placeholder="John Doe" icon={User} value={formData.fullName} onChange={(e: any) => handleInputChange('fullName', e.target.value)} />
                    <Input label="Business Name" type="text" placeholder="Doe Solar Pty" icon={Briefcase} value={formData.businessName} onChange={(e: any) => handleInputChange('businessName', e.target.value)} />
                  </div>
                  <Input label="Email Address" type="email" placeholder="name@business.so.za" icon={Mail} value={formData.email} onChange={(e: any) => handleInputChange('email', e.target.value)} />
                  <Input label="Phone Number" type="tel" placeholder="+27 71 123 4567" icon={Phone} />
                  
                  <div className="space-y-2 group">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-primary">
                      Business Type
                    </label>
                    <select 
                      value={formData.businessType}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      className="w-full bg-[#12121A] border border-[#2A2A35] rounded-2xl py-4 px-6 text-white appearance-none focus:border-primary focus:shadow-[0_0_20px_rgba(124,58,237,0.15)] outline-none group-focus-within:border-primary"
                    >
                      <option>Solar Company</option>
                      <option>Dental Clinic</option>
                      <option>Security Company</option>
                      <option>Contractor</option>
                      <option>Real Estate</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Password" type="password" placeholder="••••••••" icon={Lock} value={formData.password} onChange={(e: any) => handleInputChange('password', e.target.value)} />
                    <Input label="Confirm Password" type="password" placeholder="••••••••" icon={Lock} value={formData.confirmPassword} onChange={(e: any) => handleInputChange('confirmPassword', e.target.value)} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button type="submit" loading={isLoading}>
              {activeTab === 'login' ? 'Login to Purple' : 'Start Free 14-Day Trial'}
            </Button>
          </form>

          {/* Social Logins */}
          <div className="mt-10">
            <div className="relative mb-10 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <span className="relative bg-[#0B0B0F] px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                Or Continue With
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 bg-[#12121A] border border-[#2A2A35] hover:bg-[#1A1A24] text-white py-3.5 rounded-2xl font-bold text-sm transition-all duration-300">
                <Chrome size={18} />
                Google
              </button>
              <button className="flex items-center justify-center gap-3 bg-[#12121A] border border-[#2A2A35] hover:bg-[#1A1A24] text-white py-3.5 rounded-2xl font-bold text-sm transition-all duration-300">
                <Github size={18} />
                GitHub
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-loose">
            By continuing, you agree to Purple's <br/>
            <span className="text-slate-400 hover:text-primary cursor-pointer transition-colors">Terms of Service</span> and <span className="text-slate-400 hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
