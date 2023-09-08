import React from 'react';
import { useGlobalContext } from './context';

// Define a functional component called CartItem that receives props
const CartItem = ({ id, img, title, price, amount }) => {
  // Use the useGlobalContext hook to access state and functions from the context
  const { removeItem, increase, decrease, toggleAmount } = useGlobalContext();

  return (
    <article className='cart-item'>
      {/* Display the product image */}
      <img src={img} alt={title} />
      <div>
        {/* Display the product title */}
        <h4>{title}</h4>
        {/* Display the product price */}
        <h4 className='item-price'>${price}</h4>
        {/* Remove button to remove the item from the cart */}
        <button
          className='remove-btn'
          onClick={() => removeItem(id)}
        >
          remove
        </button>
      </div>
      <div>
        {/* Button to increase the quantity of the item */}
        <button className='amount-btn' onClick={() => toggleAmount(id, "inc")}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
          </svg>
        </button>
        {/* Display the quantity of the item */}
        <p className='amount'>{amount}</p>
        {/* Button to decrease the quantity of the item */}
        <button className='amount-btn' onClick={() => toggleAmount(id, "dec")}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        </button>
      </div>
    </article>
  );
}

// Export the CartItem component as the default export of this module
export default CartItem;
