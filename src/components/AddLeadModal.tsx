import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { cn } from '../../lib/utils';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: any) => void;
}

export const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose, onAddLead }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    source: 'Website Form',
    notes: ''
  });

  const [channels, setChannels] = useState({
    whatsapp: true,
    sms: true,
    email: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLead({
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'New',
      score: 50,
      created: new Date().toISOString().split('T')[0],
      assigned: 'Unassigned',
      channels
    });
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      source: 'Website Form',
      notes: ''
    });
    onClose();
  };

  const toggleChannel = (channel: keyof typeof channels) => {
    setChannels(prev => ({ ...prev, [channel]: !prev[channel] }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-[420px] bg-[#12121A] border-l border-[#2A2A35] shadow-2xl z-[101] flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-8 border-b border-[#2A2A35] relative">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white transition-colors"
                id="close-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-white mb-2">Add New Lead</h2>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Lead will be contacted automatically via AI within 30 seconds
              </p>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">First Name</label>
                  <Input 
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="e.g. Sipho"
                    className="bg-[#0B0B0F] border-[#2A2A35] focus:border-[#7C3AED] h-10 text-xs font-medium placeholder:text-slate-700"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Last Name</label>
                  <Input 
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    placeholder="e.g. Mokoena"
                    className="bg-[#0B0B0F] border-[#2A2A35] focus:border-[#7C3AED] h-10 text-xs font-medium placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Email Address</label>
                <Input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="sipho@example.co.za"
                  className="bg-[#0B0B0F] border-[#2A2A35] focus:border-[#7C3AED] h-10 text-xs font-medium placeholder:text-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Phone Number</label>
                <Input 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+27 82 000 0000"
                  className="bg-[#0B0B0F] border-[#2A2A35] focus:border-[#7C3AED] h-10 text-xs font-medium placeholder:text-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Company Name</label>
                <Input 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="Blue Sky Solar"
                  className="bg-[#0B0B0F] border-[#2A2A35] focus:border-[#7C3AED] h-10 text-xs font-medium placeholder:text-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Lead Source</label>
                <select 
                  value={formData.source}
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                  className="w-full bg-[#0B0B0F] border border-[#2A2A35] rounded-md h-10 text-xs font-medium px-3 text-white focus:outline-none focus:border-[#7C3AED]"
                >
                  {['Website Form', 'Facebook Ad', 'Google Ad', 'WhatsApp', 'Referral', 'Manual Entry'].map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Follow-up Channels</label>
                <div className="flex gap-2">
                  {(['whatsapp', 'sms', 'email'] as const).map((channel) => (
                    <button
                      key={channel}
                      type="button"
                      onClick={() => toggleChannel(channel)}
                      className={cn(
                        "flex-1 py-2.5 rounded-lg border text-[11px] font-bold uppercase tracking-wider transition-all",
                        channels[channel] 
                          ? "bg-[#7C3AED] border-[#7C3AED] text-white" 
                          : "bg-transparent border-[#2A2A35] text-slate-500"
                      )}
                    >
                      {channel}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Notes</label>
                <textarea 
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Any extra info..."
                  className="w-full bg-[#0B0B0F] border border-[#2A2A35] rounded-md p-3 text-xs font-medium text-white focus:outline-none focus:border-[#7C3AED] resize-none"
                />
              </div>
            </form>

            {/* Footer */}
            <div className="p-8 border-t border-[#2A2A35] bg-[#12121A] space-y-3">
              <Button 
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white h-12 rounded-xl font-bold text-xs uppercase tracking-widest"
              >
                Add Lead + Start AI Follow-Up
              </Button>
              <Button 
                variant="outline" 
                onClick={onClose}
                className="w-full bg-transparent border-[#2A2A35] text-slate-400 hover:text-white h-12 rounded-xl font-bold text-xs uppercase tracking-widest"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
