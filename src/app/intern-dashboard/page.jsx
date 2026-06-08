"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardList,
  CheckCircle,
  Clock,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function InternDashboard() {
  const [userName, setUserName] = useState("Intern");

  const [data, setData] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    attendancePercentage: 0,
    recentTasks: [],
    recentAttendance: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      const storedName = localStorage.getItem("userName");
      const userId = localStorage.getItem("userId");

      if (storedName) {
        setUserName(storedName);
      }

      if (!userId) return;

      try {
        const res = await fetch(`/api/intern/dashboard/${userId}`);
        const result = await res.json();

        setData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Assigned Tasks",
      value: data.totalTasks,
      icon: ClipboardList,
    },
    {
      title: "Completed Tasks",
      value: data.completedTasks,
      icon: CheckCircle,
    },
    {
      title: "Pending Tasks",
      value: data.pendingTasks,
      icon: Clock,
    },
    {
      title: "Attendance Rate",
      value: `${data.attendancePercentage}%`,
      icon: CalendarCheck,
    },
  ];

  const statusBadge = (status) => {
    if (status === "Completed") {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          Completed
        </Badge>
      );
    }

    if (status === "In Progress") {
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          In Progress
        </Badge>
      );
    }

    return (
      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
        Pending
      </Badge>
    );
  };

  const attendanceBadge = (status) => {
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
    <DashboardLayout title="Intern Dashboard">
      <div className="space-y-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Welcome, {userName}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Track your assigned tasks, attendance and internship progress.
          </p>

          <div className="mt-5 flex flex-col gap-3 md:flex-row">
            <Link
              href="/my-tasks"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              View My Tasks
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/my-attendance"
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              View My Attendance
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="w-fit rounded-xl bg-slate-100 p-3">
                  <Icon size={22} />
                </div>

                <p className="mt-4 text-sm text-slate-500">{card.title}</p>

                <h2 className="mt-1 text-3xl font-bold">{card.value}</h2>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Recent Tasks</h2>
                <p className="text-sm text-slate-500">
                  Latest tasks assigned to you.
                </p>
              </div>

              <Link
                href="/my-tasks"
                className="text-sm font-medium text-slate-700 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {data.recentTasks?.length > 0 ? (
                data.recentTasks.map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center justify-between rounded-xl border p-4"
                  >
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-slate-500">
                        Deadline:{" "}
                        {task.deadline
                          ? new Date(task.deadline).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>

                    {statusBadge(task.status)}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No recent tasks found.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Recent Attendance</h2>
                <p className="text-sm text-slate-500">
                  Your latest attendance records.
                </p>
              </div>

              <Link
                href="/my-attendance"
                className="text-sm font-medium text-slate-700 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {data.recentAttendance?.length > 0 ? (
                data.recentAttendance.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between rounded-xl border p-4"
                  >
                    <span className="font-medium">
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : "-"}
                    </span>

                    {attendanceBadge(item.status)}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No attendance records found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}