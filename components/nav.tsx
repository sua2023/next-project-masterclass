"use client"
import { useState } from "react"

export default function Navbar() {
    const [isProfile, setIsProfile] = useState(false)
    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-default">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3" alt="FlowBite Logo" />
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="relative items-center ms-3">
                            <div>
                                <button onClick={() => setIsProfile(!isProfile)} type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                                </button>
                            </div>
                            <div className={`z-50 ${isProfile ? "block" : "hidden"}  absolute right-0 top-10 bg-white border border-default-medium rounded-base shadow-lg w-44`} id="dropdown-user">
                                <div className="px-4 py-3 border-b border-default-medium" role="none">
                                    <p className="text-sm font-medium text-heading" role="none">
                                        Neil Sims
                                    </p>
                                    <p className="text-sm text-body truncate" role="none">
                                        neil.sims@flowbite.com
                                    </p>
                                </div>
                                <ul className="p-2 text-sm text-body font-medium" role="none">
                                    <li>
                                        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem">Earnings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem">Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}