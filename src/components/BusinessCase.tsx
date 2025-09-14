import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Calendar, Target, BarChart3, PieChart, Calculator } from 'lucide-react';
import { BusinessCaseCalculator, ChurnPreventionEngine } from '../utils/marketAnalytics';
import { sampleCityData } from '../utils/sampleData';

const BusinessCase = () => {
  const [selectedCity, setSelectedCity] = useState('Nashik');
  const [timeframe, setTimeframe] = useState('3-year');

  const cities = Object.keys(sampleCityData);
  const timeframes = ['1-year', '3-year', '5-year'];

  // Initialize calculation engines
  const businessCalculator = new BusinessCaseCalculator();
  const riskEngine = new ChurnPreventionEngine();

  // Get current city data
  const currentCityData = sampleCityData[selectedCity];
  const timeframeYears = parseInt(timeframe.split('-')[0]);
  
  // Calculate dynamic business metrics
  const businessMetrics = businessCalculator.calculateBusinessMetrics(currentCityData, timeframeYears);
  const riskAssessment = riskEngine.assessMarketRisk(currentCityData);
  
  // Format the data to match the existing structure
  const currentData = {
    investment: businessMetrics.investment,
    revenue: businessMetrics.revenue,
    metrics: {
      breakeven: businessMetrics.metrics.breakeven,
      roi: businessMetrics.metrics.roi,
      payback: businessMetrics.metrics.paybackPeriod,
      npv: businessMetrics.metrics.npv,
      irr: Math.round(businessMetrics.metrics.roi * 0.15) // Approximate IRR based on ROI
    },
    growth: {
      users: businessMetrics.projections.users,
      sellers: businessMetrics.projections.sellers,
      orders: businessMetrics.projections.orders,
      gmv: businessMetrics.projections.gmv
    },
    risks: riskAssessment.riskFactors
  };

  console.log(`Business case for ${selectedCity} (${timeframe}):`, currentData); // For debugging

  const getRiskColor = (level) => {
    switch (level) {
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
            <h1 className="text-2xl font-bold text-gray-900">Business Case Generator</h1>
            <p className="text-gray-600 mt-1">ROI analysis and financial projections for market expansion</p>
          </div>
          <div className="flex space-x-4">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {timeframes.map(tf => (
                <option key={tf} value={tf}>{tf.replace('-', ' ').toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-green-500 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{currentData.metrics.roi}%</div>
              <div className="text-sm text-gray-600">ROI</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{currentData.metrics.breakeven}</div>
              <div className="text-sm text-gray-600">Breakeven (Months)</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-purple-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">₹{currentData.metrics.npv}Cr</div>
              <div className="text-sm text-gray-600">NPV</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-orange-500 p-3 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{currentData.metrics.irr}%</div>
              <div className="text-sm text-gray-600">IRR</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="bg-red-500 p-3 rounded-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{currentData.metrics.payback}</div>
              <div className="text-sm text-gray-600">Payback (Years)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Investment Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Investment Breakdown</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Initial Setup</span>
              <span className="text-sm font-semibold">₹{currentData.investment.initial}Cr</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Marketing & Acquisition</span>
              <span className="text-sm font-semibold">₹{currentData.investment.marketing}Cr</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Logistics Infrastructure</span>
              <span className="text-sm font-semibold">₹{currentData.investment.logistics}Cr</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Technology & Systems</span>
              <span className="text-sm font-semibold">₹{currentData.investment.technology}Cr</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Operations</span>
              <span className="text-sm font-semibold">₹{currentData.investment.operations}Cr</span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Total Investment</span>
              <span className="text-xl font-bold text-blue-600">₹{currentData.investment.total}Cr</span>
            </div>
          </div>
        </div>

        {/* Revenue Projections */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Revenue Projections</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">Year 1</span>
              <span className="text-sm font-semibold text-green-700">₹{currentData.revenue.year1}Cr</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">Year 2</span>
              <span className="text-sm font-semibold text-green-700">₹{currentData.revenue.year2}Cr</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">Year 3</span>
              <span className="text-sm font-semibold text-green-700">₹{currentData.revenue.year3}Cr</span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Total Revenue (3 Years)</span>
              <span className="text-xl font-bold text-green-600">₹{currentData.revenue.total}Cr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Projections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Growth Trajectory</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="mb-4">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Users</h3>
            </div>
            <div className="space-y-2">
              {currentData.growth.users.map((value, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Year {index + 1}</span>
                  <span className="font-medium">{(value / 1000).toFixed(0)}K</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="mb-4">
              <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Sellers</h3>
            </div>
            <div className="space-y-2">
              {currentData.growth.sellers.map((value, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Year {index + 1}</span>
                  <span className="font-medium">{value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="mb-4">
              <PieChart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Orders</h3>
            </div>
            <div className="space-y-2">
              {currentData.growth.orders.map((value, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Year {index + 1}</span>
                  <span className="font-medium">{(value / 1000).toFixed(0)}K</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="mb-4">
              <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">GMV</h3>
            </div>
            <div className="space-y-2">
              {currentData.growth.gmv.map((value, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Year {index + 1}</span>
                  <span className="font-medium">₹{value}Cr</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Risk Assessment & Mitigation</h2>
        
        <div className="space-y-4">
          {currentData.risks.map((risk, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900">{risk.factor}</h3>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.probability)}`}>
                    {risk.probability} Probability
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.impact)}`}>
                    {risk.impact} Impact
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Mitigation:</span> {risk.mitigation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <h2 className="text-xl font-semibold mb-4">Executive Summary - {selectedCity} Expansion</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Investment Highlights</h3>
            <ul className="text-blue-100 text-sm space-y-1">
              <li>• Total investment: ₹{currentData.investment.total}Cr</li>
              <li>• Breakeven in {currentData.metrics.breakeven} months</li>
              <li>• Strong {currentData.metrics.roi}% ROI potential</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Market Opportunity</h3>
            <ul className="text-blue-100 text-sm space-y-1">
              <li>• {(currentData.growth.users[2] / 1000).toFixed(0)}K users by Year 3</li>
              <li>• ₹{currentData.revenue.total}Cr revenue potential</li>
              <li>• {currentData.growth.sellers[2].toLocaleString()} seller ecosystem</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Strategic Rationale</h3>
            <ul className="text-blue-100 text-sm space-y-1">
              <li>• First-mover advantage in Tier 2/3</li>
              <li>• Scalable business model</li>
              <li>• Strong unit economics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCase;