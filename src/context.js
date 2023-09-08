import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'

// Create a context for the application
const AppContext = React.createContext();

// Define the initial state for the application
const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0
};

// Create a component called AppProvider which will wrap the entire application
const AppProvider = ({ children }) => {
  
  // Use the useReducer hook to manage the application's state with the defined reducer and initial state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Define functions to interact with the state using the dispatch function
  const clearCart = () => {
    dispatch({ type: "CLEAR_ITEMS" });
  }
  const removeItem = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  }
  const increase = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  }
  const decrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  }
  const toggleAmount = (id, type) => {
    dispatch({ type: "TOGGLE_AMOUNT", payload: { type, id } });
  }

  // Define a function to fetch data from the specified URL
  const fetchData = async () => {
    // Dispatch a "LOADING" action to indicate that data is being fetched
    dispatch({ type: "LOADING" });

    // Fetch data from the URL
    const response = await fetch(url);
    const cart = await response.json();

    // Dispatch a "DISPLAY_ITEMS" action to update the cart with fetched data
    dispatch({ type: "DISPLAY_ITEMS", payload: cart });
  }

  // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Use the useEffect hook to recalculate totals when the cart state changes
  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  // Provide the state and functions to the context for other components to access
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increase,
        decrease,
        toggleAmount
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Export the useGlobalContext hook for components to access the context
export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider };
