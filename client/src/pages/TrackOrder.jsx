// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent } from "../components/ui/Card";
// import { Button } from "../components/ui/Button";
// import { CheckCircle, Clock, CookingPot, CreditCard } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const statusSteps = ["pending", "preparing", "served", "completed"];

// const statusIcons = {
//     pending: <Clock className="text-yellow-400" />,
//     preparing: <CookingPot className="text-blue-400" />,
//     served: <CheckCircle className="text-green-400" />,
//     completed: <CheckCircle className="text-gray-400" />,
// };

// const TrackOrder = () => {
//     const [order, setOrder] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const navigate = useNavigate();
//     const orderId = localStorage.getItem("activeOrderId");

//     const fetchOrder = async () => {
//         if (!orderId) {
//             setLoading(false);
//             return;
//         }

//         try {
//             const res = await axios.get(`/api/v1/orders/${orderId}`);
//             setOrder(res.data);
//         } catch (err) {
//             console.error("Fetch Order Error:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchOrder();
//         const interval = setInterval(fetchOrder, 5000);
//         return () => clearInterval(interval);
//     }, []);

//     if (loading) {
//         return (
//             <p className="text-center text-yellow-400 mt-10">
//                 Loading your order...
//             </p>
//         );
//     }

//     if (!order) {
//         return (
//             <div className="min-h-screen bg-[#0a0600] p-6 flex justify-center">
//                 <p className="text-center text-red-400 mt-10">
//                     No active order found
//                 </p>
//             </div>

//         );
//     }

//     return (
//         <div className="min-h-screen bg-[#0a0600] p-6 flex justify-center">
//             <div className="max-w-2xl w-full space-y-6">

//                 {/* ================= HEADER ================= */}
//                 <Card className="bg-[#1c0e00] border border-gray-700 rounded-2xl shadow-xl">
//                     <CardContent>
//                         <h1 className="text-3xl font-bold text-yellow-400">
//                             Order Tracking
//                         </h1>
//                         <p className="text-white/60 mt-1">
//                             Table #{order.tableNumber}
//                         </p>
//                     </CardContent>
//                 </Card>

//                 {/* ================= STATUS ================= */}
//                 <Card className="bg-[#1c0e00] border border-gray-700 rounded-2xl shadow-xl">
//                     <CardContent>
//                         <h2 className="text-xl font-bold text-white mb-4">
//                             Order Status
//                         </h2>

//                         <div className="space-y-4">
//                             {statusSteps.map((step) => {
//                                 const active =
//                                     statusSteps.indexOf(step) <=
//                                     statusSteps.indexOf(order.status);

//                                 return (
//                                     <div
//                                         key={step}
//                                         className={`flex items-center gap-3 p-3 rounded-xl ${active
//                                             ? "bg-green-500/10 border border-green-500/40"
//                                             : "bg-white/5 border border-white/10"
//                                             }`}
//                                     >
//                                         {statusIcons[step]}
//                                         <p
//                                             className={`font-semibold ${active ? "text-green-400" : "text-white/40"
//                                                 }`}
//                                         >
//                                             {step.toUpperCase()}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </CardContent>
//                 </Card>

//                 {/* ================= ITEMS ================= */}
//                 <Card className="bg-[#1c0e00] border border-gray-700 rounded-2xl shadow-xl">
//                     <CardContent>
//                         <h2 className="text-xl font-bold text-white mb-4">
//                             Order Items
//                         </h2>

//                         <ul className="space-y-2">
//                             {order.items?.map((item, index) => (
//                                 <li
//                                     key={index}
//                                     className="flex justify-between text-white/80"
//                                 >
//                                     <span>
//                                         {item.name} × {item.quantity}
//                                     </span>
//                                     <span>
//                                         ₹{(item.price * item.quantity).toFixed(2)}
//                                     </span>
//                                 </li>
//                             ))}
//                         </ul>

//                         <div className="border-t border-white/10 mt-4 pt-4 flex justify-between text-lg font-bold text-yellow-400">
//                             <span>Total</span>
//                             <span>₹{order.totalAmount.toFixed(2)}</span>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 {/* ================= PAYMENT ================= */}
//                 {order.status === "served" && (
//                     <Card className="bg-[#1c0e00] border border-gray-700 rounded-2xl shadow-xl">
//                         <CardContent>
//                             <Button
//                                 className="w-full bg-green-500 hover:bg-green-600 text-black text-lg flex gap-2 justify-center"
//                                 onClick={() => navigate("/payment")}
//                             >
//                                 <CreditCard />
//                                 Pay Now
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 )}

//                 {order.status === "completed" && (
//                     <Card className="bg-[#1c0e00] border border-gray-700 rounded-2xl shadow-xl">
//                         <CardContent className="text-center">
//                             <CheckCircle className="mx-auto text-green-400 w-12 h-12 mb-2" />
//                             <h2 className="text-xl font-bold text-green-400">
//                                 Payment Completed
//                             </h2>
//                             <p className="text-white/60 mt-1">
//                                 Thank you for dining with us 🙏
//                             </p>

//                             <Button
//                                 className="mt-4"
//                                 onClick={() => {
//                                     localStorage.removeItem("activeOrderId");
//                                     navigate("/");
//                                 }}
//                             >
//                                 Back to Menu
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 )}

//             </div>
//         </div>
//     );
// };

// export default TrackOrder;






import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { CheckCircle, Clock, CookingPot, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusSteps = ["pending", "preparing", "served", "completed"];

const statusIcons = {
    pending: <Clock className="text-yellow-400" />,
    preparing: <CookingPot className="text-blue-400" />,
    served: <CheckCircle className="text-green-400" />,
    completed: <CheckCircle className="text-gray-400" />,
};

const TrackOrder = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [payLoading, setPayLoading] = useState(false); // 🔥 NEW

    const navigate = useNavigate();
    const orderId = localStorage.getItem("activeOrderId");

    const fetchOrder = async () => {
        if (!orderId) {
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/orders/${orderId}`);
            setOrder(res.data.order);
        } catch (err) {
            console.error("Fetch Order Error:", err);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 NEW: Handle Cash / UPI payment
    const handlePayment = async (mode) => {
        try {
            setPayLoading(true);

            await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/orders/status/${orderId}`, {
                status: "completed",
                paymentMode: mode,
            });

            localStorage.removeItem("activeOrderId");
            navigate("/");

        } catch (err) {
            console.error("Payment Error:", err);
            alert("Payment failed. Try again.");
        } finally {
            setPayLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
        const interval = setInterval(fetchOrder, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <p className="text-center text-yellow-400 mt-10">
                Loading your order...
            </p>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-[#0a0600] p-6 flex justify-center">
                <p className="text-center text-red-400 mt-10">
                    No active order found
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0600] p-6 flex justify-center">
            <div className="max-w-2xl w-full space-y-6">

                {/* HEADER */}
                <Card className="bg-[#1c0e00] border border-gray-700 rounded-2xl shadow-xl">
                    <CardContent>
                        <h1 className="text-3xl font-bold text-yellow-400">
                            Order Tracking
                        </h1>
                        <p className="text-white/60 mt-1">
                            Table #{order.tableNumber}
                        </p>
                    </CardContent>
                </Card>

                {/* STATUS */}
                <Card className="bg-[#1c0e00] border border-gray-700 rounded-2xl shadow-xl">
                    <CardContent>
                        <h2 className="text-xl font-bold text-white mb-4">
                            Order Status
                        </h2>

                        <div className="space-y-4">
                            {statusSteps.map((step) => {
                                const active =
                                    statusSteps.indexOf(step) <=
                                    statusSteps.indexOf(order.status);

                                return (
                                    <div
                                        key={step}
                                        className={`flex items-center gap-3 p-3 rounded-xl ${active
                                                ? "bg-green-500/10 border border-green-500/40"
                                                : "bg-white/5 border border-white/10"
                                            }`}
                                    >
                                        {statusIcons[step]}
                                        <p
                                            className={`font-semibold ${active
                                                    ? "text-green-400"
                                                    : "text-white/40"
                                                }`}
                                        >
                                            {step.toUpperCase()}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* ITEMS */}
                <Card className="bg-[#1c0e00] border border-gray-700 rounded-2xl shadow-xl">
                    <CardContent>
                        <h2 className="text-xl font-bold text-white mb-4">
                            Order Items
                        </h2>

                        <ul className="space-y-2">
                            {order.items?.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between text-white/80"
                                >
                                    <span>
                                        {item.name} × {item.quantity}
                                    </span>
                                    <span>
                                        ₹{((Number(item.price) || 0) * (Number(item.quantity) || 0)).toFixed(2)}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className="border-t border-white/10 mt-4 pt-4 flex justify-between text-lg font-bold text-yellow-400">
                            <span>Total</span>
                            <span>₹{Number(order.totalAmount || 0).toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* 🔥 PAYMENT OPTIONS */}
                {order.status === "served" && (
                    <Card className="bg-[#1c0e00] border border-gray-700 rounded-2xl shadow-xl">
                        <CardContent className="space-y-3">
                            <h2 className="text-lg font-bold text-white text-center">
                                Choose Payment Method
                            </h2>

                            <Button
                                disabled={payLoading}
                                className="w-full bg-green-500 hover:bg-green-600 text-black text-lg"
                                onClick={() => handlePayment("cash")}
                            >
                                💵 Pay by Cash
                            </Button>

                            <Button
                                disabled={payLoading}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-black text-lg"
                                onClick={() => handlePayment("upi")}
                            >
                                📱 Pay by UPI
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* COMPLETED */}
                {order.status === "completed" && (
                    <Card className="bg-[#1c0e00] border border-gray-700 rounded-2xl shadow-xl">
                        <CardContent className="text-center">
                            <CheckCircle className="mx-auto text-green-400 w-12 h-12 mb-2" />
                            <h2 className="text-xl font-bold text-green-400">
                                Payment Completed
                            </h2>
                            <p className="text-white/60 mt-1">
                                Thank you for dining with us 🙏
                            </p>
                        </CardContent>
                    </Card>
                )}

            </div>
        </div>
    );
};

export default TrackOrder;
