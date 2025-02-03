const CartPopup = ({ cart, onClose, onGoToCart }) => {
  if (!cart || cart.cart_items.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-11/12 max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Welcome Back!</h2>
        <p className="mb-4">You have items in your cart:</p>
        <ul className="mb-4">
          {cart.cart_items.map((item) => (
            <li key={item.product_id} className="border-b py-2">
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
        <p className="font-semibold mb-4">Total: ${cart.total_amount}</p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onGoToCart}
          >
            View Cart
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
