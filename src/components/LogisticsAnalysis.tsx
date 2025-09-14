import React, { useState } from 'react';
import { Truck, MapPin, Clock, DollarSign, Package, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { sampleCityData } from '../utils/sampleData';

const LogisticsAnalysis = () => {
  const [selectedCity, setSelectedCity] = useState('Nashik');

  const cities = Object.keys(sampleCityData);

  // Calculate dynamic logistics data based on city characteristics
  const calculateLogisticsData = (cityData) => {
    const logisticsScore = (
      cityData.logistics.highwayConnectivity * 0.3 +
      cityData.logistics.railwayConnectivity * 0.25 +
      cityData.logistics.warehouseAvailability * 0.25 +
      cityData.logistics.lastMileInfrastructure * 0.2
    );

    // Calculate delivery times based on infrastructure
    const baseDeliveryTime = 4.5 - (logisticsScore / 100) * 2; // Better infrastructure = faster delivery
    const averageDeliveryTime = Math.max(1.5, baseDeliveryTime);
    
    const sameDayPercentage = Math.max(0, Math.round((logisticsScore - 60) * 0.8));
    const nextDayPercentage = Math.min(80, Math.round(logisticsScore * 0.7));
    const twoDayPlusPercentage = Math.max(0, 100 - sameDayPercentage - nextDayPercentage);

    // Calculate costs based on infrastructure and population density
    const populationDensity = cityData.population / 1000; // Simplified density calculation
    const baseCost = 70 - (logisticsScore / 100) * 20; // Better infrastructure = lower costs
    const densityAdjustment = Math.max(0.8, Math.min(1.3, 1000 / populationDensity));
    
    const lastMileCost = Math.round(baseCost * densityAdjustment);
    const warehousingCost = Math.round(lastMileCost * 0.2);
    const sortingCost = Math.round(lastMileCost * 0.15);
    const totalCost = lastMileCost + warehousingCost + sortingCost;

    // Performance metrics
    const deliverySuccess = Math.min(98, Math.round(75 + (logisticsScore / 100) * 23));
    const customerSatisfaction = Math.round((3.5 + (logisticsScore / 100) * 1.0) * 10) / 10;
    const returnRate = Math.max(2, Math.round(15 - (logisticsScore / 100) * 10));
    const damageRate = Math.max(0.5, Math.round(3 - (logisticsScore / 100) * 2.5));

    // Generate city-specific challenges
    const challenges = [];
    
    if (cityData.logistics.lastMileInfrastructure < 60) {
      challenges.push({
        issue: 'Last-mile connectivity challenges',
        severity: 'High',
        impact: 'Higher delivery costs and delays'
      });
    }
    
    if (cityData.logistics.warehouseAvailability < 50) {
      challenges.push({
        issue: 'Limited warehouse capacity',
        severity: 'Medium',
        impact: 'Storage and inventory challenges'
      });
    }
    
    if (cityData.state === 'Rajasthan') {
      challenges.push({
        issue: 'Desert logistics challenges',
        severity: 'Medium',
        impact: 'Route optimization needed'
      });
    }
    
    if (cityData.state === 'Chhattisgarh') {
      challenges.push({
        issue: 'Tribal area connectivity',
        severity: 'High',
        impact: 'Service gaps in remote areas'
      });
    }
    
    if (cityData.state === 'Punjab' || cityData.state === 'Uttar Pradesh') {
      challenges.push({
        issue: 'Seasonal demand fluctuations',
        severity: 'Medium',
        impact: 'Capacity planning challenges'
      });
    }

    return {
      deliveryTime: {
        average: Math.round(averageDeliveryTime * 10) / 10,
        sameDay: sameDayPercentage,
        nextDay: nextDayPercentage,
        twoDayPlus: twoDayPlusPercentage
      },
      costs: {
        lastMile: lastMileCost,
        warehousing: warehousingCost,
        sorting: sortingCost,
        total: totalCost
      },
      infrastructure: {
        highways: cityData.logistics.highwayConnectivity,
        railways: cityData.logistics.railwayConnectivity,
        airports: Math.round(cityData.logistics.highwayConnectivity * 0.8), // Approximate airport connectivity
        warehouses: Math.round(cityData.logistics.warehouseAvailability / 10),
        sortingCenters: Math.max(1, Math.round(cityData.logistics.warehouseAvailability / 25))
      },
      performance: {
        deliverySuccess,
        customerSatisfaction,
        returnRate,
        damageRate: Math.round(damageRate * 10) / 10
      },
      challenges
    };
  };

  // Get current city data and calculate logistics metrics
  const currentCityData = sampleCityData[selectedCity];
  const currentData = calculateLogisticsData(currentCityData);

  console.log(`Logistics data for ${selectedCity}:`, currentData); // For debugging

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Logistics & Fulfillment Analysis</h1>
            <p className="text-gray-600 mt-1">Comprehensive logistics feasibility and cost analysis</p>
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
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{currentData.deliveryTime.average}</div>
              <div className="text-sm text-gray-600">Avg Delivery Days</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-green-500 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">₹{currentData.costs.total}</div>
              <div className="text-sm text-gray-600">Cost per Order</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-purple-500 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{currentData.performance.deliverySuccess}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-orange-500 p-3 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{currentData.infrastructure.warehouses}</div>
              <div className="text-sm text-gray-600">Warehouses</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Delivery Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Delivery Performance</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Same Day Delivery</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${currentData.deliveryTime.sameDay}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-8">{currentData.deliveryTime.sameDay}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Next Day Delivery</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${currentData.deliveryTime.nextDay}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-8">{currentData.deliveryTime.nextDay}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">2+ Days</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full" 
                    style={{ width: `${currentData.deliveryTime.twoDayPlus}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-8">{currentData.deliveryTime.twoDayPlus}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-semibold text-green-800">{currentData.performance.customerSatisfaction}</div>
              <div className="text-sm text-green-600">Customer Rating</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-semibold text-blue-800">{currentData.performance.returnRate}%</div>
              <div className="text-sm text-blue-600">Return Rate</div>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Cost Structure</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Last Mile Delivery</span>
              </div>
              <span className="text-sm font-semibold">₹{currentData.costs.lastMile}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Warehousing</span>
              </div>
              <span className="text-sm font-semibold">₹{currentData.costs.warehousing}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">Sorting & Processing</span>
              </div>
              <span className="text-sm font-semibold">₹{currentData.costs.sorting}</span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Total Cost per Order</span>
              <span className="text-xl font-bold text-blue-600">₹{currentData.costs.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Infrastructure Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Infrastructure Assessment</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="text-2xl font-bold text-blue-600">{currentData.infrastructure.highways}</div>
            </div>
            <h3 className="font-medium text-gray-900">Highway Connectivity</h3>
            <p className="text-sm text-gray-600">Infrastructure Score</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
              <div className="text-2xl font-bold text-green-600">{currentData.infrastructure.railways}</div>
            </div>
            <h3 className="font-medium text-gray-900">Railway Network</h3>
            <p className="text-sm text-gray-600">Connectivity Score</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
              <div className="text-2xl font-bold text-purple-600">{currentData.infrastructure.airports}</div>
            </div>
            <h3 className="font-medium text-gray-900">Air Connectivity</h3>
            <p className="text-sm text-gray-600">Access Score</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center">
              <div className="text-2xl font-bold text-orange-600">{currentData.infrastructure.sortingCenters}</div>
            </div>
            <h3 className="font-medium text-gray-900">Sorting Centers</h3>
            <p className="text-sm text-gray-600">Available Facilities</p>
          </div>
        </div>
      </div>

      {/* Challenges & Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Challenges & Mitigation Strategies</h2>
        
        <div className="space-y-4">
          {currentData.challenges.map((challenge, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">{challenge.issue}</h3>
                    <p className="text-sm text-gray-600 mt-1">Impact: {challenge.impact}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(challenge.severity)}`}>
                  {challenge.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
        <h2 className="text-xl font-semibold mb-4">Logistics Strategy for {selectedCity}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Infrastructure Investment</h3>
            <ul className="text-green-100 text-sm space-y-1">
              <li>• Establish micro-fulfillment centers</li>
              <li>• Partner with local logistics providers</li>
              <li>• Invest in sorting automation</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Cost Optimization</h3>
            <ul className="text-green-100 text-sm space-y-1">
              <li>• Implement zone-based pricing</li>
              <li>• Optimize delivery routes</li>
              <li>• Bulk shipping agreements</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Service Enhancement</h3>
            <ul className="text-green-100 text-sm space-y-1">
              <li>• Real-time tracking system</li>
              <li>• Flexible delivery options</li>
              <li>• Local language support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticsAnalysis;