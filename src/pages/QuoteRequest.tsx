// ABOUTME: Quote request form for material pricing and delivery
// ABOUTME: Pre-fills user info and submits quote request to account manager

import { useState, FormEvent, useMemo } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AccountManagerCard from '../components/AccountManagerCard';
import { MATERIALS, fakeOrders } from '../data/fakeData';
import { useAuth } from '../contexts/AuthContext';

export default function QuoteRequest() {
  const { user } = useAuth();
  const [jobName, setJobName] = useState('');
  const [material, setMaterial] = useState(MATERIALS[0]);
  const [tons, setTons] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showJobSuggestions, setShowJobSuggestions] = useState(false);

  // Get unique job names with their last used address
  const existingJobs = useMemo(() => {
    const jobMap = new Map<string, string>();
    fakeOrders.forEach(order => {
      if (order.jobName) {
        jobMap.set(order.jobName, order.deliveryAddress);
      }
    });
    return Array.from(jobMap.entries()).map(([name, address]) => ({ name, address }));
  }, []);

  // Filter suggestions based on current input
  const filteredSuggestions = useMemo(() => {
    if (!jobName) return existingJobs;
    return existingJobs.filter(job =>
      job.name.toLowerCase().includes(jobName.toLowerCase())
    );
  }, [jobName, existingJobs]);

  const handleJobNameChange = (value: string) => {
    setJobName(value);
    setShowJobSuggestions(true);
  };

  const handleJobSelect = (job: { name: string; address: string }) => {
    setJobName(job.name);
    setDeliveryAddress(job.address);
    setShowJobSuggestions(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setJobName('');
      setMaterial(MATERIALS[0]);
      setTons('');
      setDeliveryAddress('');
      setDeliveryDate('');
      setNotes('');
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Request a Quote</h1>
          <p className="text-gray-600 mt-1">Get pricing for your next material delivery</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">Quote Request Submitted!</h2>
                  <p className="text-gray-600 mb-4">
                    Your account manager will contact you shortly with pricing.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Submit another quote →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Name (optional)
                    </label>
                    <input
                      type="text"
                      value={jobName}
                      onChange={(e) => handleJobNameChange(e.target.value)}
                      onFocus={() => setShowJobSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowJobSuggestions(false), 200)}
                      placeholder="e.g., Oak Street Driveway"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Name this job to group orders and speed up reorders</p>

                    {showJobSuggestions && filteredSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredSuggestions.map((job, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleJobSelect(job)}
                            className="w-full text-left px-3 py-2 hover:bg-orange-50 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-gray-900">{job.name}</div>
                            <div className="text-xs text-gray-500">{job.address}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                        placeholder="e.g., 25"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Min: 3 tons, Max: 200 tons</p>
                    </div>
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
                      placeholder="1234 Main St, City, State ZIP"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Delivery Date
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes (optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      placeholder="Site access instructions, special requirements, etc."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <p className="text-sm font-medium text-gray-700 mb-2">Quote will be sent to:</p>
                      <p className="text-sm text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-900">{user?.companyName}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                    >
                      Submit Quote Request
                    </button>
                  </div>
                </form>
              )}
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
