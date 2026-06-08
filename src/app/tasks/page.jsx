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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2, Pencil } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [interns, setInterns] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    status: "Pending",
    deadline: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      assignedTo: "",
      priority: "Medium",
      status: "Pending",
      deadline: "",
    });
  };

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const fetchInterns = async () => {
    const res = await fetch("/api/interns");
    const data = await res.json();
    setInterns(data);
  };

  useEffect(() => {
    fetchTasks();
    fetchInterns();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      filterStatus === "All" || task.status === filterStatus;

    return matchSearch && matchStatus;
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to create task");
      return;
    }

    alert("Task created successfully");

    resetForm();
    setOpen(false);
    fetchTasks();
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);

    setFormData({
      title: task.title || "",
      description: task.description || "",
      assignedTo: task.assignedTo?._id || "",
      priority: task.priority || "Medium",
      status: task.status || "Pending",
      deadline: task.deadline ? task.deadline.split("T")[0] : "",
    });

    setEditOpen(true);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    if (!selectedTask) return;

    const res = await fetch(`/api/tasks/${selectedTask._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to update task");
      return;
    }

    alert("Task updated successfully");

    setEditOpen(false);
    setSelectedTask(null);
    resetForm();
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    if (!confirm("Delete this task?")) return;

    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to delete task");
      return;
    }

    alert("Task deleted successfully");
    fetchTasks();
  };

  const priorityBadge = (priority) => {
    if (priority === "High") {
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          High
        </Badge>
      );
    }

    if (priority === "Medium") {
      return (
        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
          Medium
        </Badge>
      );
    }

    return (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
        Low
      </Badge>
    );
  };

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
    <DashboardLayout title="Tasks">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-2xl border bg-white p-5 shadow-sm md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Task Management
            </h2>
            <p className="text-sm text-slate-500">
              Create, assign and monitor intern tasks from MongoDB.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <Input
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl md:w-64"
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-xl border px-4 py-2 text-sm"
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <div className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                  <Plus size={18} />
                  Create Task
                </div>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleCreateTask} className="space-y-4">
                  <Input
                    name="title"
                    placeholder="Task Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    name="description"
                    placeholder="Task Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />

                  <select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border px-4 py-2 text-sm"
                  >
                    <option value="">Assign Intern</option>
                    {interns.map((intern) => (
                      <option key={intern._id} value={intern._id}>
                        {intern.name}
                      </option>
                    ))}
                  </select>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-2 text-sm"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-2 text-sm"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>

                  <Input
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                  />

                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setOpen(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>

                    <Button type="submit" className="bg-slate-900">
                      Save Task
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Name</TableHead>
                <TableHead>Assigned Intern</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TableRow key={task._id}>
                    <TableCell className="font-medium">
                      {task.title}
                    </TableCell>

                    <TableCell>
                      {task.assignedTo?.name || "Not Assigned"}
                    </TableCell>

                    <TableCell>{priorityBadge(task.priority)}</TableCell>
                    <TableCell>{statusBadge(task.status)}</TableCell>

                    <TableCell>
                      {task.deadline
                        ? new Date(task.deadline).toLocaleDateString()
                        : "-"}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleEditClick(task)}
                        >
                          <Pencil size={16} />
                        </Button>

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleDeleteTask(task._id)}
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
                    colSpan="6"
                    className="py-8 text-center text-slate-500"
                  >
                    No tasks found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleUpdateTask} className="space-y-4">
              <Input
                name="title"
                placeholder="Task Title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <Input
                name="description"
                placeholder="Task Description"
                value={formData.description}
                onChange={handleChange}
                required
              />

              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                required
                className="w-full rounded-xl border px-4 py-2 text-sm"
              >
                <option value="">Assign Intern</option>
                {interns.map((intern) => (
                  <option key={intern._id} value={intern._id}>
                    {intern.name}
                  </option>
                ))}
              </select>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-2 text-sm"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-2 text-sm"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <Input
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                required
              />

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditOpen(false);
                    setSelectedTask(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>

                <Button type="submit" className="bg-slate-900">
                  Update Task
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}