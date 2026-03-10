import { NavLink } from "react-router-dom"
import { useTeamContext } from "../context/TeamContext"

const Header=()=> {
    const baseStyle = "px-3 py-2 rounded-md text-sm font-medium"
    const { selectedTeamKey } = useTeamContext()

    return (
        <header className="bg-white border-b shadow-sm ">
            <div className="max-w-6xl mx-auto px-4 ">
                <div className="flex items-center justify-between h-16">

                    {/* Logo and Search */}
                    <div className="flex items-center gap-4">
                        <NavLink to="/" className="text-xl font-bold text-blue-600 flex items-center">
                            <img src='/MLB-Logo.webp' alt='Logo'
                            className=' w-16 mx-3' />
                            MLB App
                        </NavLink>
                        <NavLink
                            to="/search"
                            className={({ isActive }) =>
                                `${baseStyle} ${
                                    isActive ? "bg-purple-500 text-white" : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            🔍 Search
                        </NavLink>
                    </div>

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

                        {selectedTeamKey && (
                            <NavLink
                                to={`/players/${selectedTeamKey}`}
                                className={({ isActive }) =>
                                    `${baseStyle} ${
                                        isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                                    }`
                                }
                            >
                                Players
                            </NavLink>
                        )}

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
                            to="/dreamteam"
                            className={({ isActive }) =>
                                `${baseStyle} ${
                                    isActive ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            Dream Team
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