import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, Minus, Plus, Utensils, ClipboardCheck } from "lucide-react";
import { removeFromCart, updateQuantity, clearCart } from "../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import SuccessToast from "../components/SuccessToast";

// Format currency
const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(Number(amount) || 0);

// Quantity control
const QuantityControl = ({ quantity, onIncrease, onDecrease }) => (
  <div className="flex items-center bg-[#2a1f0f]/30 rounded-full p-1 text-white text-sm font-medium">
    <button
      onClick={onDecrease}
      className="w-6 h-6 flex justify-center items-center text-[#facc15]"
      disabled={quantity <= 1}
    >
      <Minus size={14} />
    </button>
    <span className="mx-2 font-semibold">{quantity}</span>
    <button
      onClick={onIncrease}
      className="w-6 h-6 flex justify-center items-center text-[#facc15]"
    >
      <Plus size={14} />
    </button>
  </div>
);

// Cart item
const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
  <div className="flex items-center justify-between py-3 border-b border-[#6b3e1f]">
    <div className="flex items-center space-x-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg border border-[#facc1520]"
      />
      <div className="text-white">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-[#fcd34d] font-bold">{formatCurrency(item.price)}</p>
      </div>
    </div>

    <div className="flex items-center space-x-4">
      <QuantityControl
        quantity={item.quantity}
        onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
        onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}
      />
      <button
        onClick={() => onRemove(item.id)}
        className="text-[#dc2626] hover:text-red-400"
      >
        <Trash2 size={18} />
      </button>
    </div>
  </div>
);

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const serviceFee = 100;
  const taxRate = 0.05;

  const handleUpdateQuantity = (id, qty) => {
    if (qty < 1) return dispatch(removeFromCart(id));
    dispatch(updateQuantity({ id, quantity: qty }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const { subtotal, tax, total } = useMemo(() => {
    const sub = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const tax = sub * taxRate;
    return { subtotal: sub, tax, total: sub + tax + serviceFee };
  }, [cartItems]);



  const handlePlaceOrder = async () => {
    const confirmOrder = window.confirm(
      "Are you sure you want to place this order?"
    );
    if (!confirmOrder) return;
    try {
      // ✅ TABLE INFO FROM LOCAL STORAGE (QR SE AAYA)
      const activeTable = JSON.parse(localStorage.getItem("activeTable"));

      if (!activeTable) {
        alert("Please scan table QR first");
        return;
      }

      // ✅ PAYLOAD
      const payload = {
        tableNumber: activeTable.tableNumber,
        tableId: activeTable.tableId,
        items: cartItems
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/orders/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      // ❗ safety check
      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", text);
        alert("Order failed");
        return;
      }

      const data = await res.json();

      // console.log("ORDER RESPONSE:", data);
      // alert("Order placed successfully");

      // dispatch(clearCart());

      // localStorage.setItem("activeOrderId", data.order._id);

      // navigate("/track-order");
      // ✅ Show success toast
      toast.dismiss();
      toast.custom(
        (t) => <SuccessToast t={t} message="Order placed successfully" />,
        { duration: 2500 }
      );

      // ✅ Wait toast duration before clearing cart and redirect
      setTimeout(() => {
        dispatch(clearCart()); // Now cart clears after toast
        localStorage.setItem("activeOrderId", data.order._id);
        navigate("/track-order");
      }, 2500); // matches toast duration

    } catch (error) {
      console.error("Place Order Error:", error);
    }
  };



  return (
    <div className="min-h-screen p-4 bg-[#0a0600] text-white">
      <div className="max-w-4xl mx-auto bg-[#1c0e00] rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold flex items-center mb-4">
          <Utensils className="mr-2" /> Your Order
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-white/50 py-12">Cart is empty. Add some dishes!</p>
        ) : (
          <>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            {/* Billing */}
            <div className="mt-6 border-t border-[#6b3e1f] pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>{formatCurrency(serviceFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl text-[#fcd34d] mt-2">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="mt-4 w-1/3 bg-[#ca8a04] active:scale-95 hover:cursor-pointer py-3 rounded-lg font-bold text-black flex justify-center items-center hover:bg-yellow-600"
              >
                <ClipboardCheck className="mr-2" /> Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
