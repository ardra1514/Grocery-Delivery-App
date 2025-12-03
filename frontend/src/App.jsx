import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Navebar from './components/Navebar'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/Appcontex'
import Login from './components/Login'
import Allproducts from './pages/Allproducts'
import Productcategory from './pages/Productcategory'
import Productdetails from './pages/Productdetails'
import Cart from './pages/Cart'
import Addaddress from './pages/Addaddress'
import Myorders from './pages/Myorders'

function App() {
  const issellerpath = useLocation().pathname.includes("seller")
  const { showUserLogin } = useAppContext()

  return (
    <>
      {!issellerpath && <Navebar />}
      {showUserLogin && <Login />}
      <Toaster />

      {/* FIX: Add pt-24 to push content below fixed navbar */}
      <div className={`${issellerpath ? "" : "px-6 md:px-16 lg:px-32 pt-24"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Allproducts/>} />
          <Route path="/products/:category" element={<Productcategory/>} />
          <Route path="/products/:category/:id" element={<Productdetails/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/add-address" element={<Addaddress/>} />
          <Route path="/my-orders" element={<Myorders/>} />






        </Routes>
      </div>

      {!issellerpath && <Footer />}
    </>
  )
}

export default App
