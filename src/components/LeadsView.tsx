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
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  UserPlus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
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
  DropdownMenuTrigger 
} from '../../components/ui/dropdown-menu';

const dummyLeads = [
  { id: '1', name: 'Zanele Kumalo', email: 'zanele@gmail.com', phone: '+27 82 456 7890', source: 'Facebook Ads', status: 'Qualified', score: 85, created: '2026-04-30 09:15', assigned: 'Mandla' },
  { id: '2', name: 'Ruan Steyn', email: 'ruan.s@outlook.com', phone: '+27 71 234 5678', source: 'Google Ads', status: 'New', score: 45, created: '2026-04-30 08:42', assigned: 'Unassigned' },
  { id: '3', name: 'Lerato Phiri', email: 'lerato@phiri.co.za', phone: '+27 60 987 6543', source: 'Website Form', status: 'Contacted', score: 62, created: '2026-04-29 16:20', assigned: 'Sarah' },
  { id: '4', name: 'Chris Boucher', email: 'chris@boucher.com', phone: '+27 84 555 1234', source: 'Direct Search', status: 'Won', score: 98, created: '2026-04-29 14:10', assigned: 'Mandla' },
  { id: '5', name: 'Precious Ndlovu', email: 'p.ndlovu@gmail.com', phone: '+27 82 111 2222', source: 'Facebook Ads', status: 'Lost', score: 12, created: '2026-04-29 11:30', assigned: 'Sarah' },
  { id: '6', name: 'Johan Meyer', email: 'johan@meyer.co.za', phone: '+27 72 333 4444', source: 'GMB', status: 'Qualified', score: 78, created: '2026-04-28 15:45', assigned: 'Kobus' },
  { id: '7', name: 'Tshepo Mokoena', email: 'tshepo@mokoena.com', phone: '+27 61 444 5555', source: 'Referral', status: 'New', score: 55, created: '2026-04-28 10:20', assigned: 'Unassigned' },
  { id: '8', name: 'Anita Patel', email: 'anita@patel.co.za', phone: '+27 83 666 7777', source: 'Website Form', status: 'Qualified', score: 82, created: '2026-04-27 14:05', assigned: 'Mandla' },
];

export const LeadsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold">Lead Management</h2>
          <p className="text-sm text-muted-foreground">Manage and track your inbound leads from across South Africa.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-10 border-border/50">
             <Download className="w-4 h-4 mr-2" />
             Export Leads
          </Button>
          <Button className="rounded-xl h-10 font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
             <UserPlus className="w-4 h-4 mr-2" />
             Add Lead
          </Button>
        </div>
      </div>

      <Card className="bg-[#12121A] border-[#2A2A35] rounded-2xl overflow-hidden shadow-2xl">
        <CardHeader className="border-b border-[#2A2A35] py-8 px-8 bg-slate-900/30">
          <div className="flex flex-col lg:flex-row items-center gap-6">
             <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input 
                  placeholder="Search by name, email or phone..." 
                  className="pl-12 h-12 bg-[#0B0B0F] border-[#2A2A35] text-white placeholder:text-slate-600 focus:border-primary/50 transition-all rounded-xl shadow-inner"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <div className="flex items-center gap-4 w-full lg:w-auto">
                <Button variant="outline" className="rounded-xl h-12 border-[#2A2A35] bg-[#0B0B0F] text-white hover:bg-slate-800 flex-1 lg:flex-none font-bold text-xs uppercase tracking-widest px-6">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <div className="h-12 bg-primary/20 text-primary border border-primary/30 rounded-xl px-5 flex items-center shrink-0 font-extrabold text-xs uppercase tracking-widest">
                  {dummyLeads.length} Total
                </div>
             </div>
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
               {dummyLeads.map((lead) => (
                 <TableRow key={lead.id} className="group border-[#2A2A35]/50 hover:bg-[#12121A]/80 transition-colors">
                   <TableCell className="px-8 py-5">
                      <div className="flex items-center gap-4">
                         <Avatar className="h-11 w-11 rounded-xl border border-[#2A2A35] shadow-lg">
                            <AvatarImage src={`https://ui-avatars.com/api/?name=${lead.name}&background=7C3AED&color=fff`} />
                            <AvatarFallback className="bg-[#0B0B0F] text-white">{lead.name[0]}</AvatarFallback>
                         </Avatar>
                         <div className="min-w-0">
                            <p className="font-extrabold text-sm text-white leading-tight truncate">{lead.name}</p>
                            <div className="flex items-center gap-1.5 mt-1.5">
                               <WhatsApp className="w-3 h-3 text-green-500" />
                               <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{lead.phone}</p>
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
                         <div className="w-16 h-1.5 bg-[#0B0B0F] rounded-full overflow-hidden border border-[#2A2A35]">
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
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                         {lead.source}
                      </div>
                   </TableCell>
                   <TableCell>
                      <div className="flex items-center gap-3">
                         <div className="w-7 h-7 rounded-full bg-slate-800 border border-[#2A2A35] flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase overflow-hidden">
                            {lead.assigned === 'Unassigned' ? '?' : lead.assigned[0]}
                         </div>
                         <span className={cn(
                            "text-xs font-bold uppercase tracking-widest",
                            lead.assigned === 'Unassigned' ? "text-slate-600 italic" : "text-slate-400"
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
                         <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-500 hover:text-white transition-all">
                            <MoreVertical className="w-4 h-4" />
                         </Button>
                      </div>
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
        </CardContent>
        <div className="p-8 border-t border-[#2A2A35] flex items-center justify-between bg-slate-900/10">
           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Page 1 of 42</p>
           <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-xl h-10 w-10 p-0 border-[#2A2A35] bg-transparent text-slate-500" disabled>
                 <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl h-10 w-10 p-0 bg-primary text-white border-primary shadow-lg shadow-primary/20 font-bold">1</Button>
              <Button variant="outline" size="sm" className="rounded-xl h-10 w-10 p-0 border-[#2A2A35] bg-transparent text-slate-500 hover:text-white hover:bg-slate-800">2</Button>
              <Button variant="outline" size="sm" className="rounded-xl h-10 w-10 p-0 border-[#2A2A35] bg-transparent text-slate-500 hover:text-white hover:bg-slate-800">
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
