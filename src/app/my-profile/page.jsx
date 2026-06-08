"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Code2, CalendarDays } from "lucide-react";

export default function MyProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) return;

      const res = await fetch(`/api/interns/${userId}`);
      const data = await res.json();

      setProfile(data);
    };

    fetchProfile();
  }, []);

  return (
    <DashboardLayout title="My Profile">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <User size={30} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {profile?.name || "Intern"}
            </h2>

            <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
              {profile?.status || "Active"}
            </Badge>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <Mail size={18} />
              <span>Email</span>
            </div>
            <p className="font-medium">{profile?.email || "-"}</p>
          </div>

          <div className="rounded-xl border p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <Phone size={18} />
              <span>Phone</span>
            </div>
            <p className="font-medium">{profile?.phone || "-"}</p>
          </div>

          <div className="rounded-xl border p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <Code2 size={18} />
              <span>Skills</span>
            </div>
            <p className="font-medium">{profile?.skills || "-"}</p>
          </div>

          <div className="rounded-xl border p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <CalendarDays size={18} />
              <span>Joining Date</span>
            </div>
            <p className="font-medium">
              {profile?.joiningDate
                ? new Date(profile.joiningDate).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}