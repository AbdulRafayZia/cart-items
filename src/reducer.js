// Define a reducer function that takes state and action as parameters
const reducer = (state, action) => {

    // Check if the action type is "CLEAR_ITEMS"
    if (action.type === "CLEAR_ITEMS") {
        // Return a new state object with an empty "cart" array
        return ({ ...state, cart: [] })
    }

    // Check if the action type is "REMOVE"
    if (action.type === "REMOVE") {
        // Return a new state object with the item removed from the "cart" array
        return ({ ...state, cart: state.cart.filter((cartItem) => cartItem.id !== action.payload) })
    }

    /*
    // Check if the action type is "INCREASE"
    if (action.type === "INCREASE") {
        // Create a new "tempCart" array by mapping over the "cart" array
        let tempCart = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload) {
                // If the item matches the payload, increase its "amount" property by 1
                return { ...cartItem, amount: cartItem.amount + 1 }
            }
            // Otherwise, return the item unchanged
            return cartItem
        })
        // Return a new state object with the updated "cart"
        return ({ ...state, cart: tempCart })
    }

    // Check if the action type is "DECREASE"
    if (action.type === "DECREASE") {
        // Create a new "tempCart" array by mapping over the "cart" array
        let tempCart = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload) {
                // If the item matches the payload, decrease its "amount" property by 1
                return { ...cartItem, amount: cartItem.amount - 1 }
            }
            // Otherwise, return the item unchanged
            return cartItem
        })
        // Filter out items with an "amount" of 0 and return a new state object with the updated "cart"
        tempCart = tempCart.filter((cartItem) => cartItem.amount !== 0)
        return ({ ...state, cart: tempCart })
    }
    */

    // Check if the action type is "GET_TOTALS"
    if (action.type === "GET_TOTALS") {
        // Calculate the total price and total amount of items in the "cart" array
        let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
            const { price, amount } = cartItem
            const itemTotal = price * amount
            cartTotal.total += itemTotal
            cartTotal.amount += amount
            return cartTotal
        },
        {
            total: 0,
            amount: 0,
        })
        // Round the total to two decimal places
        total = parseFloat(total.toFixed(2))
        // Return a new state object with the calculated total and amount
        return { ...state, total, amount }
    }

    // Check if the action type is "LOADING"
    if (action.type === "LOADING") {
        // Return a new state object with the "loading" property set to true
        return { ...state, loading: true }
    }

    // Check if the action type is "DISPLAY_ITEMS"
    if (action.type === "DISPLAY_ITEMS") {
        // Return a new state object with the "cart" and "loading" properties updated
        return { ...state, cart: action.payload, loading: false }
    }

    // Check if the action type is "TOGGLE_AMOUNT"
    if (action.type === "TOGGLE_AMOUNT") {
        // Create a new "tempCart" array by mapping over the "cart" array
        let tempCart = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload.id) {
                // Toggle the "amount" property based on the action payload type ("inc" or "dec")
                if (action.payload.type === "inc") {
                    return { ...cartItem, amount: cartItem.amount + 1 }
                }
                if (action.payload.type === "dec") {
                    return { ...cartItem, amount: cartItem.amount - 1 }
                }
            }
            // Return the item unchanged if it doesn't match the action payload
            return cartItem
        })
        // Filter out items with an "amount" of 0 and return a new state object with the updated "cart"
        tempCart = tempCart.filter((cartItem) => cartItem.amount !== 0)
        return { ...state, cart: tempCart }
    }

    // If none of the above conditions match the action type, return the current state unchanged
    return state;
}

// Export the reducer function as the default export of this module
export default reducer;
