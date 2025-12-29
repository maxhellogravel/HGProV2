// ABOUTME: Order history page showing all past and current material orders
// ABOUTME: Searchable and filterable list with order details

import { useState, useRef, useEffect, useMemo } from 'react';
import { FileText, ChevronDown, ChevronRight } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import ReorderModal from '../components/ReorderModal';
import { fakeOrders, Order } from '../data/fakeData';

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [reorderingOrder, setReorderingOrder] = useState<Order | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openDocsMenu, setOpenDocsMenu] = useState<string | null>(null);
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set());
  const docsMenuRef = useRef<HTMLDivElement>(null);

  const filteredOrders = fakeOrders.filter(
    (order) =>
      order.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.jobName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group orders by job name
  const groupedOrders = useMemo(() => {
    const groups = new Map<string, Order[]>();
    const ungrouped: Order[] = [];

    filteredOrders.forEach(order => {
      if (order.jobName) {
        const existing = groups.get(order.jobName) || [];
        groups.set(order.jobName, [...existing, order]);
      } else {
        ungrouped.push(order);
      }
    });

    // Sort jobs by most recent order date
    const sortedGroups = Array.from(groups.entries()).sort((a, b) => {
      const aLatest = Math.max(...a[1].map(o => new Date(o.date).getTime()));
      const bLatest = Math.max(...b[1].map(o => new Date(o.date).getTime()));
      return bLatest - aLatest;
    });

    return { groups: sortedGroups, ungrouped };
  }, [filteredOrders]);

  const toggleJobExpanded = (jobName: string) => {
    setExpandedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobName)) {
        newSet.delete(jobName);
      } else {
        newSet.add(jobName);
      }
      return newSet;
    });
  };

  const handleReorder = (order: Order) => {
    setReorderingOrder(order);
  };

  const handleConfirmReorder = (orderData: {
    jobName?: string;
    material: string;
    tons: number;
    deliveryAddress: string;
    deliveryDate: string;
  }) => {
    setReorderingOrder(null);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleCloseModal = () => {
    setReorderingOrder(null);
  };

  const toggleDocsMenu = (orderId: string) => {
    setOpenDocsMenu(openDocsMenu === orderId ? null : orderId);
  };

  const handleDocumentAction = (orderId: string, docType: string) => {
    alert(`${docType} for order ${orderId} - Coming soon!`);
    setOpenDocsMenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (docsMenuRef.current && !docsMenuRef.current.contains(event.target as Node)) {
        setOpenDocsMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

          <div className="space-y-6">
            {filteredOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No orders found</p>
            ) : (
              <>
                {/* Grouped orders by job */}
                {groupedOrders.groups.map(([jobName, orders]) => {
                  const isExpanded = expandedJobs.has(jobName);
                  const totalOrders = orders.length;
                  const totalAmount = orders.reduce((sum, order) => sum + order.total, 0);

                  return (
                    <div key={jobName} className="border-2 border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleJobExpanded(jobName)}
                        className="w-full bg-gray-50 hover:bg-gray-100 px-6 py-4 flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                          )}
                          <div className="text-left">
                            <h3 className="font-bold text-gray-900 text-lg">{jobName}</h3>
                            <p className="text-sm text-gray-600">
                              {totalOrders} order{totalOrders !== 1 ? 's' : ''} • ${totalAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="bg-white p-4 space-y-4">
                          {orders.map((order) => (
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

                              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                                <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                                  View Details
                                </button>

                                <div className="relative w-full sm:w-auto" ref={openDocsMenu === order.id ? docsMenuRef : null}>
                                  <button
                                    onClick={() => toggleDocsMenu(order.id)}
                                    className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                                  >
                                    <FileText className="w-4 h-4" />
                                    Documents
                                    <ChevronDown className="w-4 h-4" />
                                  </button>

                                  {openDocsMenu === order.id && (
                                    <div className="absolute bottom-full sm:bottom-auto sm:top-full mb-2 sm:mb-0 sm:mt-2 left-0 right-0 sm:right-auto bg-white border border-gray-200 rounded-lg shadow-lg z-10 sm:min-w-[160px]">
                                      <button
                                        onClick={() => handleDocumentAction(order.id, 'Invoice')}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                                      >
                                        Invoice
                                      </button>
                                      <button
                                        onClick={() => handleDocumentAction(order.id, 'Receipt')}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                      >
                                        Receipt
                                      </button>
                                      <button
                                        disabled
                                        className="w-full text-left px-4 py-2 text-sm text-gray-400 bg-gray-50 rounded-b-lg cursor-not-allowed"
                                      >
                                        Spec Sheet <span className="text-xs">(Coming Soon)</span>
                                      </button>
                                    </div>
                                  )}
                                </div>

                                <button
                                  onClick={() => handleReorder(order)}
                                  className="w-full sm:w-auto px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded text-sm font-medium"
                                >
                                  Reorder
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Ungrouped orders */}
                {groupedOrders.ungrouped.length > 0 && (
                  <div className="space-y-4">
                    {groupedOrders.ungrouped.length > 1 && (
                      <h3 className="text-lg font-bold text-gray-700">Other Orders</h3>
                    )}
                    {groupedOrders.ungrouped.map((order) => (
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

                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                          <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                            View Details
                          </button>

                          <div className="relative w-full sm:w-auto" ref={openDocsMenu === order.id ? docsMenuRef : null}>
                            <button
                              onClick={() => toggleDocsMenu(order.id)}
                              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                            >
                              <FileText className="w-4 h-4" />
                              Documents
                              <ChevronDown className="w-4 h-4" />
                            </button>

                            {openDocsMenu === order.id && (
                              <div className="absolute bottom-full sm:bottom-auto sm:top-full mb-2 sm:mb-0 sm:mt-2 left-0 right-0 sm:right-auto bg-white border border-gray-200 rounded-lg shadow-lg z-10 sm:min-w-[160px]">
                                <button
                                  onClick={() => handleDocumentAction(order.id, 'Invoice')}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                                >
                                  Invoice
                                </button>
                                <button
                                  onClick={() => handleDocumentAction(order.id, 'Receipt')}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  Receipt
                                </button>
                                <button
                                  disabled
                                  className="w-full text-left px-4 py-2 text-sm text-gray-400 bg-gray-50 rounded-b-lg cursor-not-allowed"
                                >
                                  Spec Sheet <span className="text-xs">(Coming Soon)</span>
                                </button>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => handleReorder(order)}
                            className="w-full sm:w-auto px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded text-sm font-medium"
                          >
                            Reorder
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl z-50">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <p className="font-medium">Reorder submitted successfully!</p>
            </div>
          </div>
        )}
      </div>

      {reorderingOrder && (
        <ReorderModal
          order={reorderingOrder}
          onClose={handleCloseModal}
          onConfirm={handleConfirmReorder}
        />
      )}
    </DashboardLayout>
  );
}
