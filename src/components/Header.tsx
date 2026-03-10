import { NavLink } from "react-router-dom"
import { useTeamContext } from "../context/TeamContext"
import { useState } from "react"

const Header=()=> {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const baseStyle = "px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium"
    const { selectedTeamKey } = useTeamContext()

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <header className="bg-white border-b shadow-sm">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between h-14 sm:h-16">

                    {/* Logo and Search */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <NavLink to="/" className="text-lg sm:text-xl font-bold text-blue-600 flex items-center">
                            <img src='/MLB-Logo.webp' alt='Logo'
                            className='w-12 sm:w-16 mx-2 sm:mx-3' />
                            <span className="hidden sm:inline">MLB App</span>
                        </NavLink>
                        <NavLink
                            to="/search"
                            className={({ isActive }) =>
                                `${baseStyle} hidden sm:block ${
                                    isActive ? "bg-purple-500 text-white" : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            🔍 Search
                        </NavLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="sm:hidden text-gray-700 hover:text-gray-900 text-2xl"
                        aria-label="Toggle menu"
                    >
                        ☰
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden sm:flex gap-2">
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

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav className="sm:hidden flex flex-col gap-2 pb-4 border-t">
                        <NavLink
                            to="/search"
                            className={({ isActive }) =>
                                `${baseStyle} block ${
                                    isActive ? "bg-purple-500 text-white" : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            🔍 Search
                        </NavLink>

                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `${baseStyle} block ${
                                    isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </NavLink>

                        {selectedTeamKey && (
                            <NavLink
                                to={`/players/${selectedTeamKey}`}
                                className={({ isActive }) =>
                                    `${baseStyle} block ${
                                        isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Players
                            </NavLink>
                        )}

                        <NavLink
                            to="/teams"
                            className={({ isActive }) =>
                                `${baseStyle} block ${
                                    isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Teams
                        </NavLink>

                        <NavLink
                            to="/dreamteam"
                            className={({ isActive }) =>
                                `${baseStyle} block ${
                                    isActive ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dream Team
                        </NavLink>

                        <NavLink
                            to="/news"
                            className={({ isActive }) =>
                                `${baseStyle} block ${
                                    isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            News
                        </NavLink>
                    </nav>
                )}
            </div>
        </header>
    )
}

export {Header}