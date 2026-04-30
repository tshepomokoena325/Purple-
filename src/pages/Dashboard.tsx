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
  X
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { cn } from '../../lib/utils';

// Sub-views
import { DashboardHome } from '../components/DashboardHome';
import { LeadsView } from '../components/LeadsView';
import { PipelineView } from '../components/PipelineView';
import { ConversationsView } from '../components/ConversationsView';
import { AutomationsView } from '../components/AutomationsView';

interface DashboardProps {
  onLogout: () => void;
}

type View = 'dashboard' | 'leads' | 'pipeline' | 'conversations' | 'automations' | 'calendar' | 'analytics' | 'settings' | 'billing';

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'leads', icon: Users, label: 'Leads' },
    { id: 'pipeline', icon: Kanban, label: 'Pipeline' },
    { id: 'conversations', icon: MessageSquare, label: 'Conversations' },
    { id: 'automations', icon: Zap, label: 'Automations' },
    { id: 'calendar', icon: CalendarIcon, label: 'Calendar' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const bottomNavItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'billing', icon: CreditCard, label: 'Billing' },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardHome />;
      case 'leads': return <LeadsView />;
      case 'pipeline': return <PipelineView />;
      case 'conversations': return <ConversationsView />;
      case 'automations': return <AutomationsView />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <LayoutDashboard className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-widest">{currentView} Coming Soon</h2>
          <p className="text-muted-foreground max-w-md">We're building this feature right now to help you automate more of your business.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#0B0B0F] text-white overflow-hidden dark select-none">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 border-r border-[#2A2A35] bg-[#0B0B0F] flex flex-col transition-transform duration-300 md:relative md:translate-x-0 font-sans",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-20 flex items-center px-8 border-b border-[#2A2A35]">
          <Logo />
        </div>

        <div className="flex-1 overflow-y-auto py-8 px-4 space-y-8">
          <nav className="space-y-1.5">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Dashboard</p>
            {navItems.map((item) => (
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
                <item.icon className={cn("w-4 h-4", currentView === item.id ? "text-[#7C3AED]" : "text-slate-500")} />
                {item.label}
              </button>
            ))}
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
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trial Days</p>
                    <p className="text-sm font-extrabold text-white">12 Left</p>
                 </div>
              </div>
              <div className="w-full h-1.5 bg-[#0B0B0F] rounded-full overflow-hidden border border-[#2A2A35]">
                 <div className="w-2/3 h-full bg-primary shadow-[0_0_10px_rgb(124,58,237,0.5)]" />
              </div>
              <Button size="sm" className="w-full text-[10px] font-bold py-2 bg-primary text-white hover:shadow-lg hover:shadow-primary/20">Upgrade Now</Button>
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
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#0B0B0F]">
        {/* Top Header */}
        <header className="h-20 border-b border-[#2A2A35] flex items-center justify-between px-8 bg-[#0B0B0F]/80 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-6">
             <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
             </Button>
             <div className="relative hidden lg:block w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input 
                  placeholder="Lead search, commands..." 
                  className="pl-12 h-11 bg-[#12121A] border-[#2A2A35] text-white placeholder:text-slate-600 focus:border-primary/50 transition-all rounded-xl"
                />
             </div>
          </div>

          <div className="flex items-center gap-6">
            <Button variant="outline" size="icon" className="w-11 h-11 rounded-xl relative hover:bg-[#12121A] border-[#2A2A35] bg-transparent text-white">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#7C3AED] rounded-full border-2 border-[#0B0B0F]" />
            </Button>
            <Button className="hidden sm:flex items-center gap-2 rounded-xl h-11 px-6 font-bold bg-[#7C3AED] text-white shadow-lg shadow-purple-900/20 hover:shadow-purple-500/20 transition-all">
               <Plus className="w-5 h-5" />
               New Lead
            </Button>
            <div className="flex items-center gap-4 pl-6 border-l border-[#2A2A35] h-10">
               <div className="hidden md:block text-right">
                  <p className="text-sm font-extrabold text-white leading-none tracking-tight">BlueSky Solar</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1.5">Elite Account</p>
               </div>
               <Avatar className="h-10 w-10 rounded-xl border border-[#2A2A35] shadow-2xl">
                 <AvatarImage src="https://ui-avatars.com/api/?name=Sipho+Mokoena&background=7C3AED&color=fff" />
                 <AvatarFallback className="bg-[#12121A] text-white">SM</AvatarFallback>
               </Avatar>
            </div>
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {renderView()}
        </div>
      </main>
    </div>
  );
};
