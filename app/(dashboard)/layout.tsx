import Navbar from "@/components/nav";
import Sidebar from "@/components/sidebar";

export default function Dashboard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-white font-san">
            <Navbar />
            <Sidebar />
            <div className="p-4 sm:ml-64 mt-14">
                {children}
            </div>
        </div>
    );
}