// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent } from "../ui/Card";
// import { Button } from "../ui/Button";
// import { Trash2, RefreshCcw } from "lucide-react";

// const statusColors = {
//   pending: "text-yellow-400",
//   preparing: "text-blue-400",
//   served: "text-green-400",
//   completed: "text-gray-400",
//   cancelled: "text-red-400",
// };

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("/api/v1/orders"); // adjust route if needed
//       setOrders(res.data || []);
//     } catch (err) {
//       console.error("Fetch Orders Error:", err);
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     const interval = setInterval(() => {
//       fetchOrders();
//     }, 5000); // every 5 seconds
//     return () => clearInterval(interval);
//   }, []);

//   const updateStatus = async (id, newStatus) => {
//     try {
//       await axios.put(`/api/v1/orders/status/${id}`, { status: newStatus });
//       fetchOrders();
//     } catch (err) {
//       console.error("Update Status Error:", err);
//     }
//   };

//   const cancelOrder = async (id) => {
//     try {
//       await axios.put(`/api/v1/orders/cancel/${id}`);
//       fetchOrders();
//     } catch (err) {
//       console.error("Cancel Order Error:", err);
//     }
//   };

//   if (loading) return <p className="text-center text-yellow-400 mt-10">Loading Orders...</p>;

//   return (
//     <div className="p-6 bg-[#0a0600] min-h-screen">
//       <h1 className="text-3xl font-bold text-yellow-400 mb-6">Live Orders</h1>

//       {orders.length === 0 ? (
//         <p className="text-white/50 text-center py-12">No orders found</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {orders.map((order) => (
//             <Card key={order._id} className="rounded-2xl shadow-xl border border-gray-700 bg-[#1c0e00]">
//               <CardContent>
//                 <h2 className="text-xl font-bold mb-2 text-yellow-400">Table #{order.tableNumber}</h2>
//                 <p className="mb-2 text-white font-semibold">Status: <span className={statusColors[order.status]}>{order.status.toUpperCase()}</span></p>
//                 <p className="mb-2 text-white font-semibold">Total: ₹{order.totalAmount.toFixed(2)}</p>

//                 <div className="mb-3">
//                   <h3 className="text-white font-semibold mb-1">Items:</h3>
//                   <ul className="list-disc list-inside text-white/80 text-sm">
//                     {order.items.map((item) => (
//                       <li key={item.id}>{item.name} x {item.quantity} - ₹{(item.price * item.quantity).toFixed(2)}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="flex flex-wrap gap-2 mt-4">
//                   {order.status !== "completed" && order.status !== "cancelled" && (
//                     <>
//                       <Button
//                         onClick={() => updateStatus(order._id, "preparing")}
//                         className="bg-blue-500 hover:bg-blue-600 text-black min-w-[110px]"
//                       >
//                         Preparing
//                       </Button>
//                       <Button
//                         onClick={() => updateStatus(order._id, "served")}
//                         className="bg-green-500 hover:bg-green-600 text-black min-w-[100px]"
//                       >
//                         Served
//                       </Button>
//                       <Button
//                         onClick={() => updateStatus(order._id, "completed")}
//                         className="bg-gray-500 hover:bg-gray-600 text-black min-w-[110px]"
//                       >
//                         Complete
//                       </Button>
//                       <Button
//                         onClick={() => cancelOrder(order._id)}
//                         className="bg-red-600 hover:bg-red-700 text-black min-w-[100px]"
//                       >
//                         Cancel
//                       </Button>
//                     </>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;










// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent } from "../ui/Card";
// import { Button } from "../ui/Button";

// const statusColors = {
//   pending: "text-yellow-400",
//   preparing: "text-blue-400",
//   served: "text-green-400",
//   completed: "text-gray-400",
//   cancelled: "text-red-400",
// };

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ================= FETCH ORDERS =================
//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("/api/v1/orders");
//       setOrders(res.data || []);
//     } catch (err) {
//       console.error("Fetch Orders Error:", err);
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     const interval = setInterval(fetchOrders, 5000); // refresh every 5 sec
//     return () => clearInterval(interval);
//   }, []);

//   // ================= STATUS UPDATE =================
//   const updateStatus = async (id, newStatus) => {
//     try {
//       await axios.put(`/api/v1/orders/status/${id}`, { status: newStatus });
//       fetchOrders();
//     } catch (err) {
//       console.error("Update Status Error:", err);
//     }
//   };

//   const cancelOrder = async (id) => {
//     try {
//       await axios.put(`/api/v1/orders/cancel/${id}`);
//       fetchOrders();
//     } catch (err) {
//       console.error("Cancel Order Error:", err);
//     }
//   };

//   // ================= SPLIT LOGIC =================
//   const liveOrders = orders.filter(
//     o => o.status !== "completed" && o.status !== "cancelled"
//   );

//   const historyOrders = orders.filter(
//     o => o.status === "completed" || o.status === "cancelled"
//   );

// const groupedHistory = historyOrders.reduce((acc, order) => {
//   const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });

//   if (!acc[date]) acc[date] = [];
//   acc[date].push(order);
//   return acc;
// }, {});

//   if (loading)
//     return (
//       <p className="text-center text-yellow-400 mt-10">
//         Loading Orders...
//       </p>
//     );

//   return (
//     <div className="p-6 bg-[#0a0600] min-h-screen">

//       {/* ================= LIVE ORDERS ================= */}
//       <h1 className="text-3xl font-bold text-yellow-400 mb-6">
//         Live Orders
//       </h1>

//       {liveOrders.length === 0 ? (
//         <p className="text-white/50 text-center py-12">
//           No live orders
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {liveOrders.map(order => (
//             <Card
//               key={order._id}
//               className="rounded-2xl shadow-xl border border-gray-700 bg-[#1c0e00]"
//             >
//               <CardContent>
//                 <h2 className="text-xl font-bold mb-2 text-yellow-400">
//                   Table #{order.tableNumber}
//                 </h2>

//                 <p className="mb-2 text-white font-semibold">
//                   Status:{" "}
//                   <span className={statusColors[order.status]}>
//                     {order.status.toUpperCase()}
//                   </span>
//                 </p>

//                 <p className="mb-2 text-white font-semibold">
//                   Total: ₹{order.totalAmount.toFixed(2)}
//                 </p>

//                 <div className="mb-3">
//                   <h3 className="text-white font-semibold mb-1">
//                     Items:
//                   </h3>
//                   <ul className="list-disc list-inside text-white/80 text-sm">
//                     {order.items.map(item => (
//                       <li key={item.id}>
//                         {item.name} x {item.quantity}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="flex flex-wrap gap-2 mt-4">
//                   <Button
//                     onClick={() => updateStatus(order._id, "preparing")}
//                     className="bg-blue-500 hover:bg-blue-600 text-black min-w-[110px]"
//                   >
//                     Preparing
//                   </Button>

//                   <Button
//                     onClick={() => updateStatus(order._id, "served")}
//                     className="bg-green-500 hover:bg-green-600 text-black min-w-[100px]"
//                   >
//                     Served
//                   </Button>

//                   <Button
//                     onClick={() => updateStatus(order._id, "completed")}
//                     className="bg-gray-500 hover:bg-gray-600 text-black min-w-[110px]"
//                   >
//                     Complete
//                   </Button>

//                   <Button
//                     onClick={() => cancelOrder(order._id)}
//                     className="bg-red-600 hover:bg-red-700 text-black min-w-[100px]"
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* ================= ORDER HISTORY ================= */}
//       <div className="mt-20">
//         <h2 className="text-2xl font-bold text-yellow-400 mb-6">
//           Order History
//         </h2>

//         {Object.keys(groupedHistory).length === 0 ? (
//           <p className="text-white/50 text-center py-8">
//             No completed orders yet
//           </p>
//         ) : (
//           <div className="space-y-10">
//             {Object.entries(groupedHistory).map(([date, orders]) => (
//               <div key={date}>
//                 <h3 className="text-lg font-semibold text-white mb-4">
//                   📅 {date}
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {orders.map(order => (
//                     <Card
//                       key={order._id}
//                       className="rounded-2xl border border-gray-700 bg-[#140b02]"
//                     >
//                       <CardContent>
//                         <h4 className="text-lg font-bold text-yellow-400 mb-1">
//                           Table #{order.tableNumber}
//                         </h4>

//                         <p className="text-sm text-white mb-1">
//                           Status:{" "}
//                           <span className={statusColors[order.status]}>
//                             {order.status.toUpperCase()}
//                           </span>
//                         </p>

//                         <p className="text-sm text-white mb-2">
//                           Total: ₹{order.totalAmount.toFixed(2)}
//                         </p>

//                         <ul className="list-disc list-inside text-white/70 text-sm">
//                           {order.items.map(item => (
//                             <li key={item.id}>
//                               {item.name} x {item.quantity}
//                             </li>
//                           ))}
//                         </ul>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//     </div>
//   );
// };

// export default Orders;









import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Trash2 } from "lucide-react";

const statusColors = {
  pending: "text-yellow-400",
  preparing: "text-blue-400",
  served: "text-green-400",
  completed: "text-gray-400",
  cancelled: "text-red-400",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const safeOrders = Array.isArray(orders) ? orders : [];

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/orders`);
      // setOrders(res.data || []);
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch Orders Error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => {
      fetchOrders();
    }, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  // ================= UPDATE STATUS / CANCEL =================
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/orders/status/${id}`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      console.error("Update Status Error:", err);
    }
  };

  const cancelOrder = async (id) => {
    try {
      await axios.put(`/api/v1/orders/cancel/${id}`);
      fetchOrders();
    } catch (err) {
      console.error("Cancel Order Error:", err);
    }
  };

  if (loading)
    return (
      <p className="text-center text-yellow-400 mt-10">Loading Orders...</p>
    );

  // ================= DAILY SUMMARY =================
  const today = new Date().toDateString();
  const todaysCompletedOrders = safeOrders.filter(
    (o) =>
      o.status === "completed" &&
      new Date(o.createdAt).toDateString() === today
  );

  const todayRevenue = todaysCompletedOrders.reduce(
    (sum, o) => sum + o.totalAmount,
    0
  );
  const todayOrdersCount = todaysCompletedOrders.length;
  const averageOrderValue =
    todayOrdersCount > 0 ? todayRevenue / todayOrdersCount : 0;

  // ================= HISTORY ORDERS GROUPED BY DATE =================
  const historyOrders = safeOrders.filter(
    (o) => o.status === "completed" || o.status === "cancelled"
  );

  const groupedHistory = historyOrders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(order);
    return acc;
  }, {});

  return (
    <div className="p-6 bg-[#0a0600] min-h-screen">
      {/* ================= DAILY SUMMARY UI ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#1c0e00] border border-gray-700 rounded-2xl p-6 shadow-xl">
          <p className="text-white/60 text-sm mb-1">Today Revenue</p>
          <h2 className="text-3xl font-bold text-green-400">
            ₹{todayRevenue.toFixed(2)}
          </h2>
        </div>

        <div className="bg-[#1c0e00] border border-gray-700 rounded-2xl p-6 shadow-xl">
          <p className="text-white/60 text-sm mb-1">Orders Today</p>
          <h2 className="text-3xl font-bold text-yellow-400">
            {todayOrdersCount}
          </h2>
        </div>

        <div className="bg-[#1c0e00] border border-gray-700 rounded-2xl p-6 shadow-xl">
          <p className="text-white/60 text-sm mb-1">Avg Order Value</p>
          <h2 className="text-3xl font-bold text-blue-400">
            ₹{averageOrderValue.toFixed(2)}
          </h2>
        </div>
      </div>

      {/* ================= LIVE ORDERS ================= */}
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Live Orders</h1>
      {safeOrders.filter((o) => o.status !== "completed" && o.status !== "cancelled")
        .length === 0 ? (
        <p className="text-white/50 text-center py-12">No live orders</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {safeOrders
            .filter((o) => o.status !== "completed" && o.status !== "cancelled")
            .map((order) => (
              <Card
                key={order._id}
                className="rounded-2xl shadow-xl border border-gray-700 bg-[#1c0e00]"
              >
                <CardContent>
                  <h2 className="text-xl font-bold mb-2 text-yellow-400">
                    Table #{order.tableNumber}
                  </h2>
                  <p className="mb-2 text-white font-semibold">
                    Status:{" "}
                    <span className={statusColors[order.status]}>
                      {order.status.toUpperCase()}
                    </span>
                  </p>
                  <p className="mb-2 text-white font-semibold">
                    Total: ₹{Number(order.totalAmount || 0).toFixed(2)}
                  </p>

                  <div className="mb-3">
                    <h3 className="text-white font-semibold mb-1">Items:</h3>
                    <ul className="list-disc list-inside text-white/80 text-sm">
                      {(order.items || []).map((item) => (
                        <li key={item.id}>
                          {item.name} x {item.quantity} - ₹
                          {((Number(item.price) || 0) * (Number(item.quantity) || 0)).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button
                      onClick={() => updateStatus(order._id, "preparing")}
                      className="bg-blue-500 hover:bg-blue-600 text-black min-w-[110px]"
                    >
                      Preparing
                    </Button>
                    <Button
                      onClick={() => updateStatus(order._id, "served")}
                      className="bg-green-500 hover:bg-green-600 text-black min-w-[100px]"
                    >
                      Served
                    </Button>
                    <Button
                      onClick={() => updateStatus(order._id, "completed")}
                      className="bg-gray-500 hover:bg-gray-600 text-black min-w-[110px]"
                    >
                      Complete
                    </Button>
                    <Button
                      onClick={() => cancelOrder(order._id)}
                      className="bg-red-600 hover:bg-red-700 text-black min-w-[100px]"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      {/* ================= ORDER HISTORY DATE-WISE ================= */}
      {Object.keys(groupedHistory).length > 0 && (
        <>
          <h1 className="text-3xl font-bold text-yellow-400 mb-6">
            Order History
          </h1>
          {Object.entries(groupedHistory).map(([date, ordersForDate]) => (
            <div key={date} className="mb-8">
              <h2 className="text-xl font-bold text-white/80 mb-4">{date}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ordersForDate.map((order) => (
                  <Card
                    key={order._id}
                    className="rounded-2xl shadow-xl border border-gray-700 bg-[#1c0e00]"
                  >
                    <CardContent>
                      <h2 className="text-xl font-bold mb-2 text-yellow-400">
                        Table #{order.tableNumber}
                      </h2>
                      <p className="mb-2 text-white font-semibold">
                        Status:{" "}
                        <span className={statusColors[order.status]}>
                          {order.status.toUpperCase()}
                        </span>
                      </p>
                      <p className="mb-2 text-white font-semibold">
                        Total: ₹{Number(order.totalAmount || 0).toFixed(2)}
                      </p>

                      <div className="mb-3">
                        <h3 className="text-white font-semibold mb-1">Items:</h3>
                        <ul className="list-disc list-inside text-white/80 text-sm">
                          {(order.items || []).map((item) => (
                            <li key={item.id}>
                              {item.name} x {item.quantity} - ₹
                              {((Number(item.price) || 0) * (Number(item.quantity) || 0)).toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Orders;









// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent } from "../ui/Card";
// import { Button } from "../ui/Button";

// const statusColors = {
//   pending: "text-yellow-400",
//   preparing: "text-blue-400",
//   served: "text-green-400",
//   completed: "text-gray-400",
//   cancelled: "text-red-400",
// };

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ================= FETCH ORDERS =================
//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("/api/v1/orders");
//       setOrders(res.data || []);
//     } catch (err) {
//       console.error("Fetch Orders Error:", err);
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     const interval = setInterval(fetchOrders, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // ================= ORDER STATUS =================
//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(`/api/v1/orders/status/${id}`, { status });
//       fetchOrders();
//     } catch (err) {
//       console.error("Update Status Error:", err);
//     }
//   };

//   const cancelOrder = async (id) => {
//     try {
//       await axios.put(`/api/v1/orders/cancel/${id}`);
//       fetchOrders();
//     } catch (err) {
//       console.error("Cancel Order Error:", err);
//     }
//   };

//   // ================= PAYMENT =================
//   const setPaymentMethod = async (id, method) => {
//     try {
//       await axios.put(`/api/v1/orders/${id}/payment-method`, {
//         paymentMethod: method,
//       });
//       fetchOrders();
//     } catch (err) {
//       console.error("Payment Method Error:", err);
//     }
//   };

//   const markPaid = async (id) => {
//     try {
//       await axios.put(`/api/v1/orders/${id}/mark-paid`);
//       fetchOrders();
//     } catch (err) {
//       console.error("Mark Paid Error:", err);
//     }
//   };

//   if (loading) {
//     return (
//       <p className="text-center text-yellow-400 mt-10">
//         Loading Orders...
//       </p>
//     );
//   }

//   // ================= FILTERS =================
//   const liveOrders = orders.filter(
//     (o) => o.status !== "completed" && o.status !== "cancelled"
//   );

//   const historyOrders = orders.filter(
//     (o) =>
//       (o.status === "completed" && o.paymentStatus === "paid") ||
//       o.status === "cancelled"
//   );

//   return (
//     <div className="p-6 bg-[#0a0600] min-h-screen">

//       {/* ================= LIVE ORDERS ================= */}
//       <h1 className="text-3xl font-bold text-yellow-400 mb-6">
//         Live Orders
//       </h1>

//       {liveOrders.length === 0 ? (
//         <p className="text-white/50 text-center py-10">
//           No live orders
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
//           {liveOrders.map((order) => (
//             <Card
//               key={order._id}
//               className="rounded-2xl border border-gray-700 bg-[#1c0e00]"
//             >
//               <CardContent>
//                 <h2 className="text-xl font-bold text-yellow-400 mb-1">
//                   Table #{order.tableNumber}
//                 </h2>

//                 <p className="text-white font-semibold mb-1">
//                   Status:{" "}
//                   <span className={statusColors[order.status]}>
//                     {order.status.toUpperCase()}
//                   </span>
//                 </p>

//                 <p className="text-white font-semibold mb-1">
//                   Payment:{" "}
//                   <span
//                     className={
//                       order.paymentStatus === "paid"
//                         ? "text-green-400"
//                         : "text-red-400"
//                     }
//                   >
//                     {order.paymentStatus.toUpperCase()}
//                   </span>
//                 </p>

//                 <p className="text-white font-semibold mb-2">
//                   Total: ₹{order.totalAmount.toFixed(2)}
//                 </p>

//                 {/* ITEMS */}
//                 <ul className="list-disc list-inside text-white/80 text-sm mb-3">
//                   {order.items.map((item, i) => (
//                     <li key={i}>
//                       {item.name} × {item.quantity}
//                     </li>
//                   ))}
//                 </ul>

//                 {/* STATUS BUTTONS */}
//                 <div className="flex flex-wrap gap-2 mb-3">
//                   <Button
//                     onClick={() => updateStatus(order._id, "preparing")}
//                     className="bg-blue-500 text-black"
//                   >
//                     Preparing
//                   </Button>

//                   <Button
//                     onClick={() => updateStatus(order._id, "served")}
//                     className="bg-green-500 text-black"
//                   >
//                     Served
//                   </Button>

//                   <Button
//                     onClick={() => cancelOrder(order._id)}
//                     className="bg-red-600 text-black"
//                   >
//                     Cancel
//                   </Button>
//                 </div>

//                 {/* PAYMENT ACTIONS */}
//                 {order.paymentStatus === "unpaid" && (
//                   <div className="flex flex-wrap gap-2">
//                     <Button
//                       type="button"
//                       onClick={() => setPaymentMethod(order._id, "cash")}
//                       className="bg-yellow-500 text-black"
//                     >
//                       Cash
//                     </Button>

//                     <Button
//                       type="button"
//                       onClick={() => setPaymentMethod(order._id, "upi")}
//                       className="bg-blue-500 text-black"
//                     >
//                       UPI
//                     </Button>

//                     {order.paymentMethod && (
//                       <Button
//                         type="button"
//                         onClick={() => markPaid(order._id)}
//                         className="bg-green-600 text-black"
//                       >
//                         Mark Paid
//                       </Button>
//                     )}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* ================= HISTORY ================= */}
//       {historyOrders.length > 0 && (
//         <>
//           <h1 className="text-3xl font-bold text-yellow-400 mb-6">
//             Order History
//           </h1>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {historyOrders.map((order) => (
//               <Card
//                 key={order._id}
//                 className="rounded-2xl border border-gray-700 bg-[#1c0e00]"
//               >
//                 <CardContent>
//                   <h2 className="text-xl font-bold text-yellow-400 mb-1">
//                     Table #{order.tableNumber}
//                   </h2>

//                   <p className="text-white font-semibold">
//                     Status:{" "}
//                     <span className={statusColors[order.status]}>
//                       {order.status.toUpperCase()}
//                     </span>
//                   </p>

//                   <p className="text-green-400 font-semibold">
//                     Paid ({order.paymentMethod})
//                   </p>

//                   <p className="text-white mt-1">
//                     Total: ₹{order.totalAmount.toFixed(2)}
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Orders;
