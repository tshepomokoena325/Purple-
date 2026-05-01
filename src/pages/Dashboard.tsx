import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  LayoutDashboard, 
  MessageSquare, 
  Calendar as CalendarIcon, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Plus,
  Kanban,
  Zap,
  TrendingUp,
  CreditCard,
  Menu,
  X,
  Download,
  Lock
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { cn } from '../../lib/utils';
import { useSubscription, PLANS, PlanTier } from '../contexts/SubscriptionContext';
import { FeatureGated } from '../components/FeatureGated';
import { UpgradeModal } from '../components/UpgradeModal';

// Sub-views
import { DashboardHome } from '../components/DashboardHome';
import { LeadsView } from '../components/LeadsView';
import { PipelineView } from '../components/PipelineView';
import { ConversationsView } from '../components/ConversationsView';
import { AutomationsView } from '../components/AutomationsView';

// New components
import { AddLeadModal } from '../components/AddLeadModal';
import { Toast, ToastMessage, ToastType } from '../components/Toast';

interface DashboardProps {
  onLogout: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

type View = 'dashboard' | 'leads' | 'pipeline' | 'conversations' | 'automations' | 'calendar' | 'analytics' | 'settings' | 'billing';

export const Dashboard: React.FC<DashboardProps> = ({ onLogout, theme, toggleTheme }) => {
  const { profile, isFeatureLocked, loading } = useSubscription();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAddLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [targetUpgradePlan, setTargetUpgradePlan] = useState<PlanTier>('Growth');
  const [leads, setLeads] = useState<any[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleAddLead = (newLead: any) => {
    setLeads(prev => [newLead, ...prev]);
    showToast('✓ Lead added — AI follow-up started', 'success');
  };

  const handleGenerateReport = (range: string = 'Today') => {
    const kpis = [
      ['BUSINESS PERFORMANCE REPORT'],
      ['Period', range],
      ['Generated On', new Date().toLocaleString()],
      [''],
      ['KEY METRICS'],
      ['Metric', 'Value', 'Status'],
      ['Total Leads', leads.length, 'Target: 50'],
      ['Conversion Rate', '12.4%', 'Good'],
      ['Avg Response Time', '28s', 'Excellent'],
      ['New Appointments', '14', 'On Track'],
      [''],
      ['LEAD DATA EXPORT'],
      ['Name', 'Email', 'Phone', 'Company', 'Source', 'Score', 'Status', 'Date Added']
    ];

    let leadData = leads.length > 0 ? leads : [
      { firstName: 'Sarah', lastName: 'Mitchell', email: 'sarah@innovate.co', phone: '+27825550101', company: 'Innovate Labs', source: 'Website Form', score: 82, status: 'New', created: '2025-04-30' },
      { firstName: 'James', lastName: 'Okonkwo', email: 'james@ecobuilders.co', phone: '+27831234567', company: 'EcoBuilders', source: 'Facebook Ad', score: 71, status: 'Contacted', created: '2025-04-30' }
    ];

    const leadRows = leadData.map(l => [
      `${l.firstName} ${l.lastName}`,
      l.email,
      l.phone,
      l.company,
      l.source,
      l.score || 0,
      l.status,
      l.created
    ]);

    const csvContent = [...kpis, ...leadRows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    
    link.setAttribute('href', url);
    link.setAttribute('download', `purple-business-report-${date}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`✓ Business report (${range}) generated`, 'success');
  };

  const exportLeads = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Source', 'Score', 'Status', 'Date Added'];
    let csvData = leads.length > 0 ? leads : [
      { firstName: 'Sarah', lastName: 'Mitchell', email: 'sarah@innovate.co', phone: '+27825550101', company: 'Innovate Labs', source: 'Website Form', score: 82, status: 'New', created: '2025-04-30' },
      { firstName: 'James', lastName: 'Okonkwo', email: 'james@ecobuilders.co', phone: '+27831234567', company: 'EcoBuilders', source: 'Facebook Ad', score: 71, status: 'Contacted', created: '2025-04-30' }
    ];

    const csvRows = [
      headers.join(','),
      ...csvData.map(l => [
        `${l.firstName} ${l.lastName}`,
        l.email,
        l.phone,
        l.company,
        l.source,
        l.score || 0,
        l.status,
        l.created
      ].map(field => `"${field}"`).join(','))
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    
    link.setAttribute('href', url);
    link.setAttribute('download', `purple-leads-${date}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('✓ Leads exported as CSV', 'success');
  };

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', feature: 'overview' },
    { id: 'leads', icon: Users, label: 'Leads', feature: 'leads' },
    { id: 'pipeline', icon: Kanban, label: 'Pipeline', feature: 'pipeline' },
    { id: 'conversations', icon: MessageSquare, label: 'Conversations', feature: 'whatsapp_sms' },
    { id: 'automations', icon: Zap, label: 'Sequences', feature: 'basic_automations' },
    { id: 'calendar', icon: CalendarIcon, label: 'Calendar', feature: 'calendar' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', feature: 'advanced_analytics' },
  ];

  const bottomNavItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'billing', icon: CreditCard, label: 'Billing' },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardHome totalLeads={leads.length} onGenerateReport={handleGenerateReport} />;
      case 'leads': return <LeadsView leads={leads} onExport={exportLeads} onAddLead={() => setAddLeadModalOpen(true)} />;
      case 'pipeline': return <PipelineView />;
      case 'conversations': return <ConversationsView />;
      case 'automations': return <AutomationsView />;
      default: return (
        <div id={`view-${currentView}`} className="view-section flex flex-col items-center justify-center h-full text-center space-y-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <LayoutDashboard className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-widest">{currentView} Coming Soon</h2>
          <p className="text-muted-foreground max-w-md">We're building this feature right now to help you automate more of your business.</p>
        </div>
      );
    }
  };

  const getPageTitle = () => {
    const item = [...navItems, ...bottomNavItems].find(i => i.id === currentView);
    return item ? item.label : currentView.charAt(0).toUpperCase() + currentView.slice(1);
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden select-none">
      <Toast toasts={toasts} removeToast={removeToast} />
      <AddLeadModal 
        isOpen={isAddLeadModalOpen} 
        onClose={() => setAddLeadModalOpen(false)} 
        onAddLead={handleAddLead} 
      />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-background flex flex-col transition-transform duration-300 md:relative md:translate-x-0 font-sans",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-20 flex items-center px-8 border-b border-border">
          <Logo />
        </div>

        <div className="flex-1 overflow-y-auto py-8 px-4 space-y-8">
          <nav className="space-y-1.5">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Automation</p>
            {navItems.map((item) => {
              const isLocked = isFeatureLocked(item.feature);
              const requiredPlan = item.feature === 'whatsapp_sms' || item.feature === 'advanced_analytics' ? 'Growth' : 'Starter';

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (isLocked) {
                      setTargetUpgradePlan(requiredPlan as PlanTier);
                      setIsUpgradeModalOpen(true);
                      return;
                    }
                    setCurrentView(item.id as View);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all group",
                    currentView === item.id 
                      ? "bg-[#7C3AED]/20 border border-[#7C3AED]/30 text-white" 
                      : isLocked ? "text-slate-600 cursor-not-allowed" : "text-slate-500 hover:text-slate-300 hover:bg-[#12121A]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("w-4 h-4", currentView === item.id ? "text-[#7C3AED]" : isLocked ? "text-slate-700" : "text-slate-500")} />
                    {item.label}
                  </div>
                  {isLocked && <Lock size={12} className="text-slate-700" />}
                </button>
              );
            })}
          </nav>

          <nav className="space-y-1.5">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Account</p>
            {bottomNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id as View);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all group",
                  currentView === item.id 
                    ? "bg-[#7C3AED]/20 border border-[#7C3AED]/30 text-white" 
                    : "text-slate-500 hover:text-slate-300 hover:bg-[#12121A]"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-[#2A2A35]">
           <div className="p-4 bg-[#12121A] rounded-xl border border-[#2A2A35] space-y-4">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                    <TrendingUp className="w-5 h-5 text-primary" />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Plan</p>
                  <p className="text-sm font-extrabold">{profile?.plan || 'Starter'}</p>
               </div>
            </div>
            <div className="w-full h-1.5 bg-background rounded-full overflow-hidden border border-border">
               <div 
                 className="h-full bg-primary shadow-[0_0_10px_rgb(124,58,237,0.5)] transition-all duration-1000" 
                 style={{ width: `${(leads.length / (PLANS[profile?.plan || 'Starter'].leadLimit)) * 100}%` }}
               />
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
               <span>{leads.length} / {PLANS[profile?.plan || 'Starter'].leadLimit} Leads</span>
               <span>{Math.round((leads.length / PLANS[profile?.plan || 'Starter'].leadLimit) * 100)}%</span>
            </div>
            <Button 
              size="sm" 
              className="w-full text-[10px] font-bold py-2 bg-primary text-white hover:shadow-lg hover:shadow-primary/20"
              onClick={() => setIsUpgradeModalOpen(true)}
            >
              {profile?.plan === 'Professional' ? 'Manage Billing' : 'Upgrade Plan'}
            </Button>
           </div>
        </div>

        <div className="p-4 border-t border-[#2A2A35] mt-auto">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-background">
        {/* Top Header */}
        <header className="h-20 border-b border-border flex items-center justify-between px-8 bg-background/80 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-6">
             <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
             </Button>
             <h1 className="text-sm font-black uppercase tracking-[0.2em] text-white hidden sm:block">{getPageTitle()}</h1>
             <div className="relative hidden lg:block w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Lead search, commands..." 
                  className="pl-12 h-11 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-all rounded-xl shadow-inner"
                />
             </div>
          </div>

          <div className="flex items-center gap-6">
            <Button 
                variant="outline" 
                onClick={exportLeads}
                className="hidden xl:flex items-center gap-2 rounded-xl h-11 px-6 font-bold border-border bg-transparent hover:bg-secondary transition-all"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>

            <button className="theme-toggle" onClick={toggleTheme}>
              <div className="toggle-track">
                <div className="toggle-thumb" id="toggleIcon">
                  {theme === 'dark' ? '🌙' : '☀️'}
                </div>
              </div>
            </button>

            <Button variant="outline" size="icon" className="w-11 h-11 rounded-xl relative hover:bg-secondary border-border bg-transparent">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
            </Button>
            <Button 
              onClick={() => setAddLeadModalOpen(true)}
              className="tb-btn tb-btn-primary hidden sm:flex items-center gap-2 rounded-xl h-11 px-6 font-bold bg-[#7C3AED] text-white shadow-lg shadow-purple-900/20 hover:shadow-purple-500/20 transition-all"
            >
               <Plus className="w-5 h-5" />
               New Lead
            </Button>
            <div className="flex items-center gap-4 pl-6 h-10">
               <div className="hidden md:block text-right">
                  <p className="text-sm font-extrabold leading-none tracking-tight user-name">{profile?.fullName || 'My Account'}</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1.5">{profile?.plan} Account</p>
               </div>
               <Avatar className="h-10 w-10 rounded-xl">
                 <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.fullName || 'User')}&background=7C3AED&color=fff`} />
                 <AvatarFallback className="bg-secondary text-foreground">UA</AvatarFallback>
               </Avatar>
            </div>
          </div>
        </header>

        {/* Upgrade Modal */}
        <UpgradeModal 
          isOpen={isUpgradeModalOpen} 
          onClose={() => setIsUpgradeModalOpen(false)} 
          targetPlan={targetUpgradePlan}
        />

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div id={`view-${currentView}`} className="view-section animate-in fade-in slide-in-from-bottom-4 duration-500">
             {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};
