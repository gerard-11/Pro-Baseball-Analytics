import { Outlet } from "react-router-dom"
import {Header} from "./components/Header"

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 ">
            <Header />

            <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
                <Outlet />
            </main>

            <footer className="bg-white border-t text-center py-4 text-sm text-gray-500">
                © Ger-Dev-Studio 2026 MLB App
            </footer>
        </div>
    )
}