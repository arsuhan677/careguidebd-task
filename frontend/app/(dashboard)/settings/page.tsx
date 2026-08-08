'use client';

import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function SettingsPage() {
  const { user } = useAuth();
  
  // Dummy states for the UI
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    // Simulate API call since no backend exists for this
    setTimeout(() => setIsSavingProfile(false), 800);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingPassword(true);
    // Simulate API call since no backend exists for this
    setTimeout(() => setIsSavingPassword(false), 800);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account settings and administrative preferences.</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Information */}
        <Card className="border-none shadow-sm ring-1 ring-gray-200">
          <form onSubmit={handleSaveProfile}>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile details and email address.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 max-w-md">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user?.name || ''} placeholder="John Doe" />
              </div>
              <div className="space-y-2 max-w-md">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email || ''} placeholder="john@example.com" />
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50/50 px-6 py-4 flex items-center justify-end rounded-b-xl">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isSavingProfile}>
                {isSavingProfile ? 'Saving...' : 'Save Profile'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Change Password */}
        <Card className="border-none shadow-sm ring-1 ring-gray-200">
          <form onSubmit={handleSavePassword}>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 max-w-md">
                <Label htmlFor="current_password">Current Password</Label>
                <Input id="current_password" type="password" />
              </div>
              <div className="space-y-2 max-w-md">
                <Label htmlFor="new_password">New Password</Label>
                <Input id="new_password" type="password" />
              </div>
              <div className="space-y-2 max-w-md">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input id="confirm_password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50/50 px-6 py-4 flex items-center justify-end rounded-b-xl">
              <Button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white" disabled={isSavingPassword}>
                {isSavingPassword ? 'Updating...' : 'Update Password'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
