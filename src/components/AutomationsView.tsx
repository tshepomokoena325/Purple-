import React from 'react';
import { cn } from '../../lib/utils';
import { 
  Zap, 
  Plus, 
  Play, 
  Clock, 
  MessageSquare, 
  Calendar, 
  Trash2, 
  Settings2,
  ChevronRight,
  ArrowRight,
  Split
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ScrollArea } from '../../components/ui/scroll-area';

const automations = [
  { id: '1', name: 'Instant Facebook Follow-up', trigger: 'Facebook Lead Ad', steps: 4, active: true, runs: '1,242' },
  { id: '2', name: 'After Hours AI Agent', trigger: 'Incoming Website Lead', steps: 6, active: true, runs: '894' },
  { id: '3', name: 'WhatsApp Appointment Reminder', trigger: 'Appointment Booked', steps: 3, active: true, runs: '450' },
  { id: '4', name: 'Google Reviews Auto-Request', trigger: 'Opportunity Won', steps: 2, active: false, runs: '0' },
];

export const AutomationsView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-white">Automation Builder</h2>
          <p className="text-sm text-muted-foreground">Create intelligent workflows that work while you sleep.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-10 border-border/50 font-bold bg-transparent hover:bg-secondary transition-all">
             Template Library
          </Button>
          <Button className="rounded-xl h-10 font-bold bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-lg shadow-purple-900/20">
             <Plus className="w-4 h-4 mr-2" />
             Create Workflow
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Workflows", value: "12" },
          { label: "Total Runs (30d)", value: "5.4k" },
          { label: "Successful Bookings", value: "142" },
          { label: "AI Hours Saved", value: "82h" }
        ].map((stat, idx) => (
          <div key={idx} className="p-8 rounded-2xl bg-[#12121A] border border-[#2A2A35] text-center shadow-xl group hover:border-primary/50 transition-all">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">{stat.label}</p>
             <p className="text-3xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full min-h-[600px]">
        {/* List of Automations */}
        <div className="lg:col-span-1 space-y-6">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-2">Operational Logic</h3>
           <div className="space-y-4">
              {automations.map((a) => (
                <Card key={a.id} className={cn(
                   "cursor-pointer hover:border-primary/50 transition-all border-[#2A2A35] bg-[#12121A] group rounded-2xl overflow-hidden",
                   a.id === '1' ? "border-primary/40 bg-slate-900 shadow-2xl" : "shadow-lg"
                )}>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-start justify-between">
                       <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg",
                            a.active ? "bg-primary text-white shadow-purple-900/40" : "bg-slate-800 text-slate-500"
                          )}>
                             <Zap className="w-6 h-6 fill-current" />
                          </div>
                          <div className="min-w-0">
                             <p className={cn("text-sm font-extrabold truncate", a.active ? "text-white" : "text-slate-400")}>{a.name}</p>
                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1.5">Logic: {a.trigger}</p>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center justify-between pt-5 border-t border-[#2A2A35]/50">
                       <div className="flex items-center gap-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          <span className="flex items-center gap-2 text-primary opacity-80"><Split className="w-3.5 h-3.5" /> {a.steps} Nodes</span>
                          <span className="flex items-center gap-2"><Play className="w-3.5 h-3.5" /> {a.runs} Executions</span>
                       </div>
                       <div className={cn(
                         "px-2.5 py-1 text-[9px] uppercase font-black tracking-widest rounded transition-all",
                         a.active ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-slate-900 text-slate-600 border border-slate-800"
                       )}>
                         {a.active ? "Enabled" : "Paused"}
                       </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
           </div>
        </div>

        {/* Visual Builder Sidebar (Static Mockup) */}
        <Card className="lg:col-span-2 bg-[#12121A] border-[#2A2A35] overflow-hidden flex flex-col rounded-2xl shadow-2xl relative">
           <div className="h-20 border-b border-[#2A2A35] bg-[#12121A]/80 backdrop-blur-xl flex items-center justify-between px-8 absolute top-0 left-0 w-full z-20">
              <div className="flex items-center gap-4">
                 <Zap className="w-5 h-5 text-primary" />
                 <h4 className="text-sm font-extrabold text-white">Logic Architect: Instant Facebook Follow-up</h4>
              </div>
              <div className="flex items-center gap-3">
                 <Button variant="ghost" size="sm" className="h-10 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white">Discard</Button>
                 <Button size="sm" className="h-10 px-6 rounded-xl text-xs font-black uppercase tracking-widest bg-primary text-white shadow-lg shadow-purple-900/40 hover:shadow-purple-500/40 transition-all">Save Changes</Button>
              </div>
           </div>
           <ScrollArea className="flex-1 bg-[#0B0B0F]/50 pt-20">
              {/* Abstract connection lines */}
              <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent -translate-x-1/2" />
              
              <div className="p-16 flex flex-col items-center gap-16 relative">
                 {/* Trigger */}
                 <div className="w-72 p-8 rounded-2xl bg-primary shadow-2xl shadow-purple-900/40 text-white relative z-10 text-center border-2 border-white/10">
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] mb-3 text-purple-200">Logic Entry</p>
                    <h5 className="font-extrabold text-base">Facebook Lead Generated</h5>
                 </div>

                 <ChevronRight className="w-8 h-8 text-slate-800 rotate-90" />

                 {/* Step 1 */}
                 <div className="w-72 p-8 rounded-2xl bg-[#12121A] border border-[#2A2A35] shadow-2xl relative z-10 space-y-5">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
                          <Clock className="w-5 h-5" />
                       </div>
                       <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Wait Delay</p>
                    </div>
                    <p className="text-sm font-extrabold text-white">Delay execution for 45s</p>
                 </div>

                 <ChevronRight className="w-8 h-8 text-slate-800 rotate-90" />

                 {/* Step 2 */}
                 <div className="w-72 p-8 rounded-2xl bg-[#12121A] border-2 border-primary/40 shadow-2xl shadow-purple-900/20 relative z-10 space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5" />
                       </div>
                       <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Action: WhatsApp</p>
                    </div>
                    <p className="text-sm font-extrabold text-white">Send AI Follow-up Message</p>
                    <div className="p-4 bg-[#0B0B0F] rounded-xl border border-[#2A2A35] text-[11px] leading-relaxed text-slate-400 font-medium">
                       "Hi [name], I saw you're interested in [offer]. I'm the Purple AI assistant. When can we talk?"
                    </div>
                 </div>

                 <ChevronRight className="w-8 h-8 text-slate-800 rotate-90" />

                 {/* Plus to add */}
                 <Button variant="outline" size="icon" className="w-12 h-12 rounded-full border-dashed border-primary/50 text-white bg-slate-900 shadow-2xl shadow-primary/10 hover:bg-primary transition-all relative z-10">
                    <Plus className="w-5 h-5" />
                 </Button>
              </div>
           </ScrollArea>
        </Card>
      </div>
    </div>
  );
};
