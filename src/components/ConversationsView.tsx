import React, { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Info, 
  Send, 
  Paperclip, 
  Smile, 
  ShieldCheck,
  CheckCheck,
  Zap,
  Calendar,
  UserPlus
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { cn } from '../../lib/utils';

const contacts = [
  { id: '1', name: 'Zanele Kumalo', lastMsg: 'Perfect, see you then!', time: '2m ago', unread: 0, status: 'online', type: 'WhatsApp' },
  { id: '2', name: 'Kobus Marais', lastMsg: 'What is the cost for installation?', time: '15m ago', unread: 2, status: 'offline', type: 'SMS' },
  { id: '3', name: 'Sarah Jenkins', lastMsg: 'Thanks for the quote!', time: '1h ago', unread: 0, status: 'online', type: 'WhatsApp' },
  { id: '4', name: 'Johan Meyer', lastMsg: 'Appointment confirmed for Friday.', time: '2h ago', unread: 0, status: 'online', type: 'Email' },
  { id: '5', name: 'Precious Ndlovu', lastMsg: 'I need to reschedule our call.', time: '5h ago', unread: 0, status: 'offline', type: 'WhatsApp' },
];

const messages = [
  { id: '1', sender: 'lead', text: 'Hi, I am interested in getting a solar quote for my home in Sandton.', time: '09:00', type: 'text' },
  { id: '2', sender: 'ai', text: 'Hello Zanele! I can definitely help with that. To give you an accurate estimate, could you tell me your average monthly electricity bill?', time: '09:01', type: 'text' },
  { id: '3', sender: 'lead', text: 'It is usually around R2,500 per month.', time: '09:05', type: 'text' },
  { id: '4', sender: 'ai', text: 'Great. Based on that, a 5kW system would be ideal. Would you like to schedule a site survey with one of our technicians?', time: '09:06', type: 'text' },
  { id: '5', sender: 'lead', text: 'Yes please. Next Tuesday afternoon works best.', time: '09:12', type: 'text' },
  { id: '6', sender: 'ai', text: 'Perfect! I have booked you in for Tuesday at 14:00. Mandla will be your technician. You will receive a confirmation shortly.', time: '09:13', type: 'text' },
  { id: '7', sender: 'lead', text: 'Perfect, see you then!', time: '09:15', type: 'text' },
];

export const ConversationsView: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  return (
    <div className="h-[calc(100vh-160px)] flex gap-6 animate-in fade-in slide-in-from-left-4 duration-500 overflow-hidden">
      {/* Contact List */}
      <Card className="w-80 flex flex-col bg-[#12121A] border-[#2A2A35] shrink-0 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 space-y-6 border-b border-[#2A2A35]">
           <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Conversations</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-[#7C3AED] hover:bg-primary/20">
                 <UserPlus className="w-4 h-4" />
              </Button>
           </div>
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <Input placeholder="Search logs..." className="pl-12 h-11 bg-[#0B0B0F] border-[#2A2A35] text-white rounded-xl placeholder:text-slate-600 focus:border-primary/50" />
           </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="px-3 py-4 space-y-1.5">
             {contacts.map((contact) => (
               <button
                 key={contact.id}
                 onClick={() => setSelectedContact(contact)}
                 className={cn(
                   "w-full flex items-start gap-4 p-4 rounded-xl transition-all group relative border border-transparent",
                   selectedContact.id === contact.id ? "bg-slate-900 border-[#2A2A35]" : "hover:bg-slate-900/50"
                 )}
               >
                 <div className="relative">
                    <Avatar className="h-11 w-11 rounded-xl border border-[#2A2A35] shadow-lg">
                       <AvatarImage src={`https://ui-avatars.com/api/?name=${contact.name}&background=7C3AED&color=fff`} />
                       <AvatarFallback className="bg-[#0B0B0F] text-white">{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    {contact.status === 'online' && (
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#12121A] shadow-lg" />
                    )}
                 </div>
                 <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                       <p className={cn("text-xs font-extrabold truncate", selectedContact.id === contact.id ? "text-white" : "text-slate-400")}>{contact.name}</p>
                       <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest shrink-0">{contact.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium truncate leading-relaxed">{contact.lastMsg}</p>
                 </div>
               </button>
             ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Chat Thread */}
      <Card className="flex-1 flex flex-col bg-[#12121A] border-[#2A2A35] overflow-hidden rounded-2xl shadow-2xl">
        {/* Chat Header */}
        <div className="h-20 flex items-center justify-between px-8 border-b border-[#2A2A35] bg-[#12121A]/80 backdrop-blur-xl">
           <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 rounded-xl border border-[#2A2A35]">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${selectedContact.name}&background=7C3AED&color=fff`} />
                  <AvatarFallback className="bg-[#0B0B0F] text-white">{selectedContact.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                 <h4 className="text-sm font-extrabold text-white leading-none">{selectedContact.name}</h4>
                 <div className="flex items-center gap-2 leading-none mt-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgb(34,197,94,0.6)]" />
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active via {selectedContact.type}</span>
                 </div>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white">
                 <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white">
                 <Video className="w-5 h-5" />
              </Button>
              <Separator orientation="vertical" className="h-6 mx-2 bg-[#2A2A35]" />
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400">
                 <MoreVertical className="w-5 h-5" />
              </Button>
           </div>
        </div>

        {/* Message Viewport */}
        <ScrollArea className="flex-1 p-8 bg-[#0B0B0F]/30">
           <div className="space-y-8">
              <div className="flex justify-center">
                 <div className="px-3 py-1 bg-slate-900 border border-[#2A2A35] text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 rounded-full">Thursday, April 30</div>
              </div>
              
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex flex-col max-w-[75%] space-y-2",
                    msg.sender === 'ai' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div 
                    className={cn(
                      "group relative p-5 rounded-2xl text-[13px] font-medium leading-relaxed shadow-2xl",
                      msg.sender === 'ai' 
                        ? "bg-[#7C3AED] text-white rounded-tr-none shadow-purple-900/20" 
                        : "bg-[#12121A] border border-[#2A2A35] text-white rounded-tl-none"
                    )}
                  >
                    {msg.sender === 'ai' && (
                       <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.1em] opacity-80 mb-3">
                          <Zap className="w-3.5 h-3.5 fill-current" />
                          AI Qualifier Alpha
                       </div>
                    )}
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{msg.time}</span>
                    {msg.sender === 'ai' && <CheckCheck className="w-3.5 h-3.5 text-primary" />}
                  </div>
                </div>
              ))}
           </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-6 border-t border-[#2A2A35] bg-[#12121A]">
           <div className="flex items-end gap-3 bg-[#0B0B0F] border border-[#2A2A35] rounded-2xl p-2 pr-4 focus-within:border-primary/50 transition-all shadow-inner">
              <div className="flex gap-1 pb-1">
                 <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-500 hover:text-white">
                    <Paperclip className="w-5 h-5" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-500 hover:text-white">
                    <Smile className="w-5 h-5" />
                 </Button>
              </div>
              <textarea 
                placeholder="Reply or use '/' for AI commands..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2.5 resize-none h-[42px] max-h-32 text-white placeholder:text-slate-600 outline-none font-medium"
              />
              <Button size="icon" className="h-10 w-10 rounded-xl bg-primary text-white shadow-lg shadow-purple-900/40 hover:shadow-purple-500/40 transition-all shrink-0">
                 <Send className="w-4 h-4" />
              </Button>
           </div>
        </div>
      </Card>

      {/* Detail Panel */}
      <Card className="w-80 hidden xl:flex flex-col bg-[#12121A] border-l border-[#2A2A35] shrink-0 overflow-hidden">
        <ScrollArea className="flex-1">
           <div className="p-8 text-center space-y-6">
              <Avatar className="h-24 w-24 rounded-3xl border-2 border-primary/20 shadow-2xl mx-auto p-1 bg-[#0B0B0F]">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${selectedContact.name}&background=7C3AED&color=fff`} className="rounded-2xl" />
                  <AvatarFallback className="bg-[#0B0B0F] text-white rounded-2xl">{selectedContact.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                 <h4 className="text-base font-extrabold text-white">{selectedContact.name}</h4>
                 <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-black mt-2">Enterprise Intent Lead</p>
              </div>
              <div className="flex items-center justify-center gap-2">
                 <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[9px] font-black text-green-500 uppercase tracking-widest">Qualified</div>
                 <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[9px] font-black text-primary uppercase tracking-widest">Active</div>
              </div>
           </div>
           
           <Separator className="bg-[#2A2A35]" />

           <div className="p-8 space-y-8">
              <div className="space-y-4">
                 <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Engagement Score</h5>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#0B0B0F] border border-[#2A2A35] text-center shadow-inner">
                       <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2">Intent</p>
                       <p className="text-sm font-black text-primary">94%</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#0B0B0F] border border-[#2A2A35] text-center shadow-inner">
                       <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2">Replies</p>
                       <p className="text-sm font-black text-white">18</p>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">AI Intelligence Report</h5>
                 <div className="p-5 rounded-2xl bg-[#0B0B0F] border border-[#2A2A35] space-y-4 border-l-4 border-l-primary shadow-inner">
                    <p className="text-[11px] leading-relaxed text-slate-300 font-medium">
                       {selectedContact.name} is highly motivated. Interested in a <strong>5kW Hybrid setup</strong>. Site survey confirmed for <strong>Tuesday 14:00</strong>. AI has verified budget and property ownership.
                    </p>
                    <div className="flex items-center gap-2 text-primary">
                       <ShieldCheck className="w-4 h-4" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Profile Verified</span>
                    </div>
                 </div>
              </div>

              <div className="space-y-3">
                 <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Operations</h5>
                 <Button variant="outline" className="w-full h-12 rounded-2xl justify-start text-[10px] font-black uppercase tracking-widest border-[#2A2A35] bg-transparent hover:bg-slate-800 hover:text-white transition-all group">
                    <Calendar className="w-4 h-4 mr-3 text-slate-500 group-hover:text-primary" />
                    Reschedule Event
                 </Button>
                 <Button variant="outline" className="w-full h-12 rounded-2xl justify-start text-[10px] font-black uppercase tracking-widest border-[#2A2A35] bg-transparent hover:bg-slate-800 hover:text-white transition-all group">
                    <Zap className="w-4 h-4 mr-3 text-slate-500 group-hover:text-primary" />
                    Takeover Chat
                 </Button>
              </div>
           </div>
        </ScrollArea>
      </Card>
    </div>
  );
};
