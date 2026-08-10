import Header from './Components/Header'
import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ScrollToTop from './Components/ScrollToTop.jsx'

const HomePage = lazy(() => import("./pages/HomePage.jsx"))
const PlantDetailsPage = lazy(() => import("./pages/PlantDetailsPage.jsx"))
const NewPlantPage = lazy(() => import("./pages/NewPlantPage.jsx"))
const EditPlantPage = lazy(() => import("./pages/EditPlantPage.jsx"))
const CarePlantsPage = lazy(() => import("./pages/CarePlantsPage.jsx"))

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Cargando...</p>}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plantdetails/:id" element={<PlantDetailsPage />} />
          <Route path="/newplant" element={<NewPlantPage />} />
          <Route path="/editplant/:id" element={<EditPlantPage />} />
          <Route path="/careplants" element={<CarePlantsPage />}></Route>
        </Routes>
      </Suspense>

      {/* <Footer/> */}
    </>
  )
}

export default App
