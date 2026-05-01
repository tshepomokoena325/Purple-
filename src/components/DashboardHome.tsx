import React, { useState } from 'react';
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
  Clock,
  ChevronDown
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Calendar } from "../../components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

const chartData: any[] = [];

const conversionData: any[] = [];

interface DashboardHomeProps {
  totalLeads?: number;
  onGenerateReport?: (range: string) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ totalLeads = 0, onGenerateReport }) => {
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 3, 23),
    to: new Date(2025, 3, 30),
  });

  const rangeOptions = [
    'Today',
    'Yesterday',
    'Last 7 Days',
    'Last 30 Days',
    'Last 60 Days',
    'Last 90 Days',
    'Last 12 Months',
    'Custom Range...'
  ];

  const handleRangeSelect = (option: string) => {
    if (option !== 'Custom Range...') {
      setDateRange(option);
    } else {
      setDateRange(option);
    }
  };

  const getDisplayRange = () => {
    if (dateRange === 'Custom Range...' && date?.from) {
      if (date.to) {
        return `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`;
      }
      return format(date.from, "LLL dd, y");
    }
    return dateRange;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-bold">Good morning 👋</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">Here's your business performance for <span className="text-primary font-bold">{getDisplayRange()}</span>.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex items-center bg-secondary/30 rounded-xl p-1 border border-border/50 shadow-sm">
             <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="h-9 hover:bg-secondary/50 transition-all gap-2 px-4 rounded-lg">
                   <CalendarIcon className="w-4 h-4 text-primary" />
                   <span className="text-xs font-bold uppercase tracking-wider">{dateRange === 'Custom Range...' ? 'Custom' : dateRange}</span>
                   <ChevronDown className="w-4 h-4 opacity-50" />
                 </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="start" className="w-56 bg-[#12121A] border-[#2A2A35] p-2 rounded-xl">
                 {rangeOptions.map((option) => (
                   <DropdownMenuItem 
                     key={option}
                     onClick={() => handleRangeSelect(option)}
                     className={cn(
                       "rounded-lg text-xs font-bold uppercase tracking-widest px-3 py-2.5 cursor-pointer transition-colors",
                       dateRange === option ? "bg-primary/20 text-primary" : "text-slate-400 hover:bg-secondary hover:text-white"
                     )}
                   >
                     {option}
                   </DropdownMenuItem>
                 ))}
               </DropdownMenuContent>
             </DropdownMenu>

             {dateRange === 'Custom Range...' && (
               <Popover>
                 <PopoverTrigger asChild>
                   <Button
                     variant="ghost"
                     className={cn(
                       "h-9 px-4 rounded-lg justify-start text-left font-bold text-xs uppercase tracking-widest hover:bg-secondary/50",
                       !date && "text-muted-foreground"
                     )}
                   >
                     {date?.from ? (
                       date.to ? (
                         <>
                           {format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}
                         </>
                       ) : (
                         format(date.from, "LLL dd")
                       )
                     ) : (
                       <span>Pick dates</span>
                     )}
                   </Button>
                 </PopoverTrigger>
                 <PopoverContent className="w-auto p-0 bg-[#12121A] border-[#2A2A35] rounded-xl shadow-2xl" align="end">
                   <Calendar
                     initialFocus
                     mode="range"
                     defaultMonth={date?.from}
                     selected={date}
                     onSelect={setDate}
                     numberOfMonths={2}
                     className="p-3"
                   />
                 </PopoverContent>
               </Popover>
             )}
           </div>

           <Button 
             onClick={() => onGenerateReport?.(getDisplayRange())}
             className="rounded-xl h-11 font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 transition-all px-8 text-xs uppercase tracking-widest"
           >
             Generate Report
           </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Leads Today", value: totalLeads.toString(), delta: totalLeads > 0 ? "+100%" : "0%", up: totalLeads > 0, icon: Users, color: "text-[#7C3AED]" },
          { label: "Appointments", value: "R0", delta: "0", up: true, icon: CalendarIcon, color: "text-green-400" },
          { label: "Response Time", value: "0s", delta: "0s", up: true, icon: Zap, color: "text-purple-400" },
          { label: "Conversion", value: "0%", delta: "0%", up: false, icon: TrendingUp, color: "text-blue-400" },
        ].map((kpi, idx) => (
          <Card key={idx} className="bg-card border-border rounded-xl overflow-hidden relative group hover:border-primary/50 transition-all duration-300">
             <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{kpi.label}</div>
                  <div className={cn(
                    "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded border",
                    kpi.up ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                  )}>
                    {kpi.delta}
                  </div>
                </div>
                <div className={cn("text-3xl font-extrabold mb-1 stat-value")}>{kpi.value}</div>
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
        <Card className="lg:col-span-2 bg-card border-border rounded-2xl overflow-hidden shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-8 border-b border-border px-8">
            <div>
              <CardTitle className="text-sm font-extrabold uppercase tracking-widest text-muted-foreground">Lead growth performance</CardTitle>
              <CardDescription className="text-muted-foreground font-medium text-xs mt-1">Comparison of leads vs. booked appointments this week.</CardDescription>
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
        <Card className="bg-card border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          <div className="px-6 py-4 bg-secondary/50 border-b border-border text-[10px] font-bold uppercase tracking-[0.2em]">AI Active Conversations</div>
          <CardContent className="p-6 space-y-6 flex-1 overflow-y-auto">
             {([] as any[]).map((item, idx) => (
               <div key={idx} className="flex flex-col gap-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Avatar className="h-10 w-10 rounded-full act-av">
                         <AvatarImage src={`https://ui-avatars.com/api/?name=${item.name}&background=7C3AED&color=fff`} />
                         <AvatarFallback className="bg-background text-foreground">{item.name[0]}</AvatarFallback>
                       </Avatar>
                       <div>
                          <div className="text-xs font-bold group-hover:text-primary transition-colors">{item.name}</div>
                          <div className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">{item.type}</div>
                       </div>
                    </div>
                    {item.status === "Booked" ? (
                      <div className="px-2 py-1 bg-green-500/20 text-green-400 text-[9px] font-bold uppercase rounded border border-green-500/30">Booked</div>
                    ) : (
                      <div className="px-2 py-1 bg-purple-500/20 text-purple-400 text-[9px] font-bold uppercase rounded border border-purple-500/30">In Progress</div>
                    )}
                 </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t border-border">
             <Button variant="ghost" className="w-full text-[10px] font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest bg-transparent">
               View All Activity
             </Button>
          </div>
        </Card>
      </div>

      {/* Recent High Intent Leads Table */}
      <Card className="bg-card border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-8 py-6 border-b border-border flex items-center justify-between bg-secondary/30">
           <div>
             <CardTitle className="text-sm font-extrabold uppercase tracking-widest text-muted-foreground">Upcoming Appointments</CardTitle>
             <CardDescription className="text-muted-foreground font-medium text-xs mt-1">Scheduled jobs for the next 48 hours.</CardDescription>
           </div>
           <Button variant="outline" size="sm" className="rounded-xl border-border h-9 text-xs font-bold bg-transparent hover:bg-secondary">
              View Calendar
           </Button>
        </div>
        <CardContent className="p-0">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <th className="py-5 px-8">Client / Job</th>
                    <th className="py-5 px-8">Date & Time</th>
                    <th className="py-5 px-8">Type</th>
                    <th className="py-5 px-8">Owner</th>
                    <th className="py-5 px-8 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {([] as any[]).map((job, idx) => (
                    <tr key={idx} className="group hover:bg-secondary/20 transition-colors">
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center font-bold text-primary shadow-inner font-mono text-xs">
                             {job.avatar}
                           </div>
                           <div>
                             <p className="text-sm font-extrabold leading-tight">{job.client}</p>
                             <p className="text-[11px] text-muted-foreground font-medium">{job.contact}</p>
                           </div>
                        </div>
                      </td>
                      <td className="py-5 px-8">
                         <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{job.date}</span>
                            <span className="text-xs text-primary font-bold flex items-center gap-2">
                               <Clock className="w-3.5 h-3.5" />
                               {job.time}
                            </span>
                         </div>
                      </td>
                      <td className="py-5 px-8">
                         <div className="px-2 py-1 bg-secondary text-muted-foreground text-[9px] font-bold uppercase rounded border border-border inline-block">
                            {job.type}
                         </div>
                      </td>
                      <td className="py-5 px-8">
                         <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                               {job.tech[0]}
                            </div>
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{job.tech}</span>
                         </div>
                      </td>
                      <td className="py-5 px-8 text-right">
                         <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-secondary">
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
