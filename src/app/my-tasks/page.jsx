"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { ClipboardList } from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "Build Login Page",
    description: "Create responsive login UI",
    status: "Completed",
    priority: "High",
    deadline: "2026-06-20",
  },
  {
    id: 2,
    title: "Create Dashboard UI",
    description: "Design intern dashboard cards",
    status: "In Progress",
    priority: "Medium",
    deadline: "2026-06-25",
  },
  {
    id: 3,
    title: "MongoDB Integration",
    description: "Connect frontend with backend APIs",
    status: "Pending",
    priority: "High",
    deadline: "2026-06-30",
  },
];

export default function MyTasksPage() {
  return (
    <DashboardLayout title="My Tasks">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <ClipboardList size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold">My Assigned Tasks</h2>
            <p className="text-sm text-slate-500">
              View tasks assigned to you by admin.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col justify-between gap-4 rounded-xl border p-4 md:flex-row md:items-center"
            >
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-slate-500">{task.description}</p>
                <p className="mt-1 text-sm text-slate-400">
                  Deadline: {task.deadline}
                </p>
              </div>

              <div className="flex gap-2">
                <Badge
                  className={
                    task.priority === "High"
                      ? "bg-red-100 text-red-700 hover:bg-red-100"
                      : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                  }
                >
                  {task.priority}
                </Badge>

                <Badge
                  className={
                    task.status === "Completed"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : task.status === "In Progress"
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                  }
                >
                  {task.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}