import "../../globals.css";
import AdminSidebar from "./_components/AdminSidebar";
         
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">

      {/* Sidebar */}

      <AdminSidebar />

      {/* Content */}

      <main className="flex-1 ml-64">

        {/* Top Bar */}

        <div className="h-16 bg-white border-b border-gray-200 flex items-center px-8">
          <h2 className="text-gray-900 font-semibold text-lg">
            Admin Dashboard
          </h2>

 
        </div>

        {/* Page Content */}

        <div className="p-8">{children}</div>

      </main>

    </div>
  );
}