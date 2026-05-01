import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Phone, 
  Mail, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  ChevronDown,
  X,
  Calendar as CalendarIcon,
  Check,
  User
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '../../components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Calendar } from "../../components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface LeadsViewProps {
  leads?: any[];
  onExport?: () => void;
  onAddLead?: () => void;
}

type FilterState = {
  status: string;
  source: string;
  dateRange: string;
  assigned: string;
  score: string;
  appointment: string;
  customDate?: DateRange;
};

const INITIAL_FILTERS: FilterState = {
  status: 'All Statuses',
  source: 'All Sources',
  dateRange: 'All Time',
  assigned: 'All Users',
  score: 'All Scores',
  appointment: 'All Appointments'
};

export const LeadsView: React.FC<LeadsViewProps> = ({ leads = [], onExport, onAddLead }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchTerm('');
  };

  const removeFilter = (key: keyof FilterState) => {
    setFilters(prev => ({ ...prev, [key]: INITIAL_FILTERS[key] }));
  };

  const filteredLeads = leads.filter(lead => {
    const fullName = `${lead.firstName} ${lead.lastName}`.toLowerCase();
    const search = searchTerm.toLowerCase();
    
    const matchesSearch = fullName.includes(search) || 
                         lead.email.toLowerCase().includes(search) || 
                         lead.phone.includes(search);
    
    const matchesStatus = filters.status === 'All Statuses' || lead.status === filters.status;
    const matchesSource = filters.source === 'All Sources' || lead.source === filters.source;
    const matchesAssigned = filters.assigned === 'All Users' || lead.assigned === filters.assigned;
    
    // Score helper correctly identifying lead quality
    const getScoreCategory = (score: number) => {
      if (score >= 70) return 'Hot';
      if (score >= 40) return 'Warm';
      return 'Cold';
    };
    const matchesScore = filters.score === 'All Scores' || getScoreCategory(lead.score) === filters.score;

    return matchesSearch && matchesStatus && matchesSource && matchesAssigned && matchesScore;
  });

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    return value !== INITIAL_FILTERS[key as keyof FilterState];
  }).length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold page-title text-white">Lead Management</h2>
          <p className="text-sm text-muted-foreground">Manage and track your inbound leads from across South Africa.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={onExport}
            className="rounded-xl h-10 border-border/50 bg-transparent hover:bg-secondary transition-all"
          >
             <Download className="w-4 h-4 mr-2" />
             Export Leads
          </Button>
          <Button 
            onClick={onAddLead}
            className="rounded-xl h-10 font-bold bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-lg shadow-purple-900/20 transition-all"
          >
             <UserPlus className="w-4 h-4 mr-2" />
             Add Lead
          </Button>
        </div>
      </div>

      <Card className="bg-[#0B0B0F] border-[#2A2A35] rounded-2xl overflow-hidden shadow-2xl">
        <CardHeader className="border-b border-[#2A2A35] py-6 px-8 bg-[#12121A]/50">
          <div className="space-y-6">
            {/* Top row: Search & Core Filters */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div className="relative xl:col-span-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input 
                   placeholder="Search leads..." 
                   className="pl-12 h-11 bg-[#0B0B0F] border-[#2A2A35] text-white placeholder:text-slate-600 focus:border-[#7C3AED] transition-all rounded-xl"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="xl:col-span-8 flex flex-wrap items-center gap-3">
                {/* Status Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-11 rounded-xl bg-[#0B0B0F] border-[#2A2A35] text-slate-400 hover:text-white hover:bg-secondary transition-all px-4 gap-2 min-w-[140px] justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider">{filters.status}</span>
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#12121A] border-[#2A2A35] p-2 rounded-xl min-w-[180px]">
                    {['All Statuses', 'New', 'Contacted', 'Qualified', 'Booked', 'Won', 'Lost'].map(s => (
                      <DropdownMenuItem 
                        key={s} 
                        onClick={() => updateFilter('status', s)}
                        className={cn("rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest cursor-pointer", filters.status === s ? "bg-[#7C3AED]/20 text-[#7C3AED]" : "text-slate-400 hover:bg-secondary hover:text-white")}
                      >
                        {s}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Source Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-11 rounded-xl bg-[#0B0B0F] border-[#2A2A35] text-slate-400 hover:text-white hover:bg-secondary transition-all px-4 gap-2 min-w-[140px] justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider">{filters.source}</span>
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#12121A] border-[#2A2A35] p-2 rounded-xl min-w-[180px]">
                    {['All Sources', 'Facebook Ad', 'Google Ad', 'Website Form', 'WhatsApp', 'Manual Entry', 'Referral'].map(s => (
                      <DropdownMenuItem 
                        key={s} 
                        onClick={() => updateFilter('source', s)}
                        className={cn("rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest cursor-pointer", filters.source === s ? "bg-[#7C3AED]/20 text-[#7C3AED]" : "text-slate-400 hover:bg-secondary hover:text-white")}
                      >
                        {s}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Date Dropdown */}
                <div className="flex items-center bg-[#0B0B0F] border border-[#2A2A35] rounded-xl p-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-11 rounded-xl text-slate-400 hover:text-white hover:bg-secondary transition-all px-4 gap-2 min-w-[140px] justify-between border-0">
                        <CalendarIcon className="w-3.5 h-3.5 mr-1" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">{filters.dateRange === 'Custom Range' ? 'Custom' : filters.dateRange}</span>
                        <ChevronDown className="w-4 h-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#12121A] border-[#2A2A35] p-2 rounded-xl min-w-[180px]">
                      {['All Time', 'Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'Custom Range'].map(d => (
                        <DropdownMenuItem 
                          key={d} 
                          onClick={() => updateFilter('dateRange', d)}
                          className={cn("rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest cursor-pointer", filters.dateRange === d ? "bg-[#7C3AED]/20 text-[#7C3AED]" : "text-slate-400 hover:bg-secondary hover:text-white")}
                        >
                          {d}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {filters.dateRange === 'Custom Range' && (
                    <div className="flex items-center">
                      <div className="w-[1px] h-6 bg-[#2A2A35]" />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              "h-11 px-4 rounded-xl justify-start text-left font-bold text-[11px] uppercase tracking-wider hover:bg-secondary/50",
                              !date && "text-slate-600"
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
                              <span>Pick range</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[#0B0B0F] border-[#2A2A35]" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </div>

                {/* Advanced Toggle */}
                <Button 
                  variant="outline" 
                  onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                  className={cn(
                    "h-11 rounded-xl border-[#2A2A35] transition-all px-4 gap-2",
                    isAdvancedOpen ? "bg-[#7C3AED] text-white border-[#7C3AED]" : "bg-[#0B0B0F] text-slate-400 hover:text-white hover:bg-secondary"
                  )}
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Advanced</span>
                </Button>

                <div className="h-11 bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20 rounded-xl px-5 flex items-center ml-auto font-black text-xs uppercase tracking-[0.1em]">
                   {filteredLeads.length} Total
                </div>
              </div>
            </div>

            {/* Advanced Filters Row */}
            {isAdvancedOpen && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-[#0B0B0F]/50 rounded-2xl border border-[#2A2A35] animate-in slide-in-from-top-2 duration-300">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Lead Score</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full h-10 rounded-lg bg-[#0B0B0F] border-[#2A2A35] text-slate-300 justify-between text-xs font-bold uppercase tracking-widest">
                        {filters.score}
                        <ChevronDown className="w-4 h-4 opacity-40 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#12121A] border-[#2A2A35] p-2 rounded-xl w-[180px]">
                      {['All Scores', 'Hot', 'Warm', 'Cold'].map(s => (
                        <DropdownMenuItem key={s} onClick={() => updateFilter('score', s)} className="rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest cursor-pointer text-slate-400 hover:bg-secondary hover:text-white">{s}</DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Assigned User</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full h-10 rounded-lg bg-[#0B0B0F] border-[#2A2A35] text-slate-300 justify-between text-xs font-bold uppercase tracking-widest">
                        {filters.assigned}
                        <ChevronDown className="w-4 h-4 opacity-40 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#12121A] border-[#2A2A35] p-2 rounded-xl w-[200px]">
                      {['All Users', 'Unassigned', 'Tshepo M.', 'Sarah K.', 'John D.'].map(u => (
                        <DropdownMenuItem key={u} onClick={() => updateFilter('assigned', u)} className="rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest cursor-pointer text-slate-400 hover:bg-secondary hover:text-white">{u}</DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Appointment Status</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full h-10 rounded-lg bg-[#0B0B0F] border-[#2A2A35] text-slate-300 justify-between text-xs font-bold uppercase tracking-widest">
                        {filters.appointment}
                        <ChevronDown className="w-4 h-4 opacity-40 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#12121A] border-[#2A2A35] p-2 rounded-xl w-[220px]">
                      {['All Appointments', 'No Appointment', 'Scheduled', 'Completed', 'No Show'].map(s => (
                        <DropdownMenuItem key={s} onClick={() => updateFilter('appointment', s)} className="rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest cursor-pointer text-slate-400 hover:bg-secondary hover:text-white">{s}</DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-end pb-0.5">
                   <Button variant="ghost" className="h-10 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white">
                     Save View
                   </Button>
                </div>
              </div>
            )}

            {/* Filter Pills */}
            {(activeFilterCount > 0 || searchTerm) && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mr-2">Quick Filters:</p>
                {searchTerm && (
                  <Badge variant="secondary" className="bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20 py-1.5 px-3 rounded-lg gap-2 text-[10px] font-bold hover:bg-[#7C3AED]/20 transition-all uppercase tracking-widest">
                    Search: {searchTerm}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm('')} />
                  </Badge>
                )}
                {filters.status !== INITIAL_FILTERS.status && (
                  <Badge className="bg-[#1D1D26] text-slate-300 border-[#2A2A35] py-1.5 px-3 rounded-lg gap-2 text-[10px] font-bold uppercase tracking-widest h-auto">
                    Status: {filters.status}
                    <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => removeFilter('status')} />
                  </Badge>
                )}
                {filters.source !== INITIAL_FILTERS.source && (
                  <Badge className="bg-[#1D1D26] text-slate-300 border-[#2A2A35] py-1.5 px-3 rounded-lg gap-2 text-[10px] font-bold uppercase tracking-widest h-auto">
                    Source: {filters.source}
                    <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => removeFilter('source')} />
                  </Badge>
                )}
                {filters.score !== INITIAL_FILTERS.score && (
                  <Badge className="bg-[#1D1D26] text-slate-300 border-[#2A2A35] py-1.5 px-3 rounded-lg gap-2 text-[10px] font-bold uppercase tracking-widest h-auto">
                    Score: {filters.score}
                    <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => removeFilter('score')} />
                  </Badge>
                )}
                {filters.assigned !== INITIAL_FILTERS.assigned && (
                  <Badge className="bg-[#1D1D26] text-slate-300 border-[#2A2A35] py-1.5 px-3 rounded-lg gap-2 text-[10px] font-bold uppercase tracking-widest h-auto">
                    User: {filters.assigned}
                    <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => removeFilter('assigned')} />
                  </Badge>
                )}
                <Button 
                  onClick={clearFilters}
                  variant="ghost" 
                  className="h-8 text-[10px] font-black text-[#7C3AED] uppercase tracking-widest hover:bg-transparent px-2"
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">

           <Table>
             <TableHeader className="bg-[#12121A]">
               <TableRow className="hover:bg-transparent border-[#2A2A35]">
                 <TableHead className="w-[300px] py-6 uppercase text-[10px] font-bold tracking-[0.2em] text-slate-500 px-8">Client Name</TableHead>
                 <TableHead className="py-6 uppercase text-[10px] font-bold tracking-[0.2em] text-slate-500">Status</TableHead>
                 <TableHead className="py-6 uppercase text-[10px] font-bold tracking-[0.2em] text-slate-500">AI Quality</TableHead>
                 <TableHead className="py-6 uppercase text-[10px] font-bold tracking-[0.2em] text-slate-500">Source</TableHead>
                 <TableHead className="py-6 uppercase text-[10px] font-bold tracking-[0.2em] text-slate-500">Assigned</TableHead>
                 <TableHead className="py-6 text-right px-8"></TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {filteredLeads.length === 0 ? (
                 <TableRow>
                   <TableCell colSpan={6} className="h-48 text-center text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
                     No leads found. Start by adding one or importing.
                   </TableCell>
                 </TableRow>
               ) : (
                 filteredLeads.map((lead) => (
                   <TableRow key={lead.id} className="group border-border/50 hover:bg-secondary/20 transition-colors">
                     <TableCell className="px-8 py-5">
                        <div className="flex items-center gap-4">
                           <Avatar className="h-11 w-11 rounded-xl">
                              <AvatarImage src={`https://ui-avatars.com/api/?name=${lead.firstName}+${lead.lastName}&background=7C3AED&color=fff`} />
                              <AvatarFallback className="bg-background text-foreground">{lead.firstName[0]}</AvatarFallback>
                           </Avatar>
                           <div className="min-w-0">
                              <p className="font-extrabold text-sm text-white leading-tight truncate lc-name">{lead.firstName} {lead.lastName}</p>
                              <div className="flex items-center gap-1.5 mt-1.5">
                                 <WhatsApp className="w-3 h-3 text-green-500" />
                                 <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">{lead.phone}</p>
                              </div>
                           </div>
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className={cn(
                          "rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-widest inline-block border",
                          lead.status === 'New' && "bg-blue-500/20 text-blue-400 border-blue-500/30",
                          lead.status === 'Qualified' && "bg-primary/20 text-primary border-primary/30",
                          lead.status === 'Contacted' && "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
                          lead.status === 'Won' && "bg-green-500/20 text-green-400 border-green-500/30",
                          lead.status === 'Lost' && "bg-red-500/20 text-red-400 border-red-500/30",
                        )}>
                          {lead.status}
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className="flex items-center gap-3">
                           <div className="w-16 h-1.5 bg-background rounded-full overflow-hidden border border-border">
                              <div 
                                className={cn(
                                  "h-full transition-all duration-1000 shadow-[0_0_8px_currentColor]",
                                  lead.score > 70 ? "bg-green-400" : lead.score > 40 ? "bg-yellow-400" : "bg-red-400"
                                )} 
                                style={{ width: `${lead.score}%` }} 
                              />
                           </div>
                           <span className={cn(
                              "text-[10px] font-black uppercase tracking-wider",
                              lead.score > 70 ? "text-green-400" : lead.score > 40 ? "text-yellow-400" : "text-red-400"
                           )}>{lead.score}%</span>
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                           {lead.source}
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className="flex items-center gap-3">
                           <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground uppercase overflow-hidden">
                              {lead.assigned === 'Unassigned' ? '?' : lead.assigned[0]}
                           </div>
                           <span className={cn(
                              "text-xs font-bold uppercase tracking-widest",
                              lead.assigned === 'Unassigned' ? "text-muted-foreground/60" : "text-muted-foreground"
                           )}>{lead.assigned}</span>
                        </div>
                     </TableCell>
                     <TableCell className="px-8 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/20 hover:text-primary transition-all">
                              <Phone className="w-4 h-4" />
                           </Button>
                           <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-green-500/20 hover:text-green-500 transition-all">
                               <MessageSquare className="w-4 h-4" />
                           </Button>
                           <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-white transition-all">
                              <MoreVertical className="w-4 h-4" />
                           </Button>
                        </div>
                     </TableCell>
                   </TableRow>
                 ))
               )}
             </TableBody>
           </Table>
        </CardContent>
        <div className="p-8 border-t border-border flex items-center justify-between bg-secondary/10">
           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Page 1 of 42</p>
           <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-xl h-10 w-10 p-0 border-border bg-transparent text-muted-foreground" disabled>
                 <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl h-10 w-10 p-0 bg-primary text-white border-primary shadow-lg shadow-primary/20 font-bold">1</Button>
              <Button variant="outline" size="sm" className="rounded-xl h-10 w-10 p-0 border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary">2</Button>
              <Button variant="outline" size="sm" className="rounded-xl h-10 w-10 p-0 border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary">
                 <ChevronRight className="w-4 h-4" />
              </Button>
           </div>
        </div>
      </Card>
    </div>
  );
};

// Simple localized WhatsApp icon for SA context
const WhatsApp = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
