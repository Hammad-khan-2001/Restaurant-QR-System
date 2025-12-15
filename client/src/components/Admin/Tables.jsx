// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent } from "../ui/Card";
// import { Button } from "../ui/Button";
// import { Download, QrCode, Plus } from "lucide-react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";

// const Tables = () => {
//   const [tables, setTables] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [openAdd, setOpenAdd] = useState(false);
//   const [tableNumber, setTableNumber] = useState("");
//   const [capacity, setCapacity] = useState("");

//   // Fetch tables from backend
//   const fetchTables = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("/tables");
//       setTables(res.data?.data || []);
//     } catch (err) {
//       console.error("Fetch Tables Error:", err);
//       setTables([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create new table
//   const createTable = async () => {
//     try {
//       await axios.post("/tables", {
//         tableNumber,
//         capacity: Number(capacity),
//       });
//       setOpenAdd(false);
//       setTableNumber("");
//       setCapacity("");
//       fetchTables();
//     } catch (err) {
//       console.error("Create Table Error:", err);
//       alert(err.response?.data?.message || "Error creating table");
//     }
//   };

//   // Toggle table active/inactive
//   const toggleActive = async (id, current) => {
//     try {
//       await axios.put(`/tables/${id}`, { isActive: !current });
//       fetchTables();
//     } catch (err) {
//       console.error("Toggle Active Error:", err);
//     }
//   };

//   // Download QR code
//   const downloadQR = (base64, tableNumber) => {
//     const a = document.createElement("a");
//     a.href = base64;
//     a.download = `table-${tableNumber}-qr.png`;
//     a.click();
//   };

//   useEffect(() => {
//     fetchTables();
//   }, []);

//   if (loading)
//     return <p className="text-center mt-10 text-yellow-400">Loading Tables...</p>;

//   return (
//     <div className="p-6">
//       {/* Add Table Button */}
//       <div className="flex justify-end mb-4">
//         <Button onClick={() => setOpenAdd(true)} className="flex items-center gap-2">
//           <Plus size={18} /> Add Table
//         </Button>
//       </div>

//       {/* Table Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {(tables || []).map((t) => (
//           <Card key={t._id} className="shadow-xl rounded-2xl p-4 border border-gray-700">
//             <CardContent>
//               <h2 className="text-xl font-bold mb-2 text-yellow-400">Table #{t.tableNumber}</h2>

//               <div className="flex items-center gap-3 mb-3">
//                 <QrCode className="w-5 h-5" />
//                 <p className="text-sm truncate">Slug: {t.qrSlug}</p>
//               </div>

//               <img
//                 src={t.qrImage}
//                 alt="QR Code"
//                 className="w-32 h-32 object-contain mx-auto border p-2 rounded-xl mb-3"
//               />

//               <p className="text-sm mb-1">
//                 <strong>Capacity:</strong> {t.capacity}
//               </p>

//               <p className="text-sm mb-3">
//                 <strong>Status:</strong>{" "}
//                 <span className={t.isActive ? "text-green-400" : "text-red-400"}>
//                   {t.isActive ? "Active" : "Inactive"}
//                 </span>
//               </p>

//               <div className="flex justify-between items-center mt-4">
//                 <Button
//                   variant="outline"
//                   onClick={() => downloadQR(t.qrImage, t.tableNumber)}
//                   className="flex items-center gap-2"
//                 >
//                   <Download className="w-4 h-4" /> QR
//                 </Button>

//                 <Button onClick={() => toggleActive(t._id, t.isActive)}>
//                   {t.isActive ? "Deactivate" : "Activate"}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Add Table Dialog */}
//       <Dialog open={openAdd} onOpenChange={setOpenAdd}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Add New Table</DialogTitle>
//           </DialogHeader>

//           <div className="flex flex-col gap-4 mt-4">
//             <input
//               type="number"
//               placeholder="Table Number"
//               className="border rounded-lg p-2"
//               value={tableNumber}
//               onChange={(e) => setTableNumber(e.target.value)}
//             />

//             <input
//               type="number"
//               placeholder="Capacity"
//               className="border rounded-lg p-2"
//               value={capacity}
//               onChange={(e) => setCapacity(e.target.value)}
//             />

//             <Button className="mt-2" onClick={createTable}>
//               Create Table
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Tables;







import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Download, QrCode, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openAdd, setOpenAdd] = useState(false);
  const [tableNumber, setTableNumber] = useState("");
  const [capacity, setCapacity] = useState("");

  // ============= IMPORTANT FIX =============
  const api = axios.create({
    baseURL: "/api/v1",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  // ==========================================

  const fetchTables = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tables", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTables(res.data?.data || []);
    } catch (err) {
      console.error("Fetch Tables Error:", err);
      setTables([]);
    } finally {
      setLoading(false);
    }
  };


  const createTable = async () => {
    try {
      await api.post("/tables", {
        tableNumber,
        capacity: Number(capacity),
      });

      setOpenAdd(false);
      setTableNumber("");
      setCapacity("");
      fetchTables();
    } catch (err) {
      console.error("Create Table Error:", err);
      alert(err.response?.data?.message || "Error creating table");
    }
  };

  const toggleActive = async (id, current) => {
    try {
      await api.put(`/tables/${id}`, { isActive: !current });
      fetchTables();
    } catch (err) {
      console.error("Toggle Active Error:", err);
    }
  };

  const downloadQR = (base64, tableNumber) => {
    const a = document.createElement("a");
    a.href = base64;
    a.download = `table-${tableNumber}-qr.png`;
    a.click();
  };

  useEffect(() => {
    fetchTables();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-yellow-400">Loading Tables...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <Button onClick={() => setOpenAdd(true)} className="flex items-center gap-2">
          <Plus size={18} /> Add Table
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(tables || []).map((t) => (
          <Card key={t._id} className="shadow-xl rounded-2xl p-4 border border-gray-700">
            <CardContent>
              <h2 className="text-xl font-bold mb-2 text-yellow-400">Table #{t.tableNumber}</h2>

              <div className="flex items-center gap-3 mb-3">
                <QrCode className="w-5 h-5" />
                <p className="text-sm truncate">Slug: {t.qrSlug}</p>
              </div>

              <img
                src={t.qrImage}
                alt="QR Code"
                className="w-32 h-32 object-contain mx-auto border p-2 rounded-xl mb-3"
              />

              <p className="text-sm mb-1">
                <strong>Capacity:</strong> {t.capacity}
              </p>

              <p className="text-sm mb-3">
                <strong>Status:</strong>{" "}
                <span className={t.isActive ? "text-green-400" : "text-red-400"}>
                  {t.isActive ? "Active" : "Inactive"}
                </span>
              </p>

              <div className="flex justify-between items-center mt-4">
                <Button
                  variant="outline"
                  onClick={() => downloadQR(t.qrImage, t.tableNumber)}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> QR
                </Button>

                <Button onClick={() => toggleActive(t._id, t.isActive)}>
                  {t.isActive ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Table</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-4">
            <input
              type="number"
              placeholder="Table Number"
              className="border rounded-lg p-2"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />

            <input
              type="number"
              placeholder="Capacity"
              className="border rounded-lg p-2"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />

            <Button className="mt-2" onClick={createTable}>
              Create Table
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tables;
