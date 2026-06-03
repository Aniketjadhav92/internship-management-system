"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Shield,
  Bell,
  Palette,
  Save,
  Lock,
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    name: "Aniket Jadhav",
    email: "admin@internhub.com",
    phone: "9876543210",
    role: "Administrator",
    darkMode: false,
    emailNotifications: true,
    attendanceReminder: true,
    autoReports: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <DashboardLayout title="Settings">
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                <User size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Profile Settings</h2>
                <p className="text-sm text-slate-500">
                  Manage admin profile information.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>
                <Input
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email Address
                </label>
                <Input
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Role
                </label>
                <Input
                  name="role"
                  value={settings.role}
                  onChange={handleChange}
                  className="rounded-xl"
                />
              </div>
            </div>

            <Button className="mt-6 rounded-xl bg-slate-900">
              <Save size={18} className="mr-2" />
              Update Profile
            </Button>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Shield size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Account Status</h2>
                <p className="text-sm text-slate-500">
                  Current admin account.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Role</p>
                <p className="font-semibold">{settings.role}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Status</p>
                <Badge className="mt-1 bg-green-100 text-green-700 hover:bg-green-100">
                  Active
                </Badge>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Last Login</p>
                <p className="font-semibold">Today, 10:30 AM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-yellow-50 p-3 text-yellow-600">
                <Bell size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Notification Settings</h2>
                <p className="text-sm text-slate-500">
                  Control system notifications.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <label className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-slate-500">
                    Receive task and attendance updates.
                  </p>
                </div>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
              </label>

              <label className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <p className="font-medium">Attendance Reminder</p>
                  <p className="text-sm text-slate-500">
                    Daily reminder for attendance marking.
                  </p>
                </div>
                <input
                  type="checkbox"
                  name="attendanceReminder"
                  checked={settings.attendanceReminder}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
              </label>

              <label className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <p className="font-medium">Auto Report Generation</p>
                  <p className="text-sm text-slate-500">
                    Generate weekly performance reports.
                  </p>
                </div>
                <input
                  type="checkbox"
                  name="autoReports"
                  checked={settings.autoReports}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
              </label>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <Palette size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Appearance Settings</h2>
                <p className="text-sm text-slate-500">
                  Customize dashboard appearance.
                </p>
              </div>
            </div>

            <label className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-slate-500">
                  Switch between light and dark theme.
                </p>
              </div>
              <input
                type="checkbox"
                name="darkMode"
                checked={settings.darkMode}
                onChange={handleChange}
                className="h-5 w-5"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-red-50 p-3 text-red-600">
              <Lock size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Password Settings</h2>
              <p className="text-sm text-slate-500">
                Change your account password.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Input
              type="password"
              placeholder="Current Password"
              className="rounded-xl"
            />

            <Input
              type="password"
              placeholder="New Password"
              className="rounded-xl"
            />

            <Input
              type="password"
              placeholder="Confirm Password"
              className="rounded-xl"
            />
          </div>

          <Button className="mt-6 rounded-xl bg-slate-900">
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}