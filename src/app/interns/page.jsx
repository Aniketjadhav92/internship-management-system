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
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";

export default function InternsPage() {
  const [interns, setInterns] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    joiningDate: "",
    status: "Active",
    password: "intern123",
  });

  const fetchInterns = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/interns");
      const data = await res.json();
      setInterns(data);
    } catch (error) {
      console.log("Failed to fetch interns", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterns();
  }, []);

  const filteredInterns = interns.filter((intern) =>
    intern.name?.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      skills: "",
      joiningDate: "",
      status: "Active",
      password: "intern123",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddIntern = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/interns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add intern");
        return;
      }

      alert("Intern added successfully");

      resetForm();
      setOpen(false);
      fetchInterns();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleEditClick = (intern) => {
    setSelectedIntern(intern);

    setFormData({
      name: intern.name || "",
      email: intern.email || "",
      phone: intern.phone || "",
      skills: intern.skills || "",
      joiningDate: intern.joiningDate ? intern.joiningDate.split("T")[0] : "",
      status: intern.status || "Active",
      password: "",
    });

    setEditOpen(true);
  };

  const handleUpdateIntern = async (e) => {
    e.preventDefault();

    if (!selectedIntern) return;

    const updateData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      skills: formData.skills,
      joiningDate: formData.joiningDate,
      status: formData.status,
    };

    try {
      const res = await fetch(`/api/interns/${selectedIntern._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update intern");
        return;
      }

      alert("Intern updated successfully");

      setEditOpen(false);
      setSelectedIntern(null);
      resetForm();
      fetchInterns();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleDeleteIntern = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this intern?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/interns/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete intern");
        return;
      }

      alert("Intern deleted successfully");
      fetchInterns();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
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
              Manage all registered interns from MongoDB.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <Input
              placeholder="Search interns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl md:w-64"
            />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <div className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
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

                  <Input
                    name="password"
                    type="password"
                    placeholder="Default Password"
                    value={formData.password}
                    onChange={handleChange}
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
                      onClick={() => {
                        setOpen(false);
                        resetForm();
                      }}
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
          {loading ? (
            <p className="text-sm text-slate-500">Loading interns...</p>
          ) : (
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
                {filteredInterns.length > 0 ? (
                  filteredInterns.map((intern) => (
                    <TableRow key={intern._id}>
                      <TableCell className="font-medium">
                        {intern.name}
                      </TableCell>

                      <TableCell>{intern.email}</TableCell>
                      <TableCell>{intern.phone}</TableCell>
                      <TableCell>{intern.skills}</TableCell>

                      <TableCell>
                        {intern.joiningDate
                          ? new Date(intern.joiningDate).toLocaleDateString()
                          : "-"}
                      </TableCell>

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

                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleEditClick(intern)}
                          >
                            <Pencil size={16} />
                          </Button>

                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleDeleteIntern(intern._id)}
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
                      colSpan="7"
                      className="py-8 text-center text-slate-500"
                    >
                      No interns found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Intern</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleUpdateIntern} className="space-y-4">
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
                  onClick={() => {
                    setEditOpen(false);
                    setSelectedIntern(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>

                <Button type="submit" className="bg-slate-900">
                  Update Intern
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}