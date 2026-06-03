"use client";

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

const stats = [
  { title: "Total Interns", value: "25", growth: "+12%", icon: Users },
  { title: "Active Interns", value: "20", growth: "+8%", icon: UserCheck },
  { title: "Pending Tasks", value: "12", growth: "-5%", icon: ClipboardList },
  { title: "Completed Tasks", value: "48", growth: "+18%", icon: CheckCircle2 },
  { title: "Attendance Rate", value: "92%", growth: "+4%", icon: CalendarCheck },
];

const attendanceData = [
  { month: "Jan", attendance: 72 },
  { month: "Feb", attendance: 78 },
  { month: "Mar", attendance: 84 },
  { month: "Apr", attendance: 80 },
  { month: "May", attendance: 92 },
  { month: "Jun", attendance: 88 },
];

const taskData = [
  { name: "Pending", value: 12 },
  { name: "In Progress", value: 18 },
  { name: "Completed", value: 48 },
];

const colors = ["#f59e0b", "#3b82f6", "#22c55e"];

const activities = [
  "New intern added: Rohan Patil",
  "Attendance marked for today",
  "Task assigned to Priya Sharma",
  "UI Design task completed",
];

export default function DashboardPage() {
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
                  <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-600">
                    {item.growth}
                  </span>
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
                <BarChart data={attendanceData}>
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
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border bg-slate-50 px-4 py-3 text-sm"
              >
                <span>{activity}</span>
                <span className="text-xs text-slate-400">Just now</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}