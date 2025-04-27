
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Pencil } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthdate: ""
    }
  });

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Set form default values from user data
    form.reset({
      name: parsedUser.name || "",
      email: parsedUser.email || "",
      phone: parsedUser.phone || "+374 94111444",
      birthdate: parsedUser.birthdate || "01/01/1990"
    });
  }, [navigate, form]);

  const handleSubmit = (data) => {
    try {
      // Create updated user object
      const updatedUser = {
        ...user,
        name: data.name,
        email: data.email,
        phone: data.phone,
        birthdate: data.birthdate
      };
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
      
      // Close dialog
      setIsDialogOpen(false);
      
      // Show success message
      toast.success("Պրոֆիլը թարմացվել է");
    } catch (error) {
      toast.error("Սխալ է տեղի ունեցել");
      console.error("Error updating profile:", error);
    }
  };

  if (!user) return null;

  return (
    <div className="pt-32 pb-16 min-h-screen bg-gray-50">
      <div className="page-container max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white">
            <h1 className="text-3xl font-bold">Իմ պրոֆիլը</h1>
            {/* <p className="mt-2 opacity-90">Ձեր անձնական տվյալները և պատմությունը</p> */}
          </div>
          
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center">
                  <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <User size={64} className="text-blue-500" />
                  </div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-500 mt-1">Պացիենտ</p>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-6">Անձնական տվյալներ</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mt-0.5 text-blue-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Էլ. հասցե</p>
                      <p className="font-medium">{user.email || "meryarshakyan03@gmail.com"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mt-0.5 text-blue-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Հեռախոսահամար</p>
                      <p className="font-medium">{user.phone || "+374 94111444"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 mt-0.5 text-blue-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Ծննդյան ամսաթիվ</p>
                      <p className="font-medium">{user.birthdate || "01/01/1990"}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button 
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Փոփոխել տվյալները
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Փոփոխել անձնական տվյալները</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Անուն</Label>
                <Input
                  id="name"
                  placeholder="Ձեր անունը"
                  {...form.register("name")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Էլ. հասցե</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...form.register("email")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Հեռախոսահամար</Label>
                <Input
                  id="phone"
                  placeholder="+374 XXXXXXXX"
                  {...form.register("phone")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthdate">Ծննդյան ամսաթիվ</Label>
                <Input
                  id="birthdate"
                  placeholder="ՕՕ/ԱԱ/ՏՏՏՏ"
                  {...form.register("birthdate")}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Չեղարկել
              </Button>
              <Button type="submit">Պահպանել</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
