"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck } from "lucide-react";

const attendance = [
  { id: 1, date: "2026-06-20", status: "Present" },
  { id: 2, date: "2026-06-21", status: "Present" },
  { id: 3, date: "2026-06-22", status: "Leave" },
];

export default function MyAttendancePage() {
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
              View your attendance records.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {attendance.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <span>{item.date}</span>

              <Badge
                className={
                  item.status === "Present"
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                }
              >
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}