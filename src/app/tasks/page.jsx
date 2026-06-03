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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";

const initialTasks = [
  {
    id: 1,
    title: "Build Login UI",
    intern: "Rohan Patil",
    priority: "High",
    status: "Completed",
    deadline: "2026-02-15",
  },
  {
    id: 2,
    title: "Create Dashboard Charts",
    intern: "Priya Sharma",
    priority: "Medium",
    status: "In Progress",
    deadline: "2026-02-20",
  },
  {
    id: 3,
    title: "MongoDB API Integration",
    intern: "Amit Kadam",
    priority: "High",
    status: "Pending",
    deadline: "2026-02-25",
  },
];

const interns = ["Rohan Patil", "Priya Sharma", "Amit Kadam"];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    intern: "",
    priority: "Medium",
    status: "Pending",
    deadline: "",
  });

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || task.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      ...formData,
    };

    setTasks([newTask, ...tasks]);

    setFormData({
      title: "",
      intern: "",
      priority: "Medium",
      status: "Pending",
      deadline: "",
    });

    setOpen(false);
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
              Create, assign and monitor intern tasks.
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

                  <select
                    name="intern"
                    value={formData.intern}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border px-4 py-2 text-sm"
                  >
                    <option value="">Assign Intern</option>
                    {interns.map((intern) => (
                      <option key={intern}>{intern}</option>
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
                      onClick={() => setOpen(false)}
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
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{task.intern}</TableCell>
                  <TableCell>{priorityBadge(task.priority)}</TableCell>
                  <TableCell>{statusBadge(task.status)}</TableCell>
                  <TableCell>{task.deadline}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="outline">
                        <Eye size={16} />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Pencil size={16} />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}