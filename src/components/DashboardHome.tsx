import React from 'react';
import { cn } from '../../lib/utils';
import { 
  Users, 
  Calendar as CalendarIcon, 
  Zap, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

const chartData = [
  { name: 'Mon', leads: 24, bookings: 12 },
  { name: 'Tue', leads: 45, bookings: 18 },
  { name: 'Wed', leads: 38, bookings: 15 },
  { name: 'Thu', leads: 52, bookings: 24 },
  { name: 'Fri', leads: 63, bookings: 32 },
  { name: 'Sat', leads: 31, bookings: 14 },
  { name: 'Sun', leads: 28, bookings: 10 },
];

const conversionData = [
  { time: '10am', value: 10 },
  { time: '11am', value: 25 },
  { time: '12pm', value: 20 },
  { time: '1pm', value: 45 },
  { time: '2pm', value: 40 },
  { time: '3pm', value: 65 },
  { time: '4pm', value: 55 },
  { time: '5pm', value: 80 },
];

export const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Good morning, Sipho 👋</h1>
          <p className="text-muted-foreground mt-1">Here's your business performance for today so far.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-xl h-10 border-border/50">
             <CalendarIcon className="w-4 h-4 mr-2" />
             Last 7 Days
           </Button>
           <Button className="rounded-xl h-10 font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
             Export Report
           </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Leads Today", value: "142", delta: "+12%", up: true, icon: Users, color: "text-[#7C3AED]" },
          { label: "Appointments", value: "R28,400", delta: "+R5.2k", up: true, icon: CalendarIcon, color: "text-green-400" },
          { label: "Response Time", value: "48s", delta: "-12s", up: true, icon: Zap, color: "text-purple-400" },
          { label: "Conversion", value: "32.4%", delta: "-2.1%", up: false, icon: TrendingUp, color: "text-blue-400" },
        ].map((kpi, idx) => (
          <Card key={idx} className="bg-[#12121A] border-[#2A2A35] rounded-xl overflow-hidden relative group hover:border-primary/50 transition-all duration-300">
             <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{kpi.label}</div>
                  <div className={cn(
                    "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded border",
                    kpi.up ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                  )}>
                    {kpi.delta}
                  </div>
                </div>
                <div className={cn("text-3xl font-extrabold text-white mb-1")}>{kpi.value}</div>
                <div className={cn("text-[9px] font-bold uppercase tracking-wider", kpi.up ? "text-green-400/70" : "text-red-400/70")}>
                   {kpi.up ? "Increase vs yesterday" : "Decrease vs yesterday"}
                </div>
             </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Growth Chart */}
        <Card className="lg:col-span-2 bg-[#12121A] border-[#2A2A35] rounded-2xl overflow-hidden shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-8 border-b border-[#2A2A35] px-8">
            <div>
              <CardTitle className="text-sm font-extrabold uppercase tracking-widest text-slate-400">Lead growth performance</CardTitle>
              <CardDescription className="text-slate-500 font-medium text-xs mt-1">Comparison of leads vs. booked appointments this week.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="h-[340px] p-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2A2A35" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#12121A', border: '1px solid #2A2A35', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                  itemStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="leads" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                <Area type="monotone" dataKey="bookings" stroke="#A855F7" strokeWidth={3} strokeDasharray="6 6" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Real-time Ticker / Recent Activity */}
        <Card className="bg-[#12121A] border-[#2A2A35] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          <div className="px-6 py-4 bg-slate-900/50 border-b border-[#2A2A35] text-[10px] font-bold text-white uppercase tracking-[0.2em]">AI Active Conversations</div>
          <CardContent className="p-6 space-y-6 flex-1 overflow-y-auto">
             {[
               { name: "John Steenhuisen", msg: "Can you install next Tuesday?", time: "2m ago", status: "Active", type: "Qualified: High (Solar)" },
               { name: "Nomusa Dlamini", msg: "What is your hourly rate?", time: "5m ago", status: "Qualified", type: "Status: AI Qualifying..." },
               { name: "Kobus van der Merwe", msg: "I need a quote for 10 panels.", time: "12m ago", status: "Active", type: "Qualified: Medium" },
               { name: "Fatima Patel", msg: "Are you registered with SAPVIA?", time: "22m ago", status: "Active", type: "Priority: Urgent" },
               { name: "Thabo Mbeki", msg: "Thanks, appointment booked.", time: "45m ago", status: "Booked", type: "Status: Confirmed" },
             ].map((item, idx) => (
               <div key={idx} className="flex flex-col gap-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Avatar className="h-10 w-10 rounded-full border border-[#2A2A35] shadow-lg">
                         <AvatarImage src={`https://ui-avatars.com/api/?name=${item.name}&background=7C3AED&color=fff`} />
                         <AvatarFallback className="bg-[#0B0B0F] text-white">{item.name[0]}</AvatarFallback>
                       </Avatar>
                       <div>
                          <div className="text-xs font-bold text-white group-hover:text-primary transition-colors">{item.name}</div>
                          <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider italic">{item.type}</div>
                       </div>
                    </div>
                    {item.status === "Booked" ? (
                      <div className="px-2 py-1 bg-green-500/20 text-green-400 text-[9px] font-bold uppercase rounded border border-green-500/30">Booked</div>
                    ) : (
                      <div className="px-2 py-1 bg-purple-500/20 text-purple-400 text-[9px] font-bold uppercase rounded border border-purple-500/30">In Progress</div>
                    )}
                 </div>
                 {idx < 4 && <div className="h-[1px] bg-[#2A2A35]" />}
               </div>
             ))}
          </CardContent>
          <div className="p-4 border-t border-[#2A2A35]">
             <Button variant="ghost" className="w-full text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest bg-transparent">
               View All Activity
             </Button>
          </div>
        </Card>
      </div>

      {/* Recent High Intent Leads Table */}
      <Card className="bg-[#12121A] border-[#2A2A35] rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-8 py-6 border-b border-[#2A2A35] flex items-center justify-between bg-slate-900/30">
           <div>
             <CardTitle className="text-sm font-extrabold uppercase tracking-widest text-slate-400">Upcoming Appointments</CardTitle>
             <CardDescription className="text-slate-500 font-medium text-xs mt-1">Scheduled jobs for the next 48 hours.</CardDescription>
           </div>
           <Button variant="outline" size="sm" className="rounded-xl border-[#2A2A35] h-9 text-xs font-bold bg-transparent text-white hover:bg-[#2A2A35]">
              View Calendar
           </Button>
        </div>
        <CardContent className="p-0">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#2A2A35] text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <th className="py-5 px-8">Client / Job</th>
                    <th className="py-5 px-8">Date & Time</th>
                    <th className="py-5 px-8">Type</th>
                    <th className="py-5 px-8">Owner</th>
                    <th className="py-5 px-8 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A35]/50">
                  {[
                    { client: "Blue Sky Solar", contact: "Nomvula Zulu", date: "Today", time: "14:00", type: "Site Survey", tech: "Mandla", avatar: "MZ" },
                    { client: "Elite Security", contact: "Dave Miller", date: "Today", time: "16:30", type: "Installation", tech: "Kobus", avatar: "DM" },
                    { client: "Dental Care SA", contact: "Dr. Smith", date: "Tomorrow", time: "09:00", type: "Demo Call", tech: "Sarah", avatar: "DS" },
                    { client: "Jozi Cleaning", contact: "Alice Kumalo", date: "Tomorrow", time: "11:00", type: "Maintenance", tech: "Mandla", avatar: "AK" }
                  ].map((job, idx) => (
                    <tr key={idx} className="group hover:bg-[#12121A]/80 transition-colors">
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-[#0B0B0F] flex items-center justify-center font-bold text-primary border border-[#2A2A35] shadow-inner font-mono text-xs">
                             {job.avatar}
                           </div>
                           <div>
                             <p className="text-sm font-extrabold text-white leading-tight">{job.client}</p>
                             <p className="text-[11px] text-slate-500 font-medium">{job.contact}</p>
                           </div>
                        </div>
                      </td>
                      <td className="py-5 px-8">
                         <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">{job.date}</span>
                            <span className="text-xs text-primary font-bold flex items-center gap-2">
                               <Clock className="w-3.5 h-3.5" />
                               {job.time}
                            </span>
                         </div>
                      </td>
                      <td className="py-5 px-8">
                         <div className="px-2 py-1 bg-slate-800 text-slate-300 text-[9px] font-bold uppercase rounded border border-[#2A2A35] inline-block">
                            {job.type}
                         </div>
                      </td>
                      <td className="py-5 px-8">
                         <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-slate-800 border border-[#2A2A35] flex items-center justify-center text-[10px] font-bold text-slate-400">
                               {job.tech[0]}
                            </div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{job.tech}</span>
                         </div>
                      </td>
                      <td className="py-5 px-8 text-right">
                         <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9 text-slate-500 hover:text-white hover:bg-slate-800">
                            <MoreVertical className="w-4 h-4" />
                         </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </CardContent>
      </Card>
    </div>
  );
};
