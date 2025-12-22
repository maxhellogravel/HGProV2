// ABOUTME: Account manager contact card displayed in dashboard
// ABOUTME: Provides quick access to contractor's dedicated Hello Gravel representative

import { Phone, Mail } from 'lucide-react';
import { fakeAccountManager } from '../data/fakeData';

export default function AccountManagerCard() {
  const manager = fakeAccountManager;

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Your Account Manager</h3>

      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
          {manager.photo}
        </div>

        <div className="flex-1">
          <p className="font-bold text-gray-900">{manager.name}</p>
          <p className="text-sm text-gray-600 mb-3">Sales Manager</p>

          <div className="space-y-2">
            <a
              href={`tel:${manager.phone}`}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-600"
            >
              <Phone className="w-4 h-4" />
              {manager.phone}
            </a>
            <a
              href={`mailto:${manager.email}`}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-600"
            >
              <Mail className="w-4 h-4" />
              {manager.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <a
          href={`tel:${manager.phone}`}
          className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded font-bold transition-colors"
        >
          Call Now
        </a>
      </div>
    </div>
  );
}
