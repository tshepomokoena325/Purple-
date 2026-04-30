import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  MessageSquare, 
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  Circle
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

export const DashboardMockup: React.FC = () => {
  return (
    <div className="relative group p-4">
      {/* Background Glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-purple-400/20 blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000 -z-10" />
      
      <div className="rounded-2xl border border-border/50 bg-[#0B0B0F] shadow-2xl overflow-hidden overflow-x-auto ring-1 ring-white/10">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-bottom border-border/50 bg-[#12121A]">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="h-4 w-px bg-border/50 mx-2" />
              <div className="text-xs font-mono text-muted-foreground flex items-center gap-2">
                <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                purple_v2.0_stable
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>

          <div className="flex">
            {/* Nav */}
            <div className="w-16 border-right border-border/50 p-4 flex flex-col gap-6 items-center">
              {[BarChart3, Users, MessageSquare, Calendar].map((Icon, idx) => (
                <div key={idx} className={idx === 0 ? "text-primary transition-colors" : "text-muted-foreground hover:text-white transition-colors"}>
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 p-8 space-y-8">
              {/* KPIs */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: "Booked Appointments", value: "142", trend: "+12.4%", color: "text-green-500" },
                  { label: "New Leads", value: "894", trend: "+24.1%", color: "text-green-500" },
                  { label: "Conversion Rate", value: "68.2%", trend: "+5.1%", color: "text-primary" }
                ].map((kpi, idx) => (
                  <Card key={idx} className="bg-[#12121A] border-border/50">
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                      <div className="flex items-end justify-between">
                        <h4 className="text-xl font-bold text-white">{kpi.value}</h4>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted/20 ${kpi.color}`}>
                          {kpi.trend}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Main Visuals */}
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 rounded-xl border border-border/50 bg-[#12121A] p-6 h-64">
                   <div className="flex items-center justify-between mb-8">
                      <h5 className="text-sm font-semibold text-white">Lead Attribution Flow</h5>
                      <TrendingUp className="w-4 h-4 text-primary" />
                   </div>
                   <div className="flex items-end gap-3 h-32">
                      {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t-sm bg-primary/20 relative group">
                           <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ duration: 1, delay: i * 0.05 }}
                              className="w-full bg-primary absolute bottom-0 rounded-t-sm" 
                           />
                        </div>
                      ))}
                   </div>
                </div>
                <div className="rounded-xl border border-border/50 bg-[#12121A] p-6 space-y-6">
                   <h5 className="text-sm font-semibold text-white">Recent Automation</h5>
                   <div className="space-y-4">
                      {[
                        { name: "Solar Quote", time: "2m ago", status: "Qualified" },
                        { name: "Dental Checkup", time: "15m ago", status: "Booked" },
                        { name: "HVAC Urgent", time: "1h ago", status: "Processing" }
                      ].map((lead, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[11px]">
                           <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                             <span className="text-gray-300 font-medium">{lead.name}</span>
                           </div>
                           <span className="text-muted-foreground">{lead.time}</span>
                        </div>
                      ))}
                   </div>
                   <div className="pt-4 border-top border-border/20">
                      <div className="flex items-center justify-between text-muted-foreground text-[10px]">
                        <span>Weekly Progress</span>
                        <span>78%</span>
                      </div>
                      <div className="w-full h-1 bg-muted/20 rounded-full mt-2 overflow-hidden">
                        <div className="w-[78%] h-full bg-primary" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
