'use-client'
import { useState } from "react";
import {TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "@/hooks/use-auth";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LogOut, User, DeleteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { DeleteAccount } from "@/lib/api";

function SettingsPage() {
    const [name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const updateProfile = useUpdateProfileMutation();
    const logout = useAuthStore((state) => state.logout)
    const router = useRouter();

    const user = useCurrentUser()

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleLogOut = () => {
        logout()
        router.push('/auth/login');
    }

    const handleDeleteAccount = async () => {
        try {
            await DeleteAccount();
            toast.success('Account Successfully Deleted')
            router.push('/auth/signup');
        } catch (error) {
            console.error("Failed to delete account:", error);
            toast.error('Failed to Delete Account')
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.info('Name is required');
            return;
        }

        if (!Email.trim()) {
            toast.info('Email is required');
            return;
        }

        if (!user) {
            toast.error('You must be logged in to update your profile.');
            return;
        }

        const updateData = {
            userId: user.id,
            data: {
                name: name.trim(),
                email: Email.trim(),
            },

        };

        updateProfile.mutate(updateData);
    };
  return (
    <div>
          <TabsContent value="settings">
              <div className="space-y-6">
                  {/* Account Information */}
                  <form onSubmit={handleUpdateProfile}>
                      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
                          <CardHeader>
                              <CardTitle className="flex font-montserrat items-center gap-2 text-gray-800 dark:text-gray-100">
                                  <User className="w-5 h-5 text-blue-600" />
                                  Account Information
                              </CardTitle>
                              <CardDescription className="text-gray-600 dark:text-gray-400 font-sans">
                                  Update your personal information
                              </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                              <div className="space-y-2">
                                  <Label htmlFor="account-name" className="text-sm font-sans font-medium text-gray-700 dark:text-gray-300">
                                      Full Name
                                  </Label>
                                  <Input
                                      id="account-name"
                                      type="text"
                                      defaultValue={user?.name}
                                      onChange={handleNameChange}
                                      className="border-gray-200 font-sans dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                  />
                              </div>

                              <div className="space-y-2">
                                  <Label htmlFor="account-email" className="font-sans text-sm font-medium text-gray-700 dark:text-gray-300">
                                      Email Address
                                  </Label>
                                  <Input
                                      id="account-email"
                                      type="email"
                                      defaultValue={user?.email}
                                      onChange={handleEmailChange}
                                      className="border-gray-200 font-sans dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                  />
                              </div>

                              <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-sans">
                                  Update Account
                              </Button>
                          </CardContent>
                      </Card>
                  </form>

                  {/* Logout */}
                  <Card className="border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
                      <CardHeader>
                          <CardTitle className="font-montserrat flex items-center gap-2 text-gray-800 dark:text-gray-100 ">
                              <LogOut className="w-5 h-5 text-red-600" />
                              Account Actions
                          </CardTitle>
                          <CardDescription className="text-gray-600 dark:text-gray-400 font-sans">
                              Sign out of your account
                          </CardDescription>
                      </CardHeader>
                      <CardContent>
                          <Button
                              onClick={handleLogOut}
                              variant="outline"
                              className="w-full font-sans border-red-200 dark:border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 hover:border-red-300"
                          >
                              <LogOut className="w-4 h-4 mr-2" />
                              Logout
                          </Button>
                      </CardContent>

                      <CardContent>
                          <Button
                              onClick={handleDeleteAccount}
                              variant="outline"
                              className="w-full font-sans border-red-200 dark:border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 hover:border-red-300"
                          >
                              <DeleteIcon className="w-4 h-4 mr-2" />
                              Delete Account
                          </Button>
                      </CardContent>
                  </Card>
              </div>
          </TabsContent>
    </div>
  )
}

export default SettingsPage