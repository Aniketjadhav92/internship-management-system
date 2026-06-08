"use client";

import { useEffect, useState } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CalendarCheck,
  UserCheck,
  UserX,
  Clock,
  Percent,
  Trash2,
  Pencil,
} from "lucide-react";

export default function AttendancePage() {
  const [attendance, setAttendance] = useState([]);
  const [interns, setInterns] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);

  const [formData, setFormData] = useState({
    intern: "",
    date: "",
    status: "Present",
  });

  const resetForm = () => {
    setFormData({
      intern: "",
      date: "",
      status: "Present",
    });
  };

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/attendance");
      const data = await res.json();
      setAttendance(data);
    } catch (error) {
      console.log("Failed to fetch attendance", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInterns = async () => {
    try {
      const res = await fetch("/api/interns");
      const data = await res.json();
      setInterns(data);
    } catch (error) {
      console.log("Failed to fetch interns", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
    fetchInterns();
  }, []);

  const filteredAttendance =
    filterStatus === "All"
      ? attendance
      : attendance.filter((item) => item.status === filterStatus);

  const presentDays = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  const absentDays = attendance.filter(
    (item) => item.status === "Absent"
  ).length;

  const leaveDays = attendance.filter(
    (item) => item.status === "Leave"
  ).length;

  const attendancePercentage =
    attendance.length > 0
      ? Math.round((presentDays / attendance.length) * 100)
      : 0;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to mark attendance");
        return;
      }

      alert("Attendance marked successfully");

      resetForm();
      fetchAttendance();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleEditClick = (record) => {
    setSelectedAttendance(record);

    setFormData({
      intern: record.intern?._id || "",
      date: record.date ? record.date.split("T")[0] : "",
      status: record.status || "Present",
    });

    setEditOpen(true);
  };

  const handleUpdateAttendance = async (e) => {
    e.preventDefault();

    if (!selectedAttendance) return;

    try {
      const res = await fetch(`/api/attendance/${selectedAttendance._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update attendance");
        return;
      }

      alert("Attendance updated successfully");

      setEditOpen(false);
      setSelectedAttendance(null);
      resetForm();
      fetchAttendance();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleDeleteAttendance = async (id) => {
    if (!confirm("Delete this attendance record?")) return;

    try {
      const res = await fetch(`/api/attendance/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete attendance");
        return;
      }

      alert("Attendance deleted successfully");
      fetchAttendance();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
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
            <div className="w-fit rounded-xl bg-green-50 p-3 text-green-600">
              <UserCheck size={22} />
            </div>
            <p className="mt-4 text-sm text-slate-500">Present Days</p>
            <h2 className="text-3xl font-bold">{presentDays}</h2>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="w-fit rounded-xl bg-red-50 p-3 text-red-600">
              <UserX size={22} />
            </div>
            <p className="mt-4 text-sm text-slate-500">Absent Days</p>
            <h2 className="text-3xl font-bold">{absentDays}</h2>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="w-fit rounded-xl bg-yellow-50 p-3 text-yellow-600">
              <Clock size={22} />
            </div>
            <p className="mt-4 text-sm text-slate-500">Leave Days</p>
            <h2 className="text-3xl font-bold">{leaveDays}</h2>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="w-fit rounded-xl bg-blue-50 p-3 text-blue-600">
              <Percent size={22} />
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Attendance Percentage
            </p>
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
              name="intern"
              value={formData.intern}
              onChange={handleChange}
              required
              className="rounded-xl border px-4 py-2 text-sm"
            >
              <option value="">Select Intern</option>
              {interns.map((intern) => (
                <option key={intern._id} value={intern._id}>
                  {intern.name}
                </option>
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
                View, edit and filter attendance history.
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

          {loading ? (
            <p className="text-sm text-slate-500">Loading attendance...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Intern Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">
                        {item.intern?.name || "Unknown"}
                      </TableCell>

                      <TableCell>
                        {item.date
                          ? new Date(item.date).toLocaleDateString()
                          : "-"}
                      </TableCell>

                      <TableCell>{statusBadge(item.status)}</TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleEditClick(item)}
                          >
                            <Pencil size={16} />
                          </Button>

                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleDeleteAttendance(item._id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan="4"
                      className="py-8 text-center text-slate-500"
                    >
                      No attendance records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Attendance</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleUpdateAttendance} className="space-y-4">
              <select
                name="intern"
                value={formData.intern}
                onChange={handleChange}
                required
                className="w-full rounded-xl border px-4 py-2 text-sm"
              >
                <option value="">Select Intern</option>
                {interns.map((intern) => (
                  <option key={intern._id} value={intern._id}>
                    {intern.name}
                  </option>
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
                className="w-full rounded-xl border px-4 py-2 text-sm"
              >
                <option>Present</option>
                <option>Absent</option>
                <option>Leave</option>
              </select>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditOpen(false);
                    setSelectedAttendance(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>

                <Button type="submit" className="bg-slate-900">
                  Update Attendance
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}