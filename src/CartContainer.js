import React from 'react';
import CartItem from './CartItem';
import { useGlobalContext } from './context';

// Define a functional component called CartContainer
const CartContainer = () => {
  // Use the useGlobalContext hook to access cart data, total, and clearCart function from the context
  const { cart, total, clearCart } = useGlobalContext();

  // Check if the cart is empty, and if so, display a message
  if (cart.length === 0) {
    return (
      <section className='cart'>
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    );
  }

  // If the cart is not empty, display the cart items
  return (
    <section className='cart'>
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {/* Map over the cart items and render each item using the CartItem component */}
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className='cart-total'>
          {/* Display the total cost of the items in the cart */}
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        {/* Button to clear the cart */}
        <button className='btn clear-btn' onClick={clearCart}>
          clear cart
        </button>
      </footer>
    </section>
  );
}

// Export the CartContainer component as the default export of this module
export default CartContainer;
