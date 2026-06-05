"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  CalendarCheck,
} from "lucide-react";

const myTasks = [
  {
    id: 1,
    task: "Build Login Page",
    status: "Completed",
    deadline: "2026-06-20",
  },
  {
    id: 2,
    task: "Create Dashboard UI",
    status: "In Progress",
    deadline: "2026-06-25",
  },
  {
    id: 3,
    task: "MongoDB Integration",
    status: "Pending",
    deadline: "2026-06-30",
  },
];

export default function InternDashboardPage() {
  return (
    <DashboardLayout title="My Dashboard">
      <div className="space-y-6">

        {/* Stats Cards */}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600 w-fit">
              <ClipboardList size={22} />
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Assigned Tasks
            </p>

            <h2 className="text-3xl font-bold">
              12
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-green-50 p-3 text-green-600 w-fit">
              <CheckCircle2 size={22} />
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Completed Tasks
            </p>

            <h2 className="text-3xl font-bold">
              8
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-yellow-50 p-3 text-yellow-600 w-fit">
              <Clock size={22} />
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Pending Tasks
            </p>

            <h2 className="text-3xl font-bold">
              4
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-purple-50 p-3 text-purple-600 w-fit">
              <CalendarCheck size={22} />
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Attendance %
            </p>

            <h2 className="text-3xl font-bold">
              92%
            </h2>
          </div>

        </div>

        {/* Attendance */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold">
                Today's Attendance
              </h2>

              <p className="text-sm text-slate-500">
                Mark your attendance for today
              </p>
            </div>

            <Button className="bg-slate-900">
              Mark Attendance
            </Button>

          </div>

        </div>

        {/* My Tasks */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold">
            My Assigned Tasks
          </h2>

          <div className="mt-5 space-y-4">

            {myTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-xl border p-4"
              >

                <div>
                  <h3 className="font-semibold">
                    {task.task}
                  </h3>

                  <p className="text-sm text-slate-500">
                    Deadline: {task.deadline}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status}
                </span>

              </div>
            ))}

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}