import React from 'react'
import { useAppContext } from '../context/Appcontex'

const Login = () => {
  const { setShowUserLogin, setUser } = useAppContext()

  const [state, setState] = React.useState("login")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // For now, simple login success
    setUser(true)              // user is now logged in
    setShowUserLogin(false)    // close login modal
  }


const onsubmitHandler=async(event)=>{
    event.preventDefault();
    setUser({
        email:"test@re.dev",
        name:"ardra"

    })
    setShowUserLogin(false)
}






  return (
    <div 
      className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50'
      onClick={() => setShowUserLogin(false)}   // close when clicking outside
    >
      <form onSubmit={onsubmitHandler}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] 
                   text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
        onClick={(e) => e.stopPropagation()}     // prevent background click from closing form
      
      >
        
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-4 right-6 text-xl text-gray-500 hover:text-black"
          onClick={() => setShowUserLogin(false)}
        >
          ✕
        </button>

        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>

        {/* Name input only for register */}
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>

        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>

        {/* Toggle Login / Register */}
        {state === "register" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setState("login")} className="text-primary cursor-pointer">
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span onClick={() => setState("register")} className="text-primary cursor-pointer">
              click here
            </span>
          </p>
        )}

        {/* Submit Button */}
        <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>

      </form>
    </div>
  )
}

export default Login
