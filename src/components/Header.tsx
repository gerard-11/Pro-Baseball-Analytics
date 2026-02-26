import {NavLink} from "react-router-dom";


const Header = () => {
    return (
        <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>

            <nav style={{ display: "flex", gap: "1rem", marginTop: "0" }}>
                <NavLink to="/"
                         style={({ isActive }) => ({
                             fontWeight: isActive ? "bold" : "normal",
                             color: isActive ? "red" : "blue",
                             gap: "1rem"
                         })}
                > <img src='../../public/MLB-Logo.webp' width={50} alt='MLB Logo'/>
                    Home
                </NavLink>
                <NavLink to="/players"
                           style={({ isActive }) => ({
                             fontWeight: isActive ? "bold" : "normal",
                             color: isActive ? "red" : "blue"
                         })}
                >Players
                </NavLink>
                <NavLink to="/teams"
                           style={({ isActive }) => ({
                             fontWeight: isActive ? "bold" : "normal",
                             color: isActive ? "red" : "blue"
                         })}
                >Teams
                </NavLink>
                <NavLink to="/News"
                           style={({ isActive }) => ({
                             fontWeight: isActive ? "bold" : "normal",
                             color: isActive ? "red" : "blue"
                         })}
                >news
                </NavLink>
            </nav>
        </header>
    )
}
export {Header};