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

const dummyInterns = [
  {
    id: 1,
    name: "Rohan Patil",
    email: "rohan@gmail.com",
    phone: "9876543210",
    skills: "React, Node.js",
    joiningDate: "2026-01-10",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "9876543211",
    skills: "UI/UX, Figma",
    joiningDate: "2026-01-15",
    status: "Active",
  },
  {
    id: 3,
    name: "Amit Kadam",
    email: "amit@gmail.com",
    phone: "9876543212",
    skills: "MongoDB, Express",
    joiningDate: "2026-02-01",
    status: "Inactive",
  },
];

export default function InternsPage() {
  const [interns, setInterns] = useState(dummyInterns);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    joiningDate: "",
    status: "Active",
  });

  const filteredInterns = interns.filter((intern) =>
    intern.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddIntern = (e) => {
    e.preventDefault();

    const newIntern = {
      id: Date.now(),
      ...formData,
    };

    setInterns([newIntern, ...interns]);

    setFormData({
      name: "",
      email: "",
      phone: "",
      skills: "",
      joiningDate: "",
      status: "Active",
    });

    setOpen(false);
  };

  return (
    <DashboardLayout title="Interns">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-2xl border bg-white p-5 shadow-sm md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Intern Management
            </h2>
            <p className="text-sm text-slate-500">
              Manage all registered interns in one place.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <Input
              placeholder="Search interns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl md:w-64"
            />

            <select className="rounded-xl border px-4 py-2 text-sm">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <Dialog open={open} onOpenChange={setOpen}>
             <DialogTrigger>
             <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 cursor-pointer">
                 <Plus size={18} />
                  Add Intern
                     </div>
            </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Intern</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleAddIntern} className="space-y-4">
                  <Input
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    name="skills"
                    placeholder="Skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    name="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    required
                  />

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-2 text-sm"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>

                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>

                    <Button type="submit" className="bg-slate-900">
                      Save Intern
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredInterns.map((intern) => (
                <TableRow key={intern.id}>
                  <TableCell className="font-medium">{intern.name}</TableCell>
                  <TableCell>{intern.email}</TableCell>
                  <TableCell>{intern.phone}</TableCell>
                  <TableCell>{intern.skills}</TableCell>
                  <TableCell>{intern.joiningDate}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        intern.status === "Active"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      }
                    >
                      {intern.status}
                    </Badge>
                  </TableCell>
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