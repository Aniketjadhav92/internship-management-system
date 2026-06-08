"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck } from "lucide-react";

export default function MyAttendancePage() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyAttendance = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/intern/attendance/${userId}`);
      const data = await res.json();
      setAttendance(data);
    } catch (error) {
      console.log("Failed to fetch my attendance", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAttendance();
  }, []);

  const statusBadge = (status) => {
    if (status === "Present") {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          Present
        </Badge>
      );
    }

    if (status === "Absent") {
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          Absent
        </Badge>
      );
    }

    return (
      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
        Leave
      </Badge>
    );
  };

  return (
    <DashboardLayout title="My Attendance">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-green-50 p-3 text-green-600">
            <CalendarCheck size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold">My Attendance</h2>
            <p className="text-sm text-slate-500">
              View your personal attendance records.
            </p>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Loading attendance...</p>
        ) : attendance.length > 0 ? (
          <div className="space-y-3">
            {attendance.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <span>
                  {item.date
                    ? new Date(item.date).toLocaleDateString()
                    : "-"}
                </span>

                {statusBadge(item.status)}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No attendance records found.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}