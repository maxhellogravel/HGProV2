// ABOUTME: Order history page showing all past and current material orders
// ABOUTME: Searchable and filterable list with order details

import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { fakeOrders } from '../data/fakeData';

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = fakeOrders.filter(
    (order) =>
      order.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Order History</h1>
          <p className="text-gray-600 mt-1">View and track all your material orders</p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by order ID, material, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No orders found</p>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:border-orange-600 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-900 text-lg">{order.material}</h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            order.status === 'delivered'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'in-transit'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-black text-gray-900">${order.total.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{order.tons} tons</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Delivery Address:</p>
                    <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded text-sm font-medium">
                      Reorder
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
