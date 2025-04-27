
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Check, X, Calendar as CalendarIcon, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import api from '@/utils/api';

const MyAppointments = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const navigate = useNavigate();

  // Mock appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: 'Արամ Պետրոսյան',
      specialty: 'Սրտաբան',
      date: '2025-03-18',
      time: '10:00',
      status: 'cancelled'
    },
    {
      id: 2,
      doctor: 'Լիլիթ Հակոբյան',
      specialty: 'Նյարդաբան',
      date: '2025-03-28',
      time: '15:30',
      status: 'completed'
    },
    {
      id: 3,
      doctor: 'Գոռ Սարգսյան',
      specialty: 'Ակնաբույժ',
      date: '2025-04-05',
      time: '11:15',
      status: 'cancelled'
    },
    {
      id: 4,
      doctor: 'Անի Մինասյան',
      specialty: 'Մաշկաբան',
      date: '2025-04-24',
      time: '14:00',
      status: 'cancelled'
    },
    {
      id: 5,
      doctor: 'Անի Մինասյան',
      specialty: 'Մաշկաբան',
      date: '2025-04-30',
      time: '11:00',
      status: 'upcoming'
    }
  ]);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    setIsLoggedIn(true);
    
    // In a real implementation, you'd fetch appointments from the API
    // loadUserAppointments();
  }, [navigate]);
  
  // Function to fetch user appointments from the backend
  // const loadUserAppointments = async () => {
  //   try {
  //     const response = await api.get('/api/appointments/myappointments');
  //     setAppointments(response.data);
  //   } catch (error) {
  //     console.error('Error fetching appointments:', error);
  //     toast.error("Չստացվեց բեռնել այցելությունները", {
  //       description: "Խնդրում ենք փորձել ավելի ուշ"
  //     });
  //   }
  // };

  const handleCancelClick = (id) => {
    setSelectedAppointmentId(id);
    setCancelDialogOpen(true);
  };

  const handleCancel = () => {
    if (!selectedAppointmentId) return;
    
    // Find the appointment to cancel
    const updatedAppointments = appointments.map(appointment => {
      if (appointment.id === selectedAppointmentId) {
        return { ...appointment, status: 'cancelled' };
      }
      return appointment;
    });
    
    // Update state with the cancelled appointment
    setAppointments(updatedAppointments);
    
    // Reset dialog state
    setCancelDialogOpen(false);
    setSelectedAppointmentId(null);
    setCancelReason('');
    
    // In a real implementation, you'd call the API
    // cancelAppointmentOnServer(selectedAppointmentId, cancelReason);
    
    // Show success message
    toast.success("Այցելությունը հաջողությամբ չեղարկվեց", {
      description: "Ձեր այցելությունը չեղարկված է"
    });
  };
  
  // Function to cancel appointment on the server
  // const cancelAppointmentOnServer = async (id, reason) => {
  //   try {
  //     await api.put(`/api/appointments/${id}/cancel`, { cancelReason: reason });
  //     // Reload appointments after cancellation
  //     loadUserAppointments();
  //   } catch (error) {
  //     console.error('Error canceling appointment:', error);
  //     toast.error("Սխալ այցելությունը չեղարկելիս", {
  //       description: "Խնդրում ենք փորձել ավելի ուշ"
  //     });
  //   }
  // };

  const handleReschedule = (id) => {
    // For now, we'll just navigate to the appointment page
    // In a real app, you might want to pass the existing appointment details
    // to pre-fill the form
    navigate('/appointment', { state: { appointmentId: id, mode: 'edit' } });
    
    // Show info message
    toast.info("Վերանշանակեք ձեր այցելությունը", {
      description: "Խնդրում ենք ընտրել նոր ամսաթիվ և ժամ"
    });
  };

  if (!isLoggedIn) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'upcoming':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">Առաջիկա</span>;
      case 'completed':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">Ավարտված</span>;
      case 'cancelled':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-medium">Չեղարկված</span>;
      default:
        return null;
    }
  };

  return (
    <div className="pt-32 pb-16 min-h-screen bg-gray-50">
      <div className="page-container max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white">
            <h1 className="text-3xl font-bold">Իմ այցելությունները</h1>
            <p className="mt-2 opacity-90">Ձեր բժշկական այցելությունների պատմությունը։</p>
          </div>
          
          <div className="p-8">
            {appointments.length > 0 ? (
              <div className="space-y-6">
                {appointments.map(appointment => (
                  <div 
                    key={appointment.id} 
                    className={`border rounded-lg p-5 ${
                      appointment.status === 'upcoming' 
                        ? 'border-blue-200 bg-blue-50'
                        : appointment.status === 'completed'
                          ? 'border-green-200 bg-green-50'
                          : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <User className="w-5 h-5 text-blue-500 mr-2" />
                        <div>
                          <h3 className="font-semibold">{appointment.doctor}</h3>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        </div>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Ամսաթիվ</p>
                          <p className="font-medium">{appointment.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-500 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Ժամ</p>
                          <p className="font-medium">{appointment.time}</p>
                        </div>
                      </div>
                    </div>
                    
                    {appointment.status === 'upcoming' && (
                      <div className="mt-5 flex flex-wrap gap-3">
                        <button 
                          onClick={() => handleReschedule(appointment.id)} 
                          className="px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Խմբագրել
                        </button>
                        <button 
                          onClick={() => handleCancelClick(appointment.id)} 
                          className="px-4 py-2 bg-white border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Չեղարկել
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Այցելություններ չկան</h3>
                <p className="text-gray-500 mt-2">Դուք դեռ չունեք նշանակված այցելություններ</p>
                <button 
                  onClick={() => navigate('/appointment')}
                  className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Ամրագրել այցելություն
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Չեղարկել այցելությունը</DialogTitle>
            <DialogDescription>
              Դուք վստա՞հ եք, որ ցանկանում եք չեղարկել ձեր այցելությունը։
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
            <label htmlFor="cancelReason" className="block text-sm font-medium text-gray-700 mb-1">
              Չեղարկման պատճառ (ոչ պարտադիր)
            </label>
            <textarea
              id="cancelReason"
              rows={3}
              className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
              placeholder="Նշեք չեղարկման պատճառը..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Չեղարկել</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleCancel}>Հաստատել չեղարկումը</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyAppointments;
