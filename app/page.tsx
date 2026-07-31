import Navbar from "@/components/nav";
import Sidebar from "@/components/sidebar";

export default function Home() {
    return (
        <div className="min-h-screen bg-white font-san">
            <Navbar />
            <Sidebar />
            <div className="p-4 sm:ml-64 mt-14">
                content
            </div>
        </div>
    );
}
