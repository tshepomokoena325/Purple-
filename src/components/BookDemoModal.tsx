import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogClose
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../../components/ui/select';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Progress } from '../../components/ui/progress';
import { Calendar } from '../../components/ui/calendar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  CheckCircle2, 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  Plus
} from 'lucide-react';
import { format, addMonths, isSameDay, isBefore, startOfToday } from 'date-fns';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'qualification' | 'scheduling' | 'confirmation';

interface FormData {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  leadVolume: string;
  followupMethod: string;
  biggestChallenge: string;
}

const INITIAL_FORM_DATA: FormData = {
  fullName: '',
  businessName: '',
  email: '',
  phone: '',
  businessType: '',
  leadVolume: '',
  followupMethod: '',
  biggestChallenge: '',
};

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'
];

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>('qualification');
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step === 'qualification') setStep('scheduling');
    else if (step === 'scheduling') handleConfirmBooking();
  };

  const prevStep = () => {
    if (step === 'scheduling') setStep('qualification');
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setStep('confirmation');
    toast.success("Demo booked successfully!");
  };

  const generateGoogleCalendarLink = () => {
    if (!selectedDate || !selectedTime) return '';
    
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes, 0);
    
    const endDate = new Date(startDate.getTime() + 45 * 60000); // 45 minutes duration

    const formatGDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '');
    
    const title = encodeURIComponent('Purple Product Demo');
    const details = encodeURIComponent(`1-on-1 Personalized Product Walkthrough for ${formData.businessName}. \n\nLead Volume: ${formData.leadVolume}\nChallenge: ${formData.biggestChallenge}`);
    const location = encodeURIComponent('Online / Video Call');
    const dates = `${formatGDate(startDate)}/${formatGDate(endDate)}`;

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  const generateICSFile = () => {
    if (!selectedDate || !selectedTime) return;

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes, 0);
    const endDate = new Date(startDate.getTime() + 45 * 60000);

    const formatICSDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      'SUMMARY:Purple Product Demo',
      `DESCRIPTION:1-on-1 Personalized Product Walkthrough for ${formData.businessName}`,
      'LOCATION:Online / Video Call',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'purple-demo.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetModal = () => {
    setStep('qualification');
    setFormData(INITIAL_FORM_DATA);
    setSelectedDate(undefined);
    setSelectedTime(null);
  };

  const progress = step === 'qualification' ? 33 : step === 'scheduling' ? 66 : 100;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] bg-[#0B0B0F] border-[#2A2A35] p-0 overflow-hidden text-white rounded-3xl shadow-2xl">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#1A1A24] z-50">
          <motion.div 
            className="h-full bg-primary" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === 'qualification' && (
              <motion.div
                key="qualification"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold tracking-tight text-white">Book Your Personalised Demo</h2>
                  <p className="text-slate-400 text-sm">Answer a few quick questions so we can tailor the demo to your business.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Full Name</Label>
                    <Input 
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="e.g. John Doe"
                      className="bg-[#12121A] border-[#2A2A35] rounded-xl h-11 focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Business Name</Label>
                    <Input 
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      placeholder="e.g. Acme Solar"
                      className="bg-[#12121A] border-[#2A2A35] rounded-xl h-11 focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Email Address</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className="bg-[#12121A] border-[#2A2A35] rounded-xl h-11 focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Phone Number</Label>
                    <Input 
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+27 00 000 0000"
                      className="bg-[#12121A] border-[#2A2A35] rounded-xl h-11 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                   <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">What type of business do you run?</Label>
                    <Select value={formData.businessType} onValueChange={(v) => handleInputChange('businessType', v)}>
                      <SelectTrigger className="bg-[#12121A] border-[#2A2A35] rounded-xl h-11">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#12121A] border-[#2A2A35] text-white">
                        <SelectItem value="Solar Company">Solar Company</SelectItem>
                        <SelectItem value="Dental Clinic">Dental Clinic</SelectItem>
                        <SelectItem value="Security Company">Security Company</SelectItem>
                        <SelectItem value="Contractor">Contractor</SelectItem>
                        <SelectItem value="Agency">Agency</SelectItem>
                        <SelectItem value="Real Estate">Real Estate</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">How many leads do you generate per month?</Label>
                    <Select value={formData.leadVolume} onValueChange={(v) => handleInputChange('leadVolume', v)}>
                      <SelectTrigger className="bg-[#12121A] border-[#2A2A35] rounded-xl h-11">
                        <SelectValue placeholder="Select lead volume" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#12121A] border-[#2A2A35] text-white">
                        <SelectItem value="0–20">0–20</SelectItem>
                        <SelectItem value="20–50">20–50</SelectItem>
                        <SelectItem value="50–100">50–100</SelectItem>
                        <SelectItem value="100+">100+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">How are you currently following up with leads?</Label>
                    <RadioGroup 
                      value={formData.followupMethod} 
                      onValueChange={(v) => handleInputChange('followupMethod', v)}
                      className="grid grid-cols-2 gap-2"
                    >
                      {['Manually', 'CRM / Software', 'WhatsApp Only', 'No Process'].map((method) => (
                        <div key={method} className="flex items-center space-x-2 bg-[#12121A] border border-[#2A2A35] p-3 rounded-xl hover:bg-secondary cursor-pointer transition-colors">
                          <RadioGroupItem value={method} id={method} className="border-slate-500" />
                          <Label htmlFor={method} className="text-xs font-semibold cursor-pointer">{method}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                   <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">What is your biggest challenge?</Label>
                    <Select value={formData.biggestChallenge} onValueChange={(v) => handleInputChange('biggestChallenge', v)}>
                      <SelectTrigger className="bg-[#12121A] border-[#2A2A35] rounded-xl h-11 text-left">
                        <SelectValue placeholder="Select your biggest challenge" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#12121A] border-[#2A2A35] text-white">
                        <SelectItem value="Slow Response Time">Slow Response Time</SelectItem>
                        <SelectItem value="Missed Follow-Up">Missed Follow-Up</SelectItem>
                        <SelectItem value="Leads Going Cold">Leads Going Cold</SelectItem>
                        <SelectItem value="Booking More Appointments">Booking More Appointments</SelectItem>
                        <SelectItem value="Team Not Tracking Leads Properly">Team Not Tracking Leads Properly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={nextStep} 
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg group shadow-xl shadow-primary/20"
                  disabled={!formData.fullName || !formData.email || !formData.businessType}
                >
                  Continue to Calendar
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            )}

            {step === 'scheduling' && (
              <motion.div
                key="scheduling"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={prevStep} className="rounded-full text-slate-400">
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <div className="space-y-1">
                    <h2 className="text-2xl font-extrabold tracking-tight text-white">Choose Your Demo Time</h2>
                    <p className="text-slate-400 text-sm">Select a date and time that works best for your schedule.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="bg-[#12121A] border border-[#2A2A35] rounded-3xl p-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => isBefore(date, startOfToday()) || date.getDay() === 0 || date.getDay() === 6}
                      className="rounded-md border-0"
                      initialFocus
                      classNames={{
                        head_cell: "text-slate-500 w-9 font-normal text-[0.8rem]",
                        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: cn(
                          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-secondary rounded-full transition-all"
                        ),
                        day_selected:
                          "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white",
                        day_outside: "text-slate-700 opacity-50",
                        day_disabled: "text-slate-800 opacity-50",
                        day_hidden: "invisible",
                      }}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                       <Clock className="w-3 h-3" />
                       South African Time Zone (SAST)
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {selectedDate ? (
                        TIME_SLOTS.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? 'default' : 'outline'}
                            className={cn(
                              "h-12 rounded-xl text-sm font-bold border-[#2A2A35] transition-all",
                              selectedTime === time 
                                ? "bg-primary text-white border-primary" 
                                : "bg-[#12121A] hover:bg-secondary text-slate-300"
                            )}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <div className="col-span-2 py-8 text-center text-slate-500 border border-dashed border-[#2A2A35] rounded-3xl">
                          Select a date first
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                         <CalendarIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Meeting Duration</div>
                        <div className="text-sm font-bold">45-Minute Introduction</div>
                      </div>
                   </div>
                   {selectedDate && selectedTime && (
                     <div className="text-right">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-primary">Your Selection</div>
                        <div className="text-sm font-bold">{format(selectedDate, 'PPP')} @ {selectedTime}</div>
                     </div>
                   )}
                </div>

                <Button 
                  onClick={handleConfirmBooking} 
                  disabled={!selectedDate || !selectedTime || isSubmitting}
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg shadow-xl shadow-primary/20"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Processing...
                    </span>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </motion.div>
            )}

            {step === 'confirmation' && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-8"
              >
                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                    className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30"
                  >
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </motion.div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-4xl font-black text-white">Demo Booked Successfully 🎉</h2>
                  <p className="text-slate-400 max-w-sm mx-auto">Your personalised Purple demo has been scheduled. Check your email for confirmation details.</p>
                </div>

                <div className="bg-[#12121A] border border-[#2A2A35] rounded-3xl p-6 max-w-sm mx-auto text-left space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Date</div>
                      <div className="text-sm font-bold">{selectedDate && format(selectedDate, 'MMM dd, yyyy')}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Time</div>
                      <div className="text-sm font-bold text-primary">{selectedTime} SAST</div>
                    </div>
                  </div>
                  <div className="h-px bg-[#2A2A35]" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Attendee</div>
                    <div className="text-sm font-bold truncate">{formData.fullName}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Type</div>
                    <div className="text-sm font-bold">1-on-1 Product Walkthrough</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-12 border-[#2A2A35] rounded-xl font-bold bg-[#12121A] hover:bg-secondary transition-all">
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Calendar
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#12121A] border-[#2A2A35] text-white rounded-xl min-w-[200px]">
                      <DropdownMenuItem className="p-3 cursor-pointer hover:bg-secondary" onClick={() => window.open(generateGoogleCalendarLink(), '_blank')}>
                        <img src="https://www.google.com/s2/favicons?domain=calendar.google.com" className="w-4 h-4 mr-3" referrerPolicy="no-referrer" />
                        Google Calendar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-3 cursor-pointer hover:bg-secondary" onClick={generateICSFile}>
                        <CalendarIcon className="w-4 h-4 mr-3 text-primary" />
                        Apple / Outlook (.ics)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button onClick={() => { onClose(); resetModal(); }} className="h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold">
                    Close
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};
