"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserCheck,
  CalendarCheck,
  CheckCircle2,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const statIcons = {
  totalInterns: Users,
  activeInterns: UserCheck,
  attendancePercentage: CalendarCheck,
  completedTasks: CheckCircle2,
};

export default function ReportsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await fetch("/api/reports");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.log("Reports fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return (
      <DashboardLayout title="Reports">
        <p className="text-slate-500">Loading reports...</p>
      </DashboardLayout>
    );
  }

  const stats = [
    {
      key: "totalInterns",
      title: "Total Interns",
      value: data?.stats?.totalInterns || 0,
    },
    {
      key: "activeInterns",
      title: "Active Interns",
      value: data?.stats?.activeInterns || 0,
    },
    {
      key: "attendancePercentage",
      title: "Attendance Rate",
      value: `${data?.stats?.attendancePercentage || 0}%`,
    },
    {
      key: "completedTasks",
      title: "Completed Tasks",
      value: data?.stats?.completedTasks || 0,
    },
  ];

  return (
    <DashboardLayout title="Reports">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = statIcons[item.key];

            return (
              <div
                key={item.title}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                    <Icon size={22} />
                  </div>

                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Live
                  </Badge>
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
              Attendance Trend
            </h2>
            <p className="text-sm text-slate-500">
              Monthly attendance percentage
            </p>

            <div className="mt-6 h-72 min-h-[288px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.attendanceTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="#0f172a"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Task Completion Trend
            </h2>
            <p className="text-sm text-slate-500">
              Completed tasks month-wise
            </p>

            <div className="mt-6 h-72 min-h-[288px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.taskCompletionTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="completed"
                    fill="#0f172a"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Attendance Report
            </h2>
            <p className="text-sm text-slate-500">
              Present, absent and leave count
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3">Intern Name</th>
                    <th className="py-3">Present</th>
                    <th className="py-3">Absent</th>
                    <th className="py-3">Leave</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.attendanceReport?.length > 0 ? (
                    data.attendanceReport.map((item) => (
                      <tr key={item.internId} className="border-b">
                        <td className="py-4 font-medium">{item.name}</td>
                        <td className="py-4 text-green-600">
                          {item.present}
                        </td>
                        <td className="py-4 text-red-600">{item.absent}</td>
                        <td className="py-4 text-yellow-600">{item.leave}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-6 text-center text-slate-500"
                      >
                        No attendance report found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Performance Report
            </h2>
            <p className="text-sm text-slate-500">
              Task completion performance
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3">Intern Name</th>
                    <th className="py-3">Assigned</th>
                    <th className="py-3">Completed</th>
                    <th className="py-3">Rate</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.performanceReport?.length > 0 ? (
                    data.performanceReport.map((item) => (
                      <tr key={item.internId} className="border-b">
                        <td className="py-4 font-medium">{item.name}</td>
                        <td className="py-4">{item.assigned}</td>
                        <td className="py-4 text-green-600">
                          {item.completed}
                        </td>
                        <td className="py-4">
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                            {item.rate}%
                          </Badge>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-6 text-center text-slate-500"
                      >
                        No performance report found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}