
import './App.css'
import {Route, Routes} from "react-router-dom"
import {Home} from "./pages/Home.tsx";
import { Players} from "./pages/Players.tsx";
import Layout from "./Layout.tsx";
import {Teams} from "./pages/Teams.tsx";
import {News} from "./pages/News.tsx";
import { TeamProvider } from './context/TeamContext.tsx';
import { DreamTeamProvider } from './context/DreamTeamContext.tsx';
import { DreamTeam } from './pages/DreamTeam.tsx';
import { Search } from './pages/Search.tsx';

function App() {

  return (
    <TeamProvider>
      <DreamTeamProvider>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='players/:keyTeam' element={<Players/>}/>
                <Route path='teams' element={<Teams/>}/>
                <Route path='search' element={<Search/>}/>
                <Route path='news' element={<News/>}/>
                <Route path='dreamteam' element={<DreamTeam/>}/>
            </Route>
        </Routes>
      </DreamTeamProvider>
    </TeamProvider>
  )
}

export default App
