"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Users,
  UserCheck,
  ClipboardList,
  CheckCircle2,
  CalendarCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const colors = ["#f59e0b", "#3b82f6", "#22c55e"];

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/dashboard");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.log("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <p className="text-slate-500">Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  const stats = [
    {
      title: "Total Interns",
      value: data?.totalInterns || 0,
      icon: Users,
    },
    {
      title: "Active Interns",
      value: data?.activeInterns || 0,
      icon: UserCheck,
    },
    {
      title: "Pending Tasks",
      value: data?.pendingTasks || 0,
      icon: ClipboardList,
    },
    {
      title: "Completed Tasks",
      value: data?.completedTasks || 0,
      icon: CheckCircle2,
    },
    {
      title: "Attendance Rate",
      value: `${data?.attendancePercentage || 0}%`,
      icon: CalendarCheck,
    },
  ];

  const taskData = [
    {
      name: "Pending",
      value: data?.taskStats?.pending || 0,
    },
    {
      name: "In Progress",
      value: data?.taskStats?.inProgress || 0,
    },
    {
      name: "Completed",
      value: data?.taskStats?.completed || 0,
    },
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                    <Icon size={22} />
                  </div>
                </div>

                <p className="mt-5 text-sm text-slate-500">{item.title}</p>
                <h2 className="mt-1 text-3xl font-bold text-slate-900">
                  {item.value}
                </h2>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Attendance Analytics
            </h2>
            <p className="text-sm text-slate-500">
              Monthly attendance performance
            </p>

            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.attendanceAnalytics || []}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="attendance"
                    fill="#0f172a"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Task Analytics
            </h2>
            <p className="text-sm text-slate-500">
              Task status distribution
            </p>

            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={5}
                  >
                    {taskData.map((entry, index) => (
                      <Cell key={entry.name} fill={colors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {taskData.map((item, index) => (
                <div
                  key={item.name}
                  className="rounded-xl bg-slate-50 p-3 text-center text-sm"
                >
                  <div
                    className="mx-auto mb-2 h-3 w-3 rounded-full"
                    style={{ backgroundColor: colors[index] }}
                  />
                  <p className="font-medium">{item.name}</p>
                  <p className="text-slate-500">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Activities
          </h2>

          <div className="mt-4 space-y-3">
            {data?.recentActivities?.length > 0 ? (
              data.recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border bg-slate-50 px-4 py-3 text-sm"
                >
                  <span>{activity.message}</span>
                  <span className="text-xs text-slate-400">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                No recent activities found.
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}