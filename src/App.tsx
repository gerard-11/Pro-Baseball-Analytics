
import './App.css'
import {Route, Routes} from "react-router-dom"
import {Home} from "./pages/Home.tsx";
import { Players} from "./pages/Players.tsx";
import Layout from "./Layout.tsx";
import {Teams} from "./pages/Teams.tsx";
import {News} from "./pages/News.tsx";

function App() {

  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='players/:keyTeam' element={<Players/>}/>
            <Route path='teams' element={<Teams/>}/>
            <Route path='news' element={<News/>}/>
        </Route>
    </Routes>
  )
}

export default App
