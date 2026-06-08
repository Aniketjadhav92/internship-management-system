"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { ClipboardList } from "lucide-react";

export default function MyTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyTasks = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/intern/tasks/${userId}`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.log("Failed to fetch my tasks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

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

        {loading ? (
          <p className="text-sm text-slate-500">Loading tasks...</p>
        ) : tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="flex flex-col justify-between gap-4 rounded-xl border p-4 md:flex-row md:items-center"
              >
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-slate-500">
                    {task.description}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Deadline:{" "}
                    {task.deadline
                      ? new Date(task.deadline).toLocaleDateString()
                      : "-"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Badge
                    className={
                      task.priority === "High"
                        ? "bg-red-100 text-red-700 hover:bg-red-100"
                        : task.priority === "Medium"
                        ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                        : "bg-green-100 text-green-700 hover:bg-green-100"
                    }
                  >
                    {task.priority}
                  </Badge>

                  {statusBadge(task.status)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No tasks assigned to you.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}