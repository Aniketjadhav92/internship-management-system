import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header({ title }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b bg-white/90 px-6 py-4 backdrop-blur">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-sm text-slate-500">
          Track interns, attendance, tasks and reports.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={17} />
          <Input
            placeholder="Search..."
            className="w-72 rounded-xl bg-slate-50 pl-9"
          />
        </div>

        <button className="rounded-xl border bg-white p-2 hover:bg-slate-50">
          <Bell size={19} />
        </button>

        <Avatar>
          <AvatarFallback>AJ</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}