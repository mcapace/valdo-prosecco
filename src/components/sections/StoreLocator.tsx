'use client';

import { useState } from 'react';

interface Store {
  id: string;
  name: string;
  type: 'online' | 'retail';
  url?: string;
  address?: string;
  city?: string;
  state?: string;
  distance?: string;
}

export default function StoreLocator() {
  const [selectedType, setSelectedType] = useState<'online' | 'retail'>('online');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample store data - replace with real data
  const stores: Store[] = [
    // Online Partners
    {
      id: '1',
      name: 'Wine.com',
      type: 'online',
      url: 'https://www.wine.com'
    },
    {
      id: '2',
      name: 'Total Wine & More',
      type: 'online',
      url: 'https://www.totalwine.com'
    },
    {
      id: '3',
      name: 'Drizly',
      type: 'online',
      url: 'https://www.drizly.com'
    },
    {
      id: '4',
      name: 'Vivino',
      type: 'online',
      url: 'https://www.vivino.com'
    },
    // Retail Stores (sample data)
    {
      id: '5',
      name: 'Beverage Warehouse',
      type: 'retail',
      address: '123 Wine Street',
      city: 'Los Angeles',
      state: 'CA',
      distance: '0.5 miles'
    },
    {
      id: '6',
      name: 'Cork & Barrel',
      type: 'retail',
      address: '456 Vineyard Ave',
      city: 'San Francisco',
      state: 'CA',
      distance: '1.2 miles'
    },
    {
      id: '7',
      name: 'Wine Merchant',
      type: 'retail',
      address: '789 Prosecco Blvd',
      city: 'New York',
      state: 'NY',
      distance: '0.8 miles'
    }
  ];

  const filteredStores = stores.filter(store => {
    const matchesType = store.type === selectedType;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.city?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && (searchQuery === '' || matchesSearch);
  });

  const handleStoreClick = (store: Store) => {
    // Analytics tracking would go here

    if (store.url) {
      window.open(store.url, '_blank');
    }
  };

  const handleTypeChange = (type: 'online' | 'retail') => {
    setSelectedType(type);
    // Analytics tracking would go here
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-trajan text-4xl text-center mb-4">
          Where to Buy
        </h2>
        <p className="text-center text-gray-600 mb-12 font-raleway">
          Find Valdo Prosecco at your favorite retailers and online partners
        </p>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => handleTypeChange('online')}
              className={`px-6 py-3 rounded-md font-raleway font-medium transition-colors ${
                selectedType === 'online'
                  ? 'bg-[#D4AF37] text-black'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Online Partners
            </button>
            <button
              onClick={() => handleTypeChange('retail')}
              className={`px-6 py-3 rounded-md font-raleway font-medium transition-colors ${
                selectedType === 'retail'
                  ? 'bg-[#D4AF37] text-black'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Find Near You
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder={selectedType === 'online' ? 'Search online partners...' : 'Enter your city or zip code...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent font-raleway"
          />
        </div>

        {/* Store Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Store List */}
          <div>
            <h3 className="font-trajan text-2xl mb-6">
              {selectedType === 'online' ? 'Online Partners' : 'Nearby Stores'}
            </h3>
            
            <div className="space-y-4">
              {filteredStores.map((store, index) => (
                <div
                  key={store.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleStoreClick(store)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-raleway font-semibold text-lg mb-1">{store.name}</h4>
                      {store.type === 'retail' && (
                        <div className="text-gray-600 text-sm">
                          <p>{store.address}</p>
                          <p>{store.city}, {store.state}</p>
                          <p className="text-[#D4AF37] font-medium">{store.distance}</p>
                        </div>
                      )}
                    </div>
                    {store.type === 'online' && (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredStores.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No {selectedType === 'online' ? 'online partners' : 'stores'} found.</p>
                <p className="text-sm">Try adjusting your search criteria.</p>
              </div>
            )}
          </div>

          {/* Map Placeholder */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="font-raleway">Interactive Map</p>
                <p className="text-sm">Store locations will appear here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600 font-raleway mb-4">
            Can't find Valdo Prosecco near you?
          </p>
          <a 
            href="mailto:info@valdoprosecco.com" 
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#B8941F] transition-colors font-raleway font-medium"
          >
            <span>Contact us for assistance</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 