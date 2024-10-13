import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // The form will be submitted to FormBold
    // We'll keep the navigation for now, but you might want to remove it
    // depending on how you want to handle the form submission response
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-800">Login</h1>
      <form onSubmit={handleSubmit} action="https://formbold.com/s/oY2eW" method="POST" className="space-y-6">
        <div>
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full"
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full"
          />
        </div>
        <input type="hidden" name="form_type" value="login" />
        <Button type="submit" className="w-full bg-green-800 hover:bg-green-700">Login</Button>
      </form>
    </div>
  );
};

export default Login;