"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarCheck,
  UserCheck,
  UserX,
  Clock,
  Percent,
} from "lucide-react";

const interns = ["Rohan Patil", "Priya Sharma", "Amit Kadam"];

const initialAttendance = [
  {
    id: 1,
    internName: "Rohan Patil",
    date: "2026-02-10",
    status: "Present",
  },
  {
    id: 2,
    internName: "Priya Sharma",
    date: "2026-02-10",
    status: "Leave",
  },
  {
    id: 3,
    internName: "Amit Kadam",
    date: "2026-02-10",
    status: "Absent",
  },
];

export default function AttendancePage() {
  const [attendance, setAttendance] = useState(initialAttendance);
  const [formData, setFormData] = useState({
    internName: "",
    date: "",
    status: "Present",
  });

  const [filterStatus, setFilterStatus] = useState("All");

  const filteredAttendance =
    filterStatus === "All"
      ? attendance
      : attendance.filter((item) => item.status === filterStatus);

  const presentDays = attendance.filter((item) => item.status === "Present").length;
  const absentDays = attendance.filter((item) => item.status === "Absent").length;
  const leaveDays = attendance.filter((item) => item.status === "Leave").length;
  const attendancePercentage = Math.round(
    (presentDays / attendance.length) * 100
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMarkAttendance = (e) => {
    e.preventDefault();

    const newRecord = {
      id: Date.now(),
      ...formData,
    };

    setAttendance([newRecord, ...attendance]);

    setFormData({
      internName: "",
      date: "",
      status: "Present",
    });
  };

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
    <DashboardLayout title="Attendance">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-green-50 p-3 text-green-600">
                <UserCheck size={22} />
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500">Present Days</p>
            <h2 className="text-3xl font-bold">{presentDays}</h2>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-red-50 p-3 text-red-600">
              <UserX size={22} />
            </div>
            <p className="mt-4 text-sm text-slate-500">Absent Days</p>
            <h2 className="text-3xl font-bold">{absentDays}</h2>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-yellow-50 p-3 text-yellow-600">
              <Clock size={22} />
            </div>
            <p className="mt-4 text-sm text-slate-500">Leave Days</p>
            <h2 className="text-3xl font-bold">{leaveDays}</h2>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Percent size={22} />
            </div>
            <p className="mt-4 text-sm text-slate-500">Attendance Percentage</p>
            <h2 className="text-3xl font-bold">{attendancePercentage}%</h2>
          </div>
        </div>

        <form
          onSubmit={handleMarkAttendance}
          className="rounded-2xl border bg-white p-5 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-2">
            <CalendarCheck size={22} />
            <div>
              <h2 className="text-xl font-bold">Mark Attendance</h2>
              <p className="text-sm text-slate-500">
                Select intern, date and attendance status.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <select
              name="internName"
              value={formData.internName}
              onChange={handleChange}
              required
              className="rounded-xl border px-4 py-2 text-sm"
            >
              <option value="">Select Intern</option>
              {interns.map((intern) => (
                <option key={intern}>{intern}</option>
              ))}
            </select>

            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="rounded-xl"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="rounded-xl border px-4 py-2 text-sm"
            >
              <option>Present</option>
              <option>Absent</option>
              <option>Leave</option>
            </select>

            <Button type="submit" className="rounded-xl bg-slate-900">
              Mark Attendance
            </Button>
          </div>
        </form>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold">Attendance Records</h2>
              <p className="text-sm text-slate-500">
                View and filter attendance history.
              </p>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-xl border px-4 py-2 text-sm"
            >
              <option>All</option>
              <option>Present</option>
              <option>Absent</option>
              <option>Leave</option>
            </select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Intern Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredAttendance.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.internName}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{statusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}