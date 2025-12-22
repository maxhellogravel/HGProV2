// ABOUTME: Billing and credit information page for contractor accounts
// ABOUTME: Displays credit limit, usage, balance, and payment history

import DashboardLayout from '../components/DashboardLayout';
import AccountManagerCard from '../components/AccountManagerCard';
import { fakeBillingInfo } from '../data/fakeData';

export default function Billing() {
  const billing = fakeBillingInfo;
  const creditAvailable = billing.creditLimit - billing.creditUsed;
  const creditUsagePercent = (billing.creditUsed / billing.creditLimit) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Billing & Credit</h1>
          <p className="text-gray-600 mt-1">Manage your account balance and credit</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <p className="text-sm font-medium text-gray-600 mb-2">Credit Limit</p>
                <p className="text-3xl font-black text-gray-900">${billing.creditLimit.toLocaleString()}</p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <p className="text-sm font-medium text-gray-600 mb-2">Available Credit</p>
                <p className="text-3xl font-black text-green-600">${creditAvailable.toLocaleString()}</p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <p className="text-sm font-medium text-gray-600 mb-2">Current Balance</p>
                <p className="text-3xl font-black text-gray-900">${billing.currentBalance.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-2">Due within 30 days</p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <p className="text-sm font-medium text-gray-600 mb-2">Last Payment</p>
                <p className="text-3xl font-black text-gray-900">${billing.lastPaymentAmount.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-2">{billing.lastPaymentDate}</p>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Credit Usage</h2>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">
                    ${billing.creditUsed.toLocaleString()} of ${billing.creditLimit.toLocaleString()} used
                  </span>
                  <span className="font-medium text-gray-700">{creditUsagePercent.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      creditUsagePercent > 80
                        ? 'bg-red-600'
                        : creditUsagePercent > 60
                        ? 'bg-yellow-500'
                        : 'bg-green-600'
                    }`}
                    style={{ width: `${creditUsagePercent}%` }}
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600">
                  Need to increase your credit limit?{' '}
                  <span className="font-medium text-orange-600">Contact your account manager</span>
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Methods</h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      💳
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Net 30 Terms</p>
                      <p className="text-sm text-gray-600">Pay by check or ACH within 30 days</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    Active
                  </span>
                </div>

                <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-orange-600 hover:text-orange-600 transition-colors">
                  + Add Payment Method
                </button>
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
