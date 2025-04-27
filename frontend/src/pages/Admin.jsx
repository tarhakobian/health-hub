import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Calendar, Clock, User, MapPin, Check, X, Plus, Trash, Edit, LogOut } from 'lucide-react';
import { toast } from "sonner";
import api from '../utils/api';
import { doctors as doctorsData } from '../data/doctors';

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: 'Անի Հակոբյան',
      doctor: 'Դր. Արամ Պետրոսյան',
      specialty: 'Սրտաբան',
      date: '2023-11-15',
      time: '10:00',
      location: 'Հիմնական մասնաճյուղ, 3-րդ հարկ',
      status: 'upcoming'
    },
    {
      id: 2,
      patient: 'Վահե Մարտիրոսյան',
      doctor: 'Դր. Լիլիթ Հակոբյան',
      specialty: 'Նյարդաբան',
      date: '2023-10-20',
      time: '15:30',
      location: 'Հիմնական մասնաճյուղ, 2-րդ հարկ',
      status: 'completed'
    },
    {
      id: 3,
      patient: 'Մարիամ Գրիգորյան',
      doctor: 'Դր. Գոռ Սարգսյան',
      specialty: 'Ակնաբույժ',
      date: '2023-09-05',
      time: '11:15',
      location: 'Կենտրոնական մասնաճյուղ, 1-ին հարկ',
      status: 'cancelled'
    }
  ]);
  
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
    image: '',
    experience: '',
    education: '',
    bio: '',
    description: '',
    qualifications: [],
    languages: ["Հայերեն", "Ռուսերեն"],
    availability: ["Երկուշաբթի", "Չորեքշաբթի", "Ուրբաթ"],
    schedule: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    }
  });
  
  const [editingDoctor, setEditingDoctor] = useState(null);
  
  const [newQualification, setNewQualification] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newAvailability, setNewAvailability] = useState('');
  const [editNewQualification, setEditNewQualification] = useState('');
  const [editNewLanguage, setEditNewLanguage] = useState('');
  const [editNewAvailability, setEditNewAvailability] = useState('');

  useEffect(() => {
    setDoctors(doctorsData);
    console.log("Loaded doctors from doctors.js:", doctorsData);
  }, []);
  
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      toast.error("Մուտքը մերժված է: Դուք չունեք այս էջին մուտք գործելու իրավունք");
      navigate('/admin-login');
      return;
    }
    
    try {
      const userData = JSON.parse(userInfo);
      if (!userData.isAdmin) {
        navigate('/admin-login');
        return;
      }
      setIsAdmin(true);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate('/admin-login');
    }
  }, [navigate]);
  
  if (!isAdmin) return null;
  
  const handleCancelAppointment = (id) => {
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: 'cancelled' } : appointment
    );
    setAppointments(updatedAppointments);
    toast.success("Այցելությունը հաջողությամբ չեղարկվել է");
  };
  
  const handleAddQualification = () => {
    if (newQualification.trim()) {
      setNewDoctor({
        ...newDoctor,
        qualifications: [...newDoctor.qualifications, newQualification.trim()]
      });
      setNewQualification('');
    }
  };
  
  const handleRemoveQualification = (index) => {
    setNewDoctor({
      ...newDoctor,
      qualifications: newDoctor.qualifications.filter((_, i) => i !== index)
    });
  };
  
  const handleAddLanguage = () => {
    if (newLanguage.trim() && !newDoctor.languages.includes(newLanguage.trim())) {
      setNewDoctor({
        ...newDoctor,
        languages: [...newDoctor.languages, newLanguage.trim()]
      });
      setNewLanguage('');
    }
  };
  
  const handleRemoveLanguage = (index) => {
    setNewDoctor({
      ...newDoctor,
      languages: newDoctor.languages.filter((_, i) => i !== index)
    });
  };
  
  const handleAddAvailability = () => {
    if (newAvailability.trim() && !newDoctor.availability.includes(newAvailability.trim())) {
      setNewDoctor({
        ...newDoctor,
        availability: [...newDoctor.availability, newAvailability.trim()]
      });
      setNewAvailability('');
    }
  };
  
  const handleRemoveAvailability = (index) => {
    setNewDoctor({
      ...newDoctor,
      availability: newDoctor.availability.filter((_, i) => i !== index)
    });
  };
  
  const handleEditAddQualification = () => {
    if (editNewQualification.trim() && editingDoctor) {
      setEditingDoctor({
        ...editingDoctor,
        qualifications: [...(editingDoctor.qualifications || []), editNewQualification.trim()]
      });
      setEditNewQualification('');
    }
  };
  
  const handleEditRemoveQualification = (index) => {
    if (editingDoctor) {
      setEditingDoctor({
        ...editingDoctor,
        qualifications: editingDoctor.qualifications.filter((_, i) => i !== index)
      });
    }
  };
  
  const handleEditAddLanguage = () => {
    if (editNewLanguage.trim() && editingDoctor && !editingDoctor.languages.includes(editNewLanguage.trim())) {
      setEditingDoctor({
        ...editingDoctor,
        languages: [...(editingDoctor.languages || []), editNewLanguage.trim()]
      });
      setEditNewLanguage('');
    }
  };
  
  const handleEditRemoveLanguage = (index) => {
    if (editingDoctor) {
      setEditingDoctor({
        ...editingDoctor,
        languages: editingDoctor.languages.filter((_, i) => i !== index)
      });
    }
  };
  
  const handleEditAddAvailability = () => {
    if (editNewAvailability.trim() && editingDoctor && !editingDoctor.availability.includes(editNewAvailability.trim())) {
      setEditingDoctor({
        ...editingDoctor,
        availability: [...(editingDoctor.availability || []), editNewAvailability.trim()]
      });
      setEditNewAvailability('');
    }
  };
  
  const handleEditRemoveAvailability = (index) => {
    if (editingDoctor) {
      setEditingDoctor({
        ...editingDoctor,
        availability: editingDoctor.availability.filter((_, i) => i !== index)
      });
    }
  };
  
  const handleAddDoctor = async () => {
    if (!newDoctor.name || !newDoctor.specialty) {
      toast.error("Անունը և մասնագիտությունը պարտադիր են");
      return;
    }
    
    try {
      setLoading(true);
      const response = await api.post('/doctors', newDoctor);
      console.log('Doctor added successfully:', response.data);
      
      await api.post('/doctors/update-file');
      
      setNewDoctor({
        name: '',
        specialty: '',
        image: '',
        experience: '',
        education: '',
        bio: '',
        description: '',
        qualifications: [],
        languages: ["Հայերեն", "Ռուսերեն"],
        availability: ["Երկուշաբթի", "Չորեքշաբթի", "Ուրբաթ"],
        schedule: {
          monday: '',
          tuesday: '',
          wednesday: '',
          thursday: '',
          friday: '',
          saturday: '',
          sunday: ''
        }
      });
      
      toast.success("Բժիշկը հաջողությամբ ավելացվել է");
      
      import('../data/doctors.js?t=' + new Date().getTime())
        .then(module => {
          setDoctors(module.doctors);
          console.log('Updated doctors list:', module.doctors);
        })
        .catch(err => {
          console.error('Error reloading doctors.js:', err);
        });
      
    } catch (error) {
      console.error('Error adding doctor:', error);
      toast.error("Բժիշկի ավելացման ժամանակ սխալ է տեղի ունեցել");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteDoctor = async (id) => {
    try {
      setLoading(true);
      console.log(`Deleting doctor with ID: ${id}`);
      
      await api.delete(`/doctors/${id}`);
      
      await api.post('/doctors/update-file');
      
      toast.success("Բժիշկը հաջողությամբ հեռացվել է համակարգից");
      
      import('../data/doctors.js?t=' + new Date().getTime())
        .then(module => {
          setDoctors(module.doctors);
          console.log('Updated doctors list after deletion:', module.doctors);
        })
        .catch(err => {
          console.error('Error reloading doctors.js:', err);
        });
      
    } catch (error) {
      console.error('Error deleting doctor:', error);
      toast.error("Բժիշկի հեռացման ժամանակ սխալ է տեղի ունեցել");
    } finally {
      setLoading(false);
    }
  };
  
  const startEditDoctor = (doctor) => {
    setEditingDoctor({...doctor});
  };
  
  const handleUpdateDoctor = async () => {
    if (!editingDoctor?.name || !editingDoctor?.specialty) {
      toast.error("Անունը և մասնագիտությունը պարտադիր են");
      return;
    }
    
    try {
      setLoading(true);
      console.log(`Updating doctor with ID: ${editingDoctor.id}`, editingDoctor);
      
      await api.put(`/doctors/${editingDoctor.id}`, editingDoctor);
      
      await api.post('/doctors/update-file');
      
      setEditingDoctor(null);
      
      toast.success("Բժիշկի տվյալները հաջողությամբ թարմացվել են");
      
      import('../data/doctors.js?t=' + new Date().getTime())
        .then(module => {
          setDoctors(module.doctors);
          console.log('Updated doctors list after update:', module.doctors);
        })
        .catch(err => {
          console.error('Error reloading doctors.js:', err);
        });
      
    } catch (error) {
      console.error('Error updating doctor:', error);
      toast.error("Բժիշկի տվյալների թարմացման ժամանակ սխալ է տեղի ունեցել");
    } finally {
      setLoading(false);
    }
  };
  
  const handleAdminLogout = () => {
    localStorage.removeItem('userInfo');
    toast.success("Հաջողությամբ դուրս եք եկել ադմինիստրատորի համակարգից");
    navigate('/');
  };
  
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
  
  const handleScheduleChange = (day, value) => {
    setNewDoctor({
      ...newDoctor,
      schedule: {
        ...newDoctor.schedule,
        [day]: value
      }
    });
  };
  
  const handleEditScheduleChange = (day, value) => {
    if (editingDoctor) {
      setEditingDoctor({
        ...editingDoctor,
        schedule: {
          ...(editingDoctor.schedule || {}),
          [day]: value
        }
      });
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
            <Button 
              variant="outline" 
              onClick={handleAdminLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Դուրս գալ
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="doctors" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="appointments">Այցելություններ</TabsTrigger>
                <TabsTrigger value="doctors">Բժիշկներ</TabsTrigger>
              </TabsList>
              
              <TabsContent value="appointments">
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
                        <TableRow key={appointment.id}>
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
                                    <AlertDialogAction onClick={() => handleCancelAppointment(appointment.id)}>
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
              </TabsContent>
              
              <TabsContent value="doctors">
                <div className="mb-6 flex justify-between items-center">
                  <h3 className="text-lg font-medium">Բժիշկների ցանկ ({doctors.length})</h3>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button disabled={loading}>
                        <Plus className="mr-2 h-4 w-4" /> Ավելացնել բժիշկ
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:w-[540px] overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Ավելացնել նոր բժիշկ</SheetTitle>
                        <SheetDescription>
                          Լրացրեք հետևյալ տվյալները նոր բժիշկ ավելացնելու համար
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4 overflow-y-auto h-[80vh] pr-4">
                        <div className="space-y-4 p-4 border rounded-md">
                          <h3 className="text-lg font-medium">Հիմնական տվյալներ</h3>
                          
                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Անուն</Label>
                              <Input
                                id="name"
                                value={newDoctor.name}
                                onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                                placeholder="Դր. Անուն Ազգանուն"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="specialty">Մասնագիտություն</Label>
                              <Input
                                id="specialty"
                                value={newDoctor.specialty}
                                onChange={(e) => setNewDoctor({...newDoctor, specialty: e.target.value})}
                                placeholder="Օրինակ՝ Ակնաբույժ"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="image">Նկարի URL</Label>
                              <Input
                                id="image"
                                value={newDoctor.image}
                                onChange={(e) => setNewDoctor({...newDoctor, image: e.target.value})}
                                placeholder="https://example.com/image.jpg"
                              />
                              <p className="text-xs text-gray-500">Եթե դաշտը դատարկ է, կօգտագործվի լռելյայն նկարը</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4 p-4 border rounded-md">
                          <h3 className="text-lg font-medium">Փորձառություն և կրթություն</h3>
                          
                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="experience">Փորձառություն</Label>
                              <Input
                                id="experience"
                                value={newDoctor.experience}
                                onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})}
                                placeholder="Օրինակ՝ 15+ տարվա փորձ"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="education">Կրթություն</Label>
                              <Input
                                id="education"
                                value={newDoctor.education}
                                onChange={(e) => setNewDoctor({...newDoctor, education: e.target.value})}
                                placeholder="Օրինակ՝ Երևանի Պետական Բժշկական Համալսարան"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4 p-4 border rounded-md">
                          <h3 className="text-lg font-medium">Կենսագրություն և նկարագրություն</h3>
                          
                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="bio">Կարճ կենսագրություն</Label>
                              <Textarea
                                id="bio"
                                value={newDoctor.bio}
                                onChange={(e) => setNewDoctor({...newDoctor, bio: e.target.value})}
                                placeholder="Կարճ նկարագրություն բժշկի մասին"
                                className="min-h-[80px]"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="description">Մանրամասն նկարագրություն</Label>
                              <Textarea
                                id="description"
                                value={newDoctor.description}
                                onChange={(e) => setNewDoctor({...newDoctor, description: e.target.value})}
                                placeholder="Մանրամասն տեղեկատվություն բժշկի մասին"
                                className="min-h-[120px]"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4 p-4 border rounded-md">
                          <h3 className="text-lg font-medium">Որակավորումներ</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <Input
                                value={newQualification}
                                onChange={(e) => setNewQualification(e.target.value)}
                                placeholder="Ավելացնել նոր որակավորում"
                              />
                              <Button 
                                type="button" 
                                onClick={handleAddQualification}
                                size="sm"
                              >
                                Ավելացնել
                              </Button>
                            </div>
                            
                            <div className="space-y-2">
                              {newDoctor.qualifications.length > 0 ? (
                                <div className="space-y-2">
                                  {newDoctor.qualifications.map((qual, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                      <span>{qual}</span>
                                      <Button 
                                        type="button" 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={() => handleRemoveQualification(index)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">Որակավորումներ չկան</p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4 p-4 border rounded-md">
                          <h3 className="text-lg font-medium">Լեզուներ</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <Input
                                value={newLanguage}
                                onChange={(e) => setNewLanguage(e.target.value)}
                                placeholder="Ավելացնել նոր լեզու"
                              />
                              <Button 
                                type="button" 
                                onClick={handleAddLanguage}
                                size="sm"
                              >
                                Ավելացնել
                              </Button>
                            </div>
                            
                            <div className="space-y-2">
                              {newDoctor.languages.length > 0 ? (
                                <div className="space-y-2">
                                  {newDoctor.languages.map((lang, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                      <span>{lang}</span>
                                      <Button 
                                        type="button" 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={() => handleRemoveLanguage(index)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">Լեզուներ չկան</p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4 p-4 border rounded-md">
                          <h3 className="text-lg font-medium">Հասանելիություն</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <Input
                                value={newAvailability}
                                onChange={(e) => setNewAvailability(e.target.value)}
                                placeholder="Օրինակ՝ Երկուշաբթի"
                              />
                              <Button 
                                type="button" 
                                onClick={handleAddAvailability}
                                size="sm"
                              >
                                Ավելացնել
                              </Button>
                            </div>
                            
                            <div className="space-y-2">
                              {newDoctor.availability.length > 0 ? (
                                <div className="space-y-2">
                                  {newDoctor.availability.map((day, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                      <span>{day}</span>
                                      <Button 
                                        type="button" 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={() => handleRemoveAvailability(index)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">Հասանելի օրեր չկան</p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4 p-4 border rounded-md">
                          <h3 className="text-lg font-medium">Աշխատանքային ժամեր</h3>
                          
                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="monday">Երկուշաբթի</Label>
                              <Input
                                id="monday"
                                value={newDoctor.schedule.monday}
                                onChange={(e) => handleScheduleChange('monday', e.target.value)}
                                placeholder="Օրինակ՝ 9:00 - 14:00"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="tuesday">Երեքշաբթի</Label>
                              <Input
                                id="tuesday"
                                value={newDoctor.schedule.tuesday}
                                onChange={(e) => handleScheduleChange('tuesday', e.target.value)}
                                placeholder="Օրինակ՝ 9:00 - 14:00"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="wednesday">Չորեքշաբթի</Label>
                              <Input
                                id="wednesday"
                                value={newDoctor.schedule.wednesday}
                                onChange={(e) => handleScheduleChange('wednesday', e.target.value)}
                                placeholder="Օրինակ՝ 9:00 - 14:00"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="thursday">Հինգշաբթի</Label>
                              <Input
                                id="thursday"
                                value={newDoctor.schedule.thursday}
                                onChange={(e) => handleScheduleChange('thursday', e.target.value)}
                                placeholder="Օրինակ՝ 9:00 - 14:00"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="friday">Ուրբաթ</Label>
                              <Input
                                id="friday"
                                value={newDoctor.schedule.friday}
                                onChange={(e) => handleScheduleChange('friday', e.target.value)}
                                placeholder="Օրինակ՝ 9:00 - 14:00"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="saturday">Շաբաթ</Label>
                              <Input
                                id="saturday"
                                value={newDoctor.schedule.saturday}
                                onChange={(e) => handleScheduleChange('saturday', e.target.value)}
                                placeholder="Օրինակ՝ 9:00 - 14:00"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="sunday">Կիրակի</Label>
                              <Input
                                id="sunday"
                                value={newDoctor.schedule.sunday}
                                onChange={(e) => handleScheduleChange('sunday', e.target.value)}
                                placeholder="Օրինակ՝ 9:00 - 14:00"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end pt-4">
                        <Button onClick={handleAddDoctor} disabled={loading}>
                          {loading ? 'Պահպանվում է...' : 'Ավելացնել'}
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doctors.map((doctor) => (
                    <Card key={doctor.id} className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={doctor.image} 
                          alt={doctor.name}
                          className="w-full h-full object-cover" 
                          onError={(e) => {
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
                          
                          {doctor.bio && (
                            <div>
                              <p className="font-medium text-sm mb-1">Կենսագրություն:</p>
                              <p className="text-sm text-gray-700">{doctor.bio}</p>
                            </div>
                          )}
                          
                          {doctor.description && (
                            <div>
                              <p className="font-medium text-sm mb-1">Նկարագրություն:</p>
                              <p className="text-sm text-gray-700">{doctor.description}</p>
                            </div>
                          )}

                          {doctor.qualifications && doctor.qualifications.length > 0 && (
                            <div>
                              <p className="font-medium text-sm mb-1">Որակավորումներ:</p>
                              <ul className="list-disc list-inside text-sm text-gray-700">
                                {doctor.qualifications.map((qual, idx) => (
                                  <li key={idx}>{qual}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {doctor.languages && doctor.languages.length > 0 && (
                            <div>
                              <p className="font-medium text-sm mb-1">Լեզուներ:</p>
                              <p className="text-sm text-gray-700">{doctor.languages.join(', ')}</p>
                            </div>
                          )}

                          {doctor.availability && doctor.availability.length > 0 && (
                            <div>
                              <p className="font-medium text-sm mb-1">Հասանելիություն:</p>
                              <p className="text-sm text-gray-700">{doctor.availability.join(', ')}</p>
                            </div>
                          )}
                          
                          <div className="flex justify-end mt-4 space-x-2">
                            <Sheet>
                              <SheetTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => startEditDoctor(doctor)}>
                                  <Edit className="h-4 w-4 mr-1" /> Խմբագրել
                                </Button>
                              </SheetTrigger>
                              <SheetContent side="right" className="w-full sm:w-[540px] overflow-y-auto">
                                <SheetHeader>
                                  <SheetTitle>Խմբագրել բժիշկի տվյալները</SheetTitle>
                                  <SheetDescription>
                                    Փոփոխեք բժիշկի տվյալները
                                  </SheetDescription>
                                </SheetHeader>
                                {editingDoctor && (
                                  <div className="grid gap-4 py-4 overflow-y-auto h-[80vh] pr-4">
                                    <div className="space-y-4 p-4 border rounded-md">
                                      <h3 className="text-lg font-medium">Հիմնական տվյալներ</h3>
                                      
                                      <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-name">Անուն</Label>
                                          <Input
                                            id="edit-name"
                                            value={editingDoctor.name}
                                            onChange={(e) => setEditingDoctor({...editingDoctor, name: e.target.value})}
                                            placeholder="Դր. Անուն Ազգանուն"
                                          />
                                        </div>
                                        
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-specialty">Մասնագիտություն</Label>
                                          <Input
                                            id="edit-specialty"
                                            value={editingDoctor.specialty}
                                            onChange={(e) => setEditingDoctor({...editingDoctor, specialty: e.target.value})}
                                            placeholder="Օրինակ՝ Ակնաբույժ"
                                          />
                                        </div>
                                        
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-image">Նկարի URL</Label>
                                          <Input
                                            id="edit-image"
                                            value={editingDoctor.image}
                                            onChange={(e) => setEditingDoctor({...editingDoctor, image: e.target.value})}
                                            placeholder="https://example.com/image.jpg"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-4 p-4 border rounded-md">
                                      <h3 className="text-lg font-medium">Փորձառություն և կրթություն</h3>
                                      
                                      <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-experience">Փորձառություն</Label>
                                          <Input
                                            id="edit-experience"
                                            value={editingDoctor.experience}
                                            onChange={(e) => setEditingDoctor({...editingDoctor, experience: e.target.value})}
                                            placeholder="Օրինակ՝ 15+ տարվա փորձ"
                                          />
                                        </div>
                                        
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-education">Կրթություն</Label>
                                          <Input
                                            id="edit-education"
                                            value={editingDoctor.education}
                                            onChange={(e) => setEditingDoctor({...editingDoctor, education: e.target.value})}
                                            placeholder="Օրինակ՝ Երևանի Պետական Բժշկական Համալսարան"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-4 p-4 border rounded-md">
                                      <h3 className="text-lg font-medium">Կենսագրություն և նկարագրություն</h3>
                                      
                                      <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-bio">Կարճ կենսագրություն</Label>
                                          <Textarea
                                            id="edit-bio"
                                            value={editingDoctor.bio}
                                            onChange={(e) => setEditingDoctor({...editingDoctor, bio: e.target.value})}
                                            placeholder="Կարճ նկարագրություն բժշկի մասին"
                                            className="min-h-[80px]"
                                          />
                                        </div>
                                        
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-description">Մանրամասն նկարագրություն</Label>
                                          <Textarea
                                            id="edit-description"
                                            value={editingDoctor.description}
                                            onChange={(e) => setEditingDoctor({...editingDoctor, description: e.target.value})}
                                            placeholder="Մանրամասն տեղեկատվություն բժշկի մասին"
                                            className="min-h-[120px]"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-4 p-4 border rounded-md">
                                      <h3 className="text-lg font-medium">Որակավորումներ</h3>
                                      
                                      <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                          <Input
                                            value={editNewQualification}
                                            onChange={(e) => setEditNewQualification(e.target.value)}
                                            placeholder="Ավելացնել նոր որակավորում"
                                          />
                                          <Button 
                                            type="button" 
                                            onClick={handleEditAddQualification}
                                            size="sm"
                                          >
                                            Ավելացնել
                                          </Button>
                                        </div>
                                        
                                        <div className="space-y-2">
                                          {editingDoctor.qualifications && editingDoctor.qualifications.length > 0 ? (
                                            <div className="space-y-2">
                                              {editingDoctor.qualifications.map((qual, index) => (
                                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                                  <span>{qual}</span>
                                                  <Button 
                                                    type="button" 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    onClick={() => handleEditRemoveQualification(index)}
                                                  >
                                                    <X className="h-4 w-4" />
                                                  </Button>
                                                </div>
                                              ))}
                                            </div>
                                          ) : (
                                            <p className="text-sm text-gray-500">Որակավորումներ չկան</p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-4 p-4 border rounded-md">
                                      <h3 className="text-lg font-medium">Լեզուներ</h3>
                                      
                                      <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                          <Input
                                            value={editNewLanguage}
                                            onChange={(e) => setEditNewLanguage(e.target.value)}
                                            placeholder="Ավելացնել նոր լեզու"
                                          />
                                          <Button 
                                            type="button" 
                                            onClick={handleEditAddLanguage}
                                            size="sm"
                                          >
                                            Ավելացնել
                                          </Button>
                                        </div>
                                        
                                        <div className="space-y-2">
                                          {editingDoctor.languages && editingDoctor.languages.length > 0 ? (
                                            <div className="space-y-2">
                                              {editingDoctor.languages.map((lang, index) => (
                                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                                  <span>{lang}</span>
                                                  <Button 
                                                    type="button" 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    onClick={() => handleEditRemoveLanguage(index)}
                                                  >
                                                    <X className="h-4 w-4" />
                                                  </Button>
                                                </div>
                                              ))}
                                            </div>
                                          ) : (
                                            <p className="text-sm text-gray-500">Լեզուներ չկան</p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-4 p-4 border rounded-md">
                                      <h3 className="text-lg font-medium">Հասանելիություն</h3>
                                      
                                      <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                          <Input
                                            value={editNewAvailability}
                                            onChange={(e) => setEditNewAvailability(e.target.value)}
                                            placeholder="Օրինակ՝ Երկուշաբթի"
                                          />
                                          <Button 
                                            type="button" 
                                            onClick={handleEditAddAvailability}
                                            size="sm"
                                          >
                                            Ավելացնել
                                          </Button>
                                        </div>
                                        
                                        <div className="space-y-2">
                                          {editingDoctor.availability && editingDoctor.availability.length > 0 ? (
                                            <div className="space-y-2">
                                              {editingDoctor.availability.map((day, index) => (
                                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                                  <span>{day}</span>
                                                  <Button 
                                                    type="button" 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    onClick={() => handleEditRemoveAvailability(index)}
                                                  >
                                                    <X className="h-4 w-4" />
                                                  </Button>
                                                </div>
                                              ))}
                                            </div>
                                          ) : (
                                            <p className="text-sm text-gray-500">Հասանելի օրեր չկան</p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-4 p-4 border rounded-md">
                                      <h3 className="text-lg font-medium">Աշխատանքային ժամեր</h3>
                                      
                                      <div className="grid grid-cols-1 gap-4">
                                        {editingDoctor.schedule && Object.entries(editingDoctor.schedule).map(([day, hours]) => {
                                          const dayLabels = {
                                            monday: "Երկուշաբթի",
                                            tuesday: "Երեքշաբթի",
                                            wednesday: "Չորեքշաբթի",
                                            thursday: "Հինգշաբթի",
                                            friday: "Ուրբաթ",
                                            saturday: "Շաբաթ",
                                            sunday: "Կիրակի"
                                          };
                                          
                                          return (
                                            <div key={day} className="space-y-2">
                                              <Label htmlFor={`edit-${day}`}>{dayLabels[day]}</Label>
                                              <Input
                                                id={`edit-${day}`}
                                                value={hours || ''}
                                                onChange={(e) => handleEditScheduleChange(day, e.target.value)}
                                                placeholder="Օրինակ՝ 9:00 - 14:00"
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                <div className="flex justify-end pt-4">
                                  <Button onClick={handleUpdateDoctor} disabled={loading}>
                                    {loading ? 'Պահպանվում է...' : 'Պահպանել'}
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
                                  <AlertDialogTitle>Հեռացնել բժիշկին?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Այս գործողությունը կհեռացնի {doctor.name}-ին համակարգից։ Այս գործողությունը չի կարող շրջադարձվել։
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Չեղարկել</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteDoctor(doctor.id)}>
                                    Հեռացնել
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
