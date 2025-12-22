// ABOUTME: Modal for reordering materials based on previous order
// ABOUTME: Pre-fills order details and allows editing before confirmation

import { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { Order, MATERIALS } from '../data/fakeData';

interface ReorderModalProps {
  order: Order;
  onClose: () => void;
  onConfirm: (orderData: {
    po?: string;
    material: string;
    tons: number;
    deliveryAddress: string;
    deliveryDate: string;
  }) => void;
}

export default function ReorderModal({ order, onClose, onConfirm }: ReorderModalProps) {
  const [po, setPo] = useState(order.po || '');
  const [material, setMaterial] = useState(order.material);
  const [tons, setTons] = useState(order.tons.toString());
  const [deliveryAddress, setDeliveryAddress] = useState(order.deliveryAddress);
  const [deliveryDate, setDeliveryDate] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onConfirm({
      po: po || undefined,
      material,
      tons: parseInt(tons),
      deliveryAddress,
      deliveryDate,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-black text-gray-900">Reorder Material</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <span className="font-bold">Original Order:</span> {order.id} from {order.date}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PO Number (optional)
            </label>
            <input
              type="text"
              value={po}
              onChange={(e) => setPo(e.target.value)}
              placeholder="e.g., PO-2024-001"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Material Type
            </label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {MATERIALS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity (tons)
            </label>
            <input
              type="number"
              min="3"
              max="200"
              value={tons}
              onChange={(e) => setTons(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <p className="text-xs text-gray-500 mt-1">Min: 3 tons, Max: 200 tons</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Address
            </label>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Date
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="border-t border-gray-200 pt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold transition-colors"
            >
              Confirm Reorder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
