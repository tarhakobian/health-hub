
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import api from '@/utils/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@hospital.com'); // Pre-fill with admin email
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      if (user.isAdmin) {
        navigate('/admin');
      }
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Attempting admin login with:', { email });
      // Call the backend admin login API
      const response = await api.post('/auth/admin', { email, password });
      const userData = response.data;
      
      if (userData && userData.token) {
        // Store admin info in localStorage
        localStorage.setItem('userInfo', JSON.stringify(userData));
        localStorage.setItem('adminUser', JSON.stringify(userData));
        
        toast.success('Հաջողությամբ մուտք եք գործել ադմինիստրատորի վահանակ։');
        navigate('/admin');
      } else {
        toast.error('Սխալ մուտքանուն կամ գաղտնաբառ։');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast.error('Սխալ մուտքանուն կամ գաղտնաբառ։ Համոզվեք, որ սերվերը միացված է։');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Ադմինիստրատորի մուտք</CardTitle>
            <CardDescription className="text-center">
              Մուտքագրեք ձեր տվյալները ադմինիստրատորի վահանակ մուտք գործելու համար
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Էլ․ փոստ</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">Լռելյայն՝ admin@hospital.com</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Գաղտնաբառ</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">Լռելյայն՝ AdminPass123!</p>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Մուտք...' : 'Մուտք գործել'}
              </Button>
              
              <div className="text-center text-sm text-gray-500 mt-4">
                <p>Օգտագործեք ադմինիստրատորի հաշիվ մուտք գործելու համար։</p>
                <p className="font-medium mt-1">Հավաստագրման տվյալներ՝</p>
                <p>Email: admin@hospital.com</p>
                <p>Password: AdminPass123!</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
