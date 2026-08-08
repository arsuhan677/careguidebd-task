'use client';

import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldCheck, Mail, User, Shield, Info, Clock, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  const { user, isLoading } = useAuth();
  
  return (
    <div className="flex-1 space-y-6 p-1 md:p-2 pt-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500">Manage your account preferences and security settings.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl">
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          {/* Profile Information */}
          <Card className="border-gray-200 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="bg-white pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-gray-500" />
                Profile Information
              </CardTitle>
              <CardDescription>Your account information.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-gray-50/30">
              {isLoading ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full max-w-md" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full max-w-md" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full max-w-md" />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2 max-w-md">
                    <Label className="text-gray-600">Name</Label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-white border rounded-md shadow-sm">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900 font-medium">{user?.name}</span>
                    </div>
                  </div>
                  <div className="space-y-2 max-w-md">
                    <Label className="text-gray-600">Email</Label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-white border rounded-md shadow-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{user?.email}</span>
                    </div>
                  </div>
                  <div className="space-y-2 max-w-md">
                    <Label className="text-gray-600">Account Status</Label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-100 rounded-md shadow-sm">
                      <ShieldCheck className="h-4 w-4 text-green-600" />
                      <span className="text-green-800 font-medium">Active</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card className="border-gray-200 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="bg-white pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5 text-gray-500" />
                Account
              </CardTitle>
              <CardDescription>Additional account information.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-gray-50/30">
               {isLoading ? (
                  <div className="space-y-2 max-w-md">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
               ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                    <div className="flex flex-col space-y-1 p-3 bg-white border rounded-lg shadow-sm">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Account ID</span>
                      <span className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded truncate">{user?._id || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col space-y-1 p-3 bg-white border rounded-lg shadow-sm">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Role / Access Level</span>
                      <span className="text-sm text-gray-900 capitalize font-medium">{user?.role || 'User'}</span>
                    </div>
                  </div>
               )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-6">
          {/* Security */}
          <Card className="border-gray-200 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="bg-white pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-500" />
                Security
              </CardTitle>
              <CardDescription>Manage your account security.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-gray-50/30">
              <div className="rounded-md bg-amber-50 p-4 border border-amber-100 mb-6 max-w-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-amber-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">Feature Unavailable</h3>
                    <div className="mt-2 text-sm text-amber-700">
                      <p>
                        Password changes are currently managed by administrators. This feature will be available in a future update.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 opacity-50 pointer-events-none">
                <div className="space-y-2 max-w-md">
                  <Label htmlFor="current_password">Current Password</Label>
                  <Input id="current_password" type="password" disabled defaultValue="********" />
                </div>
                <div className="space-y-2 max-w-md">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input id="new_password" type="password" disabled defaultValue="********" />
                </div>
                <div className="space-y-2 max-w-md">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <Input id="confirm_password" type="password" disabled defaultValue="********" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-white px-6 py-4">
              <Button disabled variant="outline">
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
