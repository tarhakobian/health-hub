
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Calendar, Clock, User, MapPin, Check, X, Plus, Trash, Edit, LogOut, RefreshCw } from 'lucide-react';
import { toast } from "sonner";
import api from '../utils/api';
import { doctors as doctorsData } from '../data/doctors';

interface Doctor {
  id: string;
  _id?: string;
  name: string;
  specialty: string;
  image: string;
  experience: string;
  education: string;
  bio: string;
  availability?: string[];
  languages?: string[];
}

interface Appointment {
  _id: string;
  patient: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [appointmentError, setAppointmentError] = useState<string | null>(null);
  
  // Initialize with doctors data from import
  const [doctors, setDoctors] = useState<Doctor[]>(doctorsData);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [doctorError, setDoctorError] = useState<string | null>(null);
  
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
    image: '',
    experience: '',
    education: '',
    bio: ''
  });
  
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  
  // Function to reload doctors data from the dynamic import
  const reloadDoctorsData = async () => {
    try {
      setLoadingDoctors(true);
      // Clear module cache to force re-import
      const timestamp = new Date().getTime();
      const module = await import(`../data/doctors.js?t=${timestamp}`);
      setDoctors(module.doctors);
      console.log('Reloaded doctors data:', module.doctors);
      setDoctorError(null);
    } catch (error) {
      console.error('Error reloading doctors data:', error);
      setDoctorError('Failed to load doctors data');
    } finally {
      setLoadingDoctors(false);
    }
  };
  
  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoadingAppointments(true);
        const response = await api.get('/appointments');
        console.log('Fetched appointments:', response.data);
        
        // Ensure we always have an array, even if the response isn't what we expect
        setAppointments(Array.isArray(response.data) ? response.data : []);
        setAppointmentError(null);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setAppointmentError('Failed to load appointments');
        setAppointments([]);
      } finally {
        setLoadingAppointments(false);
      }
    };

    if (isAdmin) {
      fetchAppointments();
    }
  }, [isAdmin]);
  
  // Check admin status
  useEffect(() => {
    const adminData = localStorage.getItem('userInfo');
    if (!adminData) {
      toast.error("Մուտքը մերժված է: Դուք չունեք այս էջին մուտք գործելու իրավունք");
      navigate('/admin-login');
      return;
    }
    
    try {
      const admin = JSON.parse(adminData);
      if (!admin.isAdmin) {
        navigate('/admin-login');
        return;
      }
      setIsAdmin(true);
    } catch (error) {
      console.error("Error parsing admin data:", error);
      navigate('/admin-login');
    }
  }, [navigate]);
  
  if (!isAdmin) return null;
  
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    toast.success('Դուք հաջողությամբ դուրս եք եկել ադմինիստրատորի վահանակից');
    navigate('/');
  };
  
  const handleCancelAppointment = async (id: string) => {
    try {
      await api.put(`/appointments/${id}`, { status: 'cancelled' });
      
      // Update local state
      const updatedAppointments = appointments.map(appointment => 
        appointment._id === id ? { ...appointment, status: 'cancelled' as const } : appointment
      );
      setAppointments(updatedAppointments);
      toast.success("Այցելությունը հաջողությամբ չեղարկվել է");
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error("Այցելության չեղարկումը ձախողվեց");
    }
  };
  
  const handleAddDoctor = async () => {
    if (!newDoctor.name || !newDoctor.specialty) {
      toast.error("Անունը և մասնագիտությունը պարտադիր են");
      return;
    }
    
    try {
      setLoadingDoctors(true);
      const response = await api.post('/doctors', newDoctor);
      console.log('Doctor added response:', response.data);
      
      // Reset form
      setNewDoctor({
        name: '',
        specialty: '',
        image: '',
        experience: '',
        education: '',
        bio: ''
      });
      
      toast.success("Բժիշկը հաջողությամբ ավելացվել է");
      
      // Reload the doctors data
      await reloadDoctorsData();
      
    } catch (error) {
      console.error('Error adding doctor:', error);
      toast.error("Բժիշկի ավելացումը ձախողվեց");
    } finally {
      setLoadingDoctors(false);
    }
  };
  
  const handleDeleteDoctor = async (id: string) => {
    try {
      setLoadingDoctors(true);
      console.log(`Deleting doctor with ID: ${id}`);
      await api.delete(`/doctors/${id}`);
      
      toast.success("Բժիշկը հաջողությամբ հեռացվել է համակարգից");
      
      // Reload the doctors data
      await reloadDoctorsData();
      
    } catch (error) {
      console.error('Error deleting doctor:', error);
      toast.error("Բժիշկի հեռացումը ձախողվեց");
    } finally {
      setLoadingDoctors(false);
    }
  };
  
  const startEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
  };
  
  const handleUpdateDoctor = async () => {
    if (!editingDoctor?.id || !editingDoctor?.name || !editingDoctor?.specialty) {
      toast.error("Անունը և մասնագիտությունը պարտադիր են");
      return;
    }
    
    try {
      setLoadingDoctors(true);
      const response = await api.put(`/doctors/${editingDoctor.id}`, editingDoctor);
      
      setEditingDoctor(null);
      
      toast.success("Բժիշկի տվյալները հաջողությամբ թարմացվել են");
      
      // Reload the doctors data
      await reloadDoctorsData();
      
    } catch (error) {
      console.error('Error updating doctor:', error);
      toast.error("Բժիշկի տվյալների թարմացումը ձախողվեց");
    } finally {
      setLoadingDoctors(false);
    }
  };
  
  const handleManualRefresh = async () => {
    try {
      setLoadingDoctors(true);
      await api.post('/doctors/update-file');
      toast.success("Բժիշկների ցանկը հաջողությամբ թարմացվեց");
      await reloadDoctorsData();
    } catch (error) {
      console.error('Error manually refreshing doctors:', error);
      toast.error("Բժիշկների ցանկի թարմացումը ձախողվեց");
    } finally {
      setLoadingDoctors(false);
    }
  };
  
  const getStatusBadge = (status: Appointment['status']) => {
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
      <div className="page-container max-w-7xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">Ադմինիստրատորի վահանակ</CardTitle>
              <CardDescription>
                Կառավարեք բժշկական կենտրոնի այցելությունները և բժիշկներին
              </CardDescription>
            </div>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" /> 
              Ելք
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="appointments" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="appointments">Այցելություններ</TabsTrigger>
                <TabsTrigger value="doctors">Բժիշկներ</TabsTrigger>
              </TabsList>
              
              <TabsContent value="appointments">
                {appointmentError && (
                  <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md">
                    {appointmentError}
                  </div>
                )}
                
                {loadingAppointments ? (
                  <div className="text-center p-8">
                    <p>Տվյալները բեռնվում են...</p>
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Պացիենտ</TableHead>
                          <TableHead>Բժիշկ</TableHead>
                          <TableHead>Ամսաթիվ</TableHead>
                          <TableHead>Ժամ</TableHead>
                          <TableHead>Կարգավիճակ</TableHead>
                          <TableHead className="text-right">Գործողություններ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {appointments.map((appointment) => (
                          <TableRow key={appointment._id}>
                            <TableCell>{appointment.patient}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{appointment.doctor}</div>
                                <div className="text-sm text-gray-500">{appointment.specialty}</div>
                              </div>
                            </TableCell>
                            <TableCell>{appointment.date}</TableCell>
                            <TableCell>{appointment.time}</TableCell>
                            <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                            <TableCell className="text-right">
                              {appointment.status === 'upcoming' && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                      <X className="mr-1 h-4 w-4" /> Չեղարկել
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Չեղարկել այցելությունը?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Այս գործողությունը կչեղարկի {appointment.patient}-ի ամրագրումը {appointment.doctor}-ի մոտ {appointment.date}-ին։
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Չեղարկել</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleCancelAppointment(appointment._id)}>
                                        Չեղարկել այցելությունը
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center p-8 border rounded-md">
                    <p>Այցելություններ չկան</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="doctors">
                <div className="mb-6 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">Բժիշկների ցանկ ({doctors.length})</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleManualRefresh}
                      disabled={loadingDoctors}
                      className="flex items-center gap-1"
                    >
                      <RefreshCw className="h-4 w-4" />
                      {loadingDoctors ? 'Թարմացվում է...' : 'Թարմացնել'}
                    </Button>
                  </div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" /> Ավելացնել բժիշկ
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Ավելացնել նոր բժիշկ</SheetTitle>
                        <SheetDescription>
                          Լրացրեք հետևյալ տվյալները նոր բժիշկ ավելացնելու համար
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Անուն
                          </Label>
                          <Input
                            id="name"
                            value={newDoctor.name}
                            onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="specialty" className="text-right">
                            Մասնագիտություն
                          </Label>
                          <Input
                            id="specialty"
                            value={newDoctor.specialty}
                            onChange={(e) => setNewDoctor({...newDoctor, specialty: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="image" className="text-right">
                            Նկարի URL
                          </Label>
                          <Input
                            id="image"
                            value={newDoctor.image}
                            onChange={(e) => setNewDoctor({...newDoctor, image: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="experience" className="text-right">
                            Փորձառություն
                          </Label>
                          <Input
                            id="experience"
                            value={newDoctor.experience}
                            onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="education" className="text-right">
                            Կրթություն
                          </Label>
                          <Input
                            id="education"
                            value={newDoctor.education}
                            onChange={(e) => setNewDoctor({...newDoctor, education: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="bio" className="text-right">
                            Կենսագրություն
                          </Label>
                          <Input
                            id="bio"
                            value={newDoctor.bio}
                            onChange={(e) => setNewDoctor({...newDoctor, bio: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button onClick={handleAddDoctor} disabled={loadingDoctors}>
                          {loadingDoctors ? 'Ավելացվում է...' : 'Ավելացնել'}
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
                
                {doctorError && (
                  <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md">
                    {doctorError}
                  </div>
                )}
                
                {loadingDoctors ? (
                  <div className="text-center p-8">
                    <p>Տվյալները բեռնվում են...</p>
                  </div>
                ) : doctors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doctor) => (
                      <Card key={doctor.id} className="overflow-hidden">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={doctor.image} 
                            alt={doctor.name}
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                              // @ts-ignore: Object is possibly null
                              e.target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80';
                            }}
                          />
                        </div>
                        <CardHeader>
                          <CardTitle>{doctor.name}</CardTitle>
                          <CardDescription>{doctor.specialty}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <p className="text-sm"><span className="font-medium">Փորձառություն:</span> {doctor.experience}</p>
                            <p className="text-sm"><span className="font-medium">Կրթություն:</span> {doctor.education}</p>
                            <div>
                              <p className="font-medium text-sm mb-1">Կենսագրություն:</p>
                              <p className="text-sm text-gray-700">{doctor.bio}</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-end mt-4 space-x-2">
                            <Sheet>
                              <SheetTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => startEditDoctor(doctor)}>
                                  <Edit className="h-4 w-4 mr-1" /> Խմբագրել
                                </Button>
                              </SheetTrigger>
                              <SheetContent>
                                <SheetHeader>
                                  <SheetTitle>Խմբագրել բժիշկի տվյալները</SheetTitle>
                                  <SheetDescription>
                                    Փոփոխեք բժիշկի տվյալները
                                  </SheetDescription>
                                </SheetHeader>
                                {editingDoctor && (
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="edit-name" className="text-right">
                                        Անուն
                                      </Label>
                                      <Input
                                        id="edit-name"
                                        value={editingDoctor.name}
                                        onChange={(e) => setEditingDoctor({...editingDoctor, name: e.target.value})}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="edit-specialty" className="text-right">
                                        Մասնագիտություն
                                      </Label>
                                      <Input
                                        id="edit-specialty"
                                        value={editingDoctor.specialty}
                                        onChange={(e) => setEditingDoctor({...editingDoctor, specialty: e.target.value})}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="edit-image" className="text-right">
                                        Նկարի URL
                                      </Label>
                                      <Input
                                        id="edit-image"
                                        value={editingDoctor.image}
                                        onChange={(e) => setEditingDoctor({...editingDoctor, image: e.target.value})}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="edit-experience" className="text-right">
                                        Փորձառություն
                                      </Label>
                                      <Input
                                        id="edit-experience"
                                        value={editingDoctor.experience}
                                        onChange={(e) => setEditingDoctor({...editingDoctor, experience: e.target.value})}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="edit-education" className="text-right">
                                        Կրթություն
                                      </Label>
                                      <Input
                                        id="edit-education"
                                        value={editingDoctor.education}
                                        onChange={(e) => setEditingDoctor({...editingDoctor, education: e.target.value})}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="edit-bio" className="text-right">
                                        Կենսագրություն
                                      </Label>
                                      <Input
                                        id="edit-bio"
                                        value={editingDoctor.bio}
                                        onChange={(e) => setEditingDoctor({...editingDoctor, bio: e.target.value})}
                                        className="col-span-3"
                                      />
                                    </div>
                                  </div>
                                )}
                                <div className="flex justify-end">
                                  <Button onClick={handleUpdateDoctor} disabled={loadingDoctors}>
                                    {loadingDoctors ? 'Պահպանվում է...' : 'Պահպանել'}
                                  </Button>
                                </div>
                              </SheetContent>
                            </Sheet>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Trash className="h-4 w-4 mr-1" /> Հեռացնել
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Ջնջել բժիշկին?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Այս գործողությունը կհեռացնի {doctor.name}-ին համակարգից։ Այս գործողությունը չի կարող շրջադարձվել։
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Չեղարկել</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteDoctor(doctor.id)}>
                                    Ջնջել
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 border rounded-md">
                    <p>Բժիշկներ չկան</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
