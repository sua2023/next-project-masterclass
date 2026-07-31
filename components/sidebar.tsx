import { ImUser } from "react-icons/im"
import { IoMdHome } from "react-icons/io"
import { VscOpenInProduct } from "react-icons/vsc"

export default function Sidebar() {
    const menuSibebar = [{
        title: "Dashbord",
        value: "dashboard",
        icon: <IoMdHome />
    }, {
        title: "Users",
        value: "users",
        icon: <ImUser />
    }, {
        title: "Products",
        value: "products",
        icon: <VscOpenInProduct />
    }]
    return (
        <aside id="top-bar-sidebar" className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-default">
                <a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3" alt="Flowbite Logo" />
                    <span className="self-center text-lg text-heading font-semibold whitespace-nowrap">Flowbite</span>
                </a>
                <ul className="space-y-2 font-medium">
                    {menuSibebar.map((item: any, index) => (
                        <li key={index}>
                            <a href={`/${item.value}`} className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                                {item.icon}
                                <span className="ms-3">{item.title}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}