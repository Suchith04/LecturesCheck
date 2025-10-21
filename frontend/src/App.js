import Navbar from "./Navbar"
import Upload from "./pages/Upload"
import Home from "./pages/Home"
import About from "./pages/About"
import Analysis from "./pages/analysis"
import { Route, Routes } from "react-router-dom"



function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/about" element={<About />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </div>
    </>
  )
}

export default App
