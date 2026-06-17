import Header from './Components/Header'
import Footer from './Components/Footer'
import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense} from 'react'

const HomePage = lazy(() => import("./pages/HomePage.jsx"))
const PlantDetailsPage = lazy(() => import("./pages/PlantDetailsPage.jsx"))
const NewPlantPage = lazy(() => import("./pages/NewPlantPage.jsx"))
const EditPlantPage = lazy(() => import("./pages/EditPlantPage.jsx"))

function App() {

  return (
    <>
      <Header/>
      <Suspense fallback={<p>Cargando...</p>}>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/plantdetails/:id" element={<PlantDetailsPage/>}/>
        <Route path="/newplant" element={<NewPlantPage/>}/>
        <Route path="/editplant/:id" element={<EditPlantPage/>}/>
      </Routes>
      </Suspense>
     
      <Footer/>
    </>
  )
}

export default App
