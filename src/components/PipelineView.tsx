import React from 'react';
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  Filter, 
  Settings2,
  Calendar,
  MessageSquare,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

interface Column {
  id: string;
  title: string;
  count: number;
}

const columns: Column[] = [
  { id: 'new', title: 'New Leads', count: 12 },
  { id: 'contacted', title: 'Contacted', count: 8 },
  { id: 'qualified', title: 'Qualified', count: 5 },
  { id: 'booked', title: 'Booked', count: 4 },
  { id: 'won', title: 'Won', count: 15 },
];

const cards: any[] = [];

export const PipelineView: React.FC = () => {
  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold page-title">Sales Pipeline</h2>
          <p className="text-sm text-muted-foreground">Visualize and manage your lead progression seamlessly.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-10 border-border/50">
             <Settings2 className="w-4 h-4 mr-2" />
             Pipeline Settings
          </Button>
          <Button className="rounded-xl h-10 font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
             <Plus className="w-4 h-4 mr-2" />
             Create Deal
          </Button>
        </div>
      </div>

      <div className="flex flex-1 gap-8 overflow-x-auto pb-4 custom-scrollbar">
        {columns.map((col) => (
          <div key={col.id} className="min-w-[300px] w-[340px] flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{col.title}</h3>
                 <div className="bg-slate-900 border border-slate-800 text-slate-400 text-[9px] font-bold w-6 h-6 rounded-full flex items-center justify-center pipe-col-count">
                   {col.count}
                 </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-600 hover:text-white hover:bg-slate-800">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-4 min-h-[400px]">
              {cards.filter(c => c.status === col.id).map((card) => (
                <Card key={card.id} className="group cursor-grab active:cursor-grabbing hover:border-primary/50 transition-all duration-300 border-border bg-card relative overflow-hidden">
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-start justify-between">
                       <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10 rounded-xl">
                             <AvatarImage src={`https://ui-avatars.com/api/?name=${card.name}&background=7C3AED&color=fff`} />
                             <AvatarFallback className="bg-background text-foreground">{card.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                             <p className="text-sm font-extrabold leading-tight truncate lc-name">{card.name}</p>
                             <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-1.5">{card.business}</p>
                          </div>
                       </div>
                       <div className="text-[10px] font-black text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded tracking-tighter">
                          {card.value}
                       </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                       <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {card.time}
                       </div>
                       <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[8px] font-bold text-muted-foreground capitalize">
                             M
                          </div>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="ghost" className="w-full h-12 border border-dashed border-border rounded-2xl text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all font-bold text-[10px] uppercase tracking-[0.2em] bg-transparent">
                 <Plus className="w-4 h-4 mr-2" />
                 New Deal
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
