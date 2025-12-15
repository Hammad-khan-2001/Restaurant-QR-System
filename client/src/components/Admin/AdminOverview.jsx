import React from 'react'
import { LogOut } from "lucide-react";

const AdminOverview = () => {
    return (
        <div>
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-8 bg-[#130d05] p-4 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold">Overview</h2>
                {/* Uncomment if you want admin info */}
                {/* <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Hammad (Admin)</span>
            <button className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700 transition">
              <LogOut size={18} /> Logout
            </button>
          </div> */}
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#130d05] p-6 rounded-2xl shadow-xl">
                    <h3 className="text-lg text-yellow-400">Monthly Orders</h3>
                    <p className="text-4xl font-bold mt-2">482</p>
                </div>
                <div className="bg-[#130d05] p-6 rounded-2xl shadow-xl">
                    <h3 className="text-lg text-yellow-400">Revenue</h3>
                    <p className="text-4xl font-bold mt-2">₹1,24,500</p>
                </div>
                <div className="bg-[#130d05] p-6 rounded-2xl shadow-xl">
                    <h3 className="text-lg text-yellow-400">Active Tables</h3>
                    <p className="text-4xl font-bold mt-2">14</p>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-[#130d05] p-6 rounded-2xl shadow-xl mt-8">
                <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Recent Orders</h3>
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-700 text-yellow-300">
                            <th className="py-3">Order ID</th>
                            <th>Table</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-800">
                            <td className="py-3">#1023</td>
                            <td>Table 5</td>
                            <td>₹850</td>
                            <td className="text-green-400">Completed</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                            <td className="py-3">#1022</td>
                            <td>Table 2</td>
                            <td>₹430</td>
                            <td className="text-yellow-400">Pending</td>
                        </tr>
                        <tr>
                            <td className="py-3">#1021</td>
                            <td>Table 7</td>
                            <td>₹620</td>
                            <td className="text-green-400">Completed</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminOverview