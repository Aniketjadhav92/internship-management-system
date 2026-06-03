import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ children, title }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <main className="ml-64 min-h-screen">
        <Header title={title} />

        <section className="p-6">{children}</section>
      </main>
    </div>
  );
}