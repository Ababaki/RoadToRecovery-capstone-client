import CentersMap from "./components/map/CenterMap";
import "./App.scss";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Upload from './pages/Upload/Upload';

import Header from "./components/Header/header";
import ErrorPage from "./pages/Error/ErrorPage";
import Calendar from './components/SobrietyCalendar/SobrietyCalendar'



function App() {
  return(
  <>
  <BrowserRouter>
  <Header/>
    <Routes>
    <Route path='/' element={<CentersMap />}/>
   
     <Route path='/centermap' element={<CentersMap />} />
     
     <Route path='/testimonial/upload' element={<Upload />} />
    
     <Route path='*' element={<ErrorPage />} />
     <Route path='/calendar' element = {<Calendar/>}/>
     
    </Routes>
</BrowserRouter>
  
  
  </>
  ) 
}

export default App;