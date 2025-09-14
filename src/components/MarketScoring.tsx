import React, { useState } from 'react';
import { Search, Filter, MapPin, TrendingUp, Users, Wifi, ShoppingBag, Truck } from 'lucide-react';
import { MarketScoringEngine } from '../utils/marketAnalytics';
import { sampleCityData } from '../utils/sampleData';

const MarketScoring = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');

  // Initialize scoring engine
  const scoringEngine = new MarketScoringEngine();

  // Calculate dynamic scores for all cities
  const cities = Object.values(sampleCityData).map(cityData => {
    const overallScore = scoringEngine.calculateOverallScore(cityData);
    const demographicsScore = Math.round(scoringEngine.calculateDemographicsScore(cityData.demographics));
    const digitalScore = Math.round(scoringEngine.calculateDigitalScore(cityData.digital));
    const competitionScore = Math.round(scoringEngine.calculateCompetitionScore(cityData.competition));
    const logisticsScore = Math.round(scoringEngine.calculateLogisticsScore(cityData.logistics));
    const economicScore = Math.round(scoringEngine.calculateEconomicScore(cityData.economic));
    
    const potential = overallScore >= 90 ? 'Very High' : 
                     overallScore >= 80 ? 'High' : 
                     overallScore >= 70 ? 'Medium' : 'Low';

    return {
      name: cityData.name,
      state: cityData.state,
      tier: cityData.tier,
      population: `${(cityData.population / 100000).toFixed(1)}L`,
      score: overallScore,
      demographics: demographicsScore,
      digital: digitalScore,
      competition: competitionScore,
      logistics: logisticsScore,
      economic: economicScore,
      potential
    };
  }).sort((a, b) => b.score - a.score); // Sort by score descending

  const states = ['all', ...new Set(cities.map(city => city.state))];
  const tiers = ['all', 'Tier 2', 'Tier 3'];

  const filteredCities = cities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         city.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'all' || city.state === selectedState;
    const matchesTier = selectedTier === 'all' || city.tier === selectedTier;
    
    return matchesSearch && matchesState && matchesTier;
  });

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getPotentialColor = (potential) => {
    switch (potential) {
      case 'Very High': return 'bg-green-100 text-green-800';
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Market Scoring Engine</h1>
            <p className="text-gray-600 mt-1">Comprehensive analysis of expansion opportunities across Tier 2/3 cities</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{filteredCities.length} cities analyzed</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search cities or states..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {states.map(state => (
              <option key={state} value={state}>
                {state === 'all' ? 'All States' : state}
              </option>
            ))}
          </select>
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {tiers.map(tier => (
              <option key={tier} value={tier}>
                {tier === 'all' ? 'All Tiers' : tier}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Scoring Methodology */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Scoring Methodology</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-medium text-sm">Demographics</div>
              <div className="text-xs text-gray-600">Age, Income, Education</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Wifi className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-medium text-sm">Digital Penetration</div>
              <div className="text-xs text-gray-600">Internet, Smartphone Usage</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-purple-600" />
            <div>
              <div className="font-medium text-sm">Competition</div>
              <div className="text-xs text-gray-600">Market Saturation</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Truck className="w-5 h-5 text-orange-600" />
            <div>
              <div className="font-medium text-sm">Logistics</div>
              <div className="text-xs text-gray-600">Connectivity, Infrastructure</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-red-600" />
            <div>
              <div className="font-medium text-sm">Economic</div>
              <div className="text-xs text-gray-600">GDP, Growth Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cities Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Score</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demographics</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Digital</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competition</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logistics</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Economic</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potential</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCities.map((city, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{city.name}</div>
                      <div className="text-sm text-gray-500">{city.state} • {city.tier}</div>
                      <div className="text-xs text-gray-400">Pop: {city.population}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(city.score)}`}>
                      {city.score}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${city.demographics}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{city.demographics}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${city.digital}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{city.digital}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${city.competition}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{city.competition}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full" 
                          style={{ width: `${city.logistics}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{city.logistics}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full" 
                          style={{ width: `${city.economic}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{city.economic}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPotentialColor(city.potential)}`}>
                      {city.potential}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketScoring;