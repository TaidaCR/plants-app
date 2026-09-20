import Footer from './Components/Footer.jsx'
import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ScrollToTop from './Components/ScrollToTop.jsx'
import { usePlantStore } from './store/usePlantStore.js'
import {useAuthStore} from "./store/useAuthStore.js"
import CameraModal from './Components/CameraModal.jsx'
import Loading from './Components/Loading.jsx'
import loadingImg from './assets/loadingLeaves.svg'
import {onChangeUser} from "./firebase/config.js"
import {useEffect} from "react"

const HomePage = lazy(() => import("./pages/HomePage.jsx"))
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"))
const PlantDetailsPage = lazy(() => import("./pages/PlantDetailsPage.jsx"))
const NewPlantPage = lazy(() => import("./pages/NewPlantPage.jsx"))
const EditPlantPage = lazy(() => import("./pages/EditPlantPage.jsx"))
const CarePlantsPage = lazy(() => import("./pages/CarePlantsPage.jsx"))
const UserDetailsPage = lazy(() => import("./pages/UserDetailsPage.jsx"))

function App() {
    const {user, setUser} = useAuthStore()

    useEffect(() => {
      onChangeUser(setUser)
    }, [])
 
  const { isCameraOpen } = usePlantStore()
  return (
    <>
      {/* <Header /> */}
      <Suspense fallback={<Loading img={loadingImg}><div className="flex space-x-1 text-2xl text-gray-800">
        <span className="animate-bounce [animation-delay:0ms]">C</span>
        <span className="animate-bounce [animation-delay:100ms]">a</span>
        <span className="animate-bounce [animation-delay:200ms]">r</span>
        <span className="animate-bounce [animation-delay:300ms]">g</span>
        <span className="animate-bounce [animation-delay:400ms]">a</span>
        <span className="animate-bounce [animation-delay:500ms]">n</span>
        <span className="animate-bounce [animation-delay:600ms]">d</span>
        <span className="animate-bounce [animation-delay:700ms]">o</span>

        <span className="animate-bounce [animation-delay:800ms]">.</span>
        <span className="animate-bounce [animation-delay:900ms]">.</span>
        <span className="animate-bounce [animation-delay:1000ms]">.</span>
      </div></Loading>}>
        <ScrollToTop />
        <Routes>
          {/* Cambiarlo y proteger rutas si no user y rutas erroneas */}
          <Route path="/" element={user ? <HomePage /> : <LoginPage />}></Route>
          <Route path="/userdetails" element={<UserDetailsPage />}></Route>
          <Route path="/home" element={<HomePage />} />
          <Route path="/plantdetails/:id" element={<PlantDetailsPage />} />
          <Route path="/newplant" element={<NewPlantPage />} />
          <Route path="/editplant/:id" element={<EditPlantPage />} />
          <Route path="/careplants" element={<CarePlantsPage />}></Route>
        </Routes>
        {isCameraOpen ? <CameraModal /> : ""}
      </Suspense>
      {user && <Footer />}
    </>
  )
}

export default App
