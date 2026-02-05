import { createContext, useState, useEffect,useContext } from "react";

// const initialCartContext={
//   cart: [],
//   setCart: () => {},
//   addToCart: () => {
//     console.log("Add to cart function called");
//   },
//   removeFromCart: () => {},
//   totalQuantity: 6,
// };

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);
 

export const CartContextProvider = ({ children }) => {
  // Initialize cart state from localStorage or start with an empty cart
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error(
        "Failed to parse cart from localStorage. Initializing with empty cart.",
        error,
      );
      return [];
    }
  });

  // save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage.", error);
    }
  }, [cart]);
//this is for testing localstorage without using useEffect
  //localStorage.setItem("carttest", JSON.stringify(cart));

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.productId === product.productId,
      );

      if (existingItem) {
        // Use map() to create a new array with the updated quantity for the existing item

        return prevCart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        // Add new item to cart
        return [...prevCart, { ...product, quantity }];
      }
    });
  };
  //function to remove item from cart
    const removeFromCart = (productId) => {
        setCart((prevCart) =>
        prevCart.filter((item) => item.productId !== productId),
        );
    };
    //calculate total quantity
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
