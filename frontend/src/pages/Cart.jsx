import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/Appcontex'
import { assets, dummyAddress } from '../assets/assets'

const Cart = () => {

  const [showAddress, setShowAddress] = useState(false)
  const { products, currency, cartitems, removecart, getCartcount, getcartAmount, updatecartitems, navigate } = useAppContext()

  const [cartarray, setcartarray] = useState([])
  const [address, setAddress] = useState(dummyAddress)
  const [selectedaddress, setSelectedaddress] = useState(dummyAddress[0])
  const [paymentoption, setPaymentoptin] = useState("COD")

  // -------------------------
  // FIXED: No more direct mutation of product
  // -------------------------
  const getCart = () => {
    let tempArray = []

    for (const key in cartitems) {
      const product = products.find((p) => p._id === key)
      if (product) {
        tempArray.push({
          ...product,                // clone so we don't mutate original
          quantity: cartitems[key]   // add quantity safely
        })
      }
    }
    setcartarray(tempArray)
  }

  const placeorder = async () => {}

  useEffect(() => {
    if (products.length > 0 && cartitems) {
      getCart()
    }
  }, [products, cartitems])

  if (products.length === 0 || !cartitems) return null

  return (
    <div className="flex flex-col md:flex-row mt-16">

      {/* LEFT SIDE */}
      <div className='flex-1 max-w-4xl'>

        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart <span className="text-sm text-primary">{getCartcount()} item</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartarray.map((product, index) => (
          <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">

            <div className="flex items-center md:gap-6 gap-3">
              <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
              </div>

              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>weight: <span>{product.weight || "N/A"}</span></p>

                  <div className='flex items-center'>
                    <p>Qty:</p>

                    {/* FIXED QTY DROPDOWN */}
                    <select
                      className='outline-none'
                      value={product.quantity}
                      onChange={(e) => updatecartitems(product._id, Number(e.target.value))}
                    >
                      {Array.from({ length: product.quantity > 9 ? product.quantity : 9 })
                        .map((_, i) => (
                          <option key={i} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>

                  </div>
                </div>
              </div>
            </div>

            <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>

            <button onClick={() => removecart(product._id)} className="cursor-pointer mx-auto">
              <img src={assets.remove_icon} alt="" className='inline-block w-6 h-6' />
            </button>

          </div>
        ))}

        <button
          onClick={() => { navigate("/products"); scrollTo(0, 0) }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
        >
          <img src={assets.arrow_right_icon_colored} alt="" className='group-hover:-translate-x-1 transition' />
          Continue Shopping
        </button>

      </div>

      {/* RIGHT SIDE */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        {/* Address */}
        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>

          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedaddress
                ? `${selectedaddress.street}, ${selectedaddress.city}, ${selectedaddress.state}, ${selectedaddress.country}`
                : "No address found"}
            </p>

            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-indigo-500 hover:underline cursor-pointer"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-20">

                {address.map((add, i) => (
                  <p
                    key={i}
                    onClick={() => { setSelectedaddress(add); setShowAddress(false) }}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {add.street}, {add.city}, {add.state}, {add.country}
                  </p>
                ))}

                <p
                  onClick={() => navigate("/add-address")}
                  className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                >
                  Add address
                </p>

              </div>
            )}

          </div>

          {/* Payment */}
          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            onChange={(e) => setPaymentoptin(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        {/* SUMMARY */}
        <div className="text-gray-500 mt-4 space-y-2">

          <p className="flex justify-between">
            <span>Price</span>
            <span>{currency}{getcartAmount()}</span>
          </p>

          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>

          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{currency}{(getcartAmount() * 2 / 100).toFixed(2)}</span>
          </p>

          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>{currency}{(getcartAmount() + getcartAmount() * 0.02).toFixed(2)}</span>
          </p>

        </div>

        <button
          onClick={placeorder}
          className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
        >
          {paymentoption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>

      </div>

    </div>
  )
}

export default Cart
