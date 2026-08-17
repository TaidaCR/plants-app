import Footer from './Components/Footer.jsx'
import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ScrollToTop from './Components/ScrollToTop.jsx'
import {usePlantStore} from './store/usePlantStore.js'
import CameraModal from './Components/CameraModal.jsx'

const HomePage = lazy(() => import("./pages/HomePage.jsx"))
const PlantDetailsPage = lazy(() => import("./pages/PlantDetailsPage.jsx"))
const NewPlantPage = lazy(() => import("./pages/NewPlantPage.jsx"))
const EditPlantPage = lazy(() => import("./pages/EditPlantPage.jsx"))
const CarePlantsPage = lazy(() => import("./pages/CarePlantsPage.jsx"))

function App() {
  const {isCameraOpen} = usePlantStore()
  return (
    <>
      {/* <Header /> */}
      <Suspense fallback={<p>Cargando...</p>}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plantdetails/:id" element={<PlantDetailsPage />} />
          <Route path="/newplant" element={<NewPlantPage />} />
          <Route path="/editplant/:id" element={<EditPlantPage />} />
          <Route path="/careplants" element={<CarePlantsPage />}></Route>
        </Routes>
        {isCameraOpen ? <CameraModal/> : ""}
      </Suspense>
      <Footer/>
    </>
  )
}

export default App
