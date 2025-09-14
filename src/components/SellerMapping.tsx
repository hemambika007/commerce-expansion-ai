import React, { useState } from 'react';
import { Users, Store, TrendingUp, MapPin, Star } from 'lucide-react';
import { SellerSuccessPredictor, DemandForecastingEngine } from '../utils/marketAnalytics';
import { sampleCityData } from '../utils/sampleData';

const SellerMapping = () => {
  const [selectedCity, setSelectedCity] = useState('Nashik');

  const cities = Object.keys(sampleCityData);
  
  // Initialize prediction engines
  const sellerPredictor = new SellerSuccessPredictor();
  const demandEngine = new DemandForecastingEngine();

  // Get current city data
  const currentCityData = sampleCityData[selectedCity];
  
  // Calculate seller potential dynamically
  const sellerPotential = sellerPredictor.estimateSellerPotential(currentCityData);
  
  // Calculate category-wise demand
  const categories = ['Fashion & Apparel', 'Home & Kitchen', 'Electronics', 'Beauty & Personal Care', 'Sports & Fitness'];
  const categoryData = categories.map(category => {
    const demand = demandEngine.predictCategoryDemand(currentCityData, category);
    const sellers = sellerPotential.categoryBreakdown[category] || 0;
    const growth = `+${Math.round(demand.growthPotential / 3)}%`; // Normalize growth
    const avgRating = 3.8 + (demand.demandScore / 100) * 0.8; // Dynamic rating based on demand
    
    return {
      name: category,
      sellers,
      growth,
      avgRating: Math.round(avgRating * 10) / 10
    };
  });

  // Calculate dynamic seller data
  const totalSellers = sellerPotential.totalPotentialSellers;
  const activeSellers = Math.round(totalSellers * 0.7); // 70% activation rate
  
  // Generate demographics based on city data
  const demographics = {
    ageGroups: [
      { range: '18-25', percentage: Math.round(currentCityData.demographics.ageGroup18_35 * 0.6) },
      { range: '26-35', percentage: Math.round(currentCityData.demographics.ageGroup18_35 * 0.4) },
      { range: '36-45', percentage: currentCityData.demographics.ageGroup36_50 },
      { range: '46+', percentage: Math.max(5, 100 - currentCityData.demographics.ageGroup18_35 - currentCityData.demographics.ageGroup36_50) }
    ],
    businessTypes: [
      { type: 'Individual Sellers', percentage: sellerPotential.onboardingDifficulty === 'Easy' ? 50 : 65 },
      { type: 'Small Businesses', percentage: sellerPotential.onboardingDifficulty === 'Easy' ? 35 : 25 },
      { type: 'Established Retailers', percentage: sellerPotential.onboardingDifficulty === 'Easy' ? 15 : 10 }
    ]
  };

  // Generate top performers based on city characteristics
  const topPerformers = [
    { 
      name: `${selectedCity} Fashion Hub`, 
      category: 'Fashion', 
      rating: 4.2 + (currentCityData.digital.internetPenetration / 100) * 0.6, 
      orders: Math.round(totalSellers * 0.2) 
    },
    { 
      name: `${selectedCity} Home Store`, 
      category: 'Home & Kitchen', 
      rating: 4.1 + (currentCityData.economic.gdpPerCapita / 200000) * 0.7, 
      orders: Math.round(totalSellers * 0.18) 
    },
    { 
      name: `${selectedCity} Electronics`, 
      category: 'Electronics', 
      rating: 4.0 + (currentCityData.demographics.educationRate / 100) * 0.5, 
      orders: Math.round(totalSellers * 0.15) 
    }
  ].map(performer => ({
    ...performer,
    rating: Math.round(performer.rating * 10) / 10
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Seller Ecosystem Mapping</h1>
            <p className="text-gray-600 mt-1">Analyze seller potential and onboarding opportunities</p>
          </div>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{totalSellers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Sellers</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-green-500 p-3 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{activeSellers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Active Sellers</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-purple-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round((activeSellers / totalSellers) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Activation Rate</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-orange-500 p-3 rounded-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">4.3</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Category-wise Seller Distribution</h2>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-green-600 font-medium">{category.growth}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{category.avgRating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{category.sellers.toLocaleString()} sellers</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(category.sellers / totalSellers) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demographics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Seller Demographics</h2>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Age Distribution</h3>
            <div className="space-y-3">
              {demographics.ageGroups.map((group, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{group.range} years</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${group.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{group.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Business Types</h3>
            <div className="space-y-3">
              {demographics.businessTypes.map((type, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{type.type}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${type.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{type.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topPerformers.map((seller, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  index === 0 ? 'bg-yellow-100 text-yellow-800' :
                  index === 1 ? 'bg-gray-100 text-gray-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {index + 1}
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{seller.rating}</span>
                </div>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{seller.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{seller.category}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Monthly Orders</span>
                <span className="font-medium text-gray-900">{seller.orders.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Onboarding Strategy */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
        <h2 className="text-xl font-semibold mb-4">Seller Onboarding Strategy for {selectedCity}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Target Segments</h3>
            <ul className="text-green-100 text-sm space-y-1">
              <li>• {categoryData[0].name} retailers</li>
              <li>• {categoryData[1].name} suppliers</li>
              <li>• {demographics.businessTypes[0].type.toLowerCase()}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Acquisition Channels</h3>
            <ul className="text-green-100 text-sm space-y-1">
              <li>• Local business associations</li>
              <li>• {currentCityData.digital.socialMediaUsers > 35 ? 'Social media campaigns' : 'WhatsApp community groups'}</li>
              <li>• Referral programs</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Support Programs</h3>
            <ul className="text-green-100 text-sm space-y-1">
              <li>• {sellerPotential.onboardingDifficulty === 'Hard' ? 'Intensive digital training' : 'Local language support'}</li>
              <li>• Photography assistance</li>
              <li>• Digital marketing workshops</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerMapping;