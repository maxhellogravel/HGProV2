// ABOUTME: Main dashboard home page for authenticated contractors
// ABOUTME: Shows recent orders, quick actions, and account manager contact

import { Link } from 'react-router-dom';
import { FileText, Package, RefreshCw } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import AccountManagerCard from '../components/AccountManagerCard';
import { fakeOrders } from '../data/fakeData';

export default function Dashboard() {
  const recentOrders = fakeOrders.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Quick access to orders and account info</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/quote"
            className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-orange-600 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                <FileText className="w-6 h-6 text-orange-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">New Quote</h3>
                <p className="text-sm text-gray-600">Request pricing</p>
              </div>
            </div>
          </Link>

          <Link
            to="/orders"
            className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-orange-600 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                <Package className="w-6 h-6 text-orange-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Order History</h3>
                <p className="text-sm text-gray-600">View all orders</p>
              </div>
            </div>
          </Link>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Quick Reorder</h3>
                <p className="text-sm text-gray-600">Coming soon</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <Link to="/orders" className="text-sm font-medium text-orange-600 hover:text-orange-700">
                  View all →
                </Link>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-gray-900">{order.material}</p>
                        <p className="text-sm text-gray-600">{order.tons} tons</p>
                      </div>
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
                    <p className="text-sm text-gray-600 mb-2">{order.deliveryAddress}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{order.date}</span>
                      <span className="font-bold text-gray-900">${order.total.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <AccountManagerCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
