import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";

export const Appcontext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isseller, setIsseller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);

  const [products, setProducts] = useState([]);
  const [cartitems, setCartitems] = useState({});
  const [searchquery, setSearchquery] = useState({});

  const currency = import.meta.env.VITE_CURRENCY;

  // Fetch products
  const fetchproduct = async () => {
    setProducts(dummyProducts);
  };

  useEffect(() => {
    fetchproduct();
  }, []);

  // Add to cart
  const addtocart = (itemid) => {
    let cartData = structuredClone(cartitems);

    if (cartData[itemid]) {
      cartData[itemid] += 1;
    } else {
      cartData[itemid] = 1;
    }

    setCartitems(cartData);
    toast.success("Added to cart");
  };

  // Update cart quantity
  const updatecartitems = (itemid, quantity) => {
    let cartData = structuredClone(cartitems);
    cartData[itemid] = quantity;
    setCartitems(cartData);
    toast.success("Cart updated");
  };

  // Remove item
  const removecart = (itemid) => {
    let cartData = structuredClone(cartitems);

    if (cartData[itemid]) {
      cartData[itemid] -= 1;
      if (cartData[itemid] === 0) delete cartData[itemid];
    }

    setCartitems(cartData);
    toast.success("Item removed");
  };

  // Get total number of items
  const getCartcount = () => {
    let totalcount = 0;
    for (const item in cartitems) {
      totalcount += cartitems[item];
    }
    return totalcount;
  };

  // Get total price
  const getcartAmount = () => {
    let totalamount = 0;

    for (const item in cartitems) {
      let iteminfo = products.find((p) => p._id === item);

      if (!iteminfo) continue;   // PREVENT CRASH

      // FIXED: use correct key offerPrice
      totalamount += iteminfo.offerPrice * cartitems[item];
    }

    // FIXED: Math not math
    return Math.floor(totalamount * 100) / 100;
  };

  return (
    <Appcontext.Provider
      value={{
        navigate,
        user,
        setUser,
        isseller,
        setIsseller,
        showUserLogin,
        setShowUserLogin,
        products,
        currency,
        addtocart,
        updatecartitems,
        removecart,
        cartitems,
        searchquery,
        setSearchquery,
        getcartAmount,
        getCartcount
      }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export const useAppContext = () => useContext(Appcontext);
