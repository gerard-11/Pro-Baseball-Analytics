import { NavLink } from "react-router-dom"

const Header=()=> {
    const baseStyle = "px-3 py-2 rounded-md text-sm font-medium"

    return (
        <header className="bg-white border-b shadow-sm ">
            <div className="max-w-6xl mx-auto px-4 ">
                <div className="flex items-center justify-between  h-16">

                    {/* Logo */}
                    <NavLink to="/" className="text-xl font-bold text-blue-600">
                       <img src='/MLB-Logo.webp' alt='Logo'
                       className=' w-16 mx-3' />
                        MLB App
                    </NavLink>

                    {/* Navigation */}
                    <nav className="flex gap-2 ">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `${baseStyle} ${
                                    isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/players"
                            className={({ isActive }) =>
                                `${baseStyle} ${
                                    isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            Players
                        </NavLink>

                        <NavLink
                            to="/teams"
                            className={({ isActive }) =>
                                `${baseStyle} ${
                                    isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            Teams
                        </NavLink>

                        <NavLink
                            to="/news"
                            className={({ isActive }) =>
                                `${baseStyle} ${
                                    isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            News
                        </NavLink>
                    </nav>

                </div>
            </div>
        </header>
    )
}

export {Header}