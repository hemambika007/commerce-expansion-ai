import React from 'react';
import { TrendingUp, Users, MapPin, Package, ArrowUpRight, ArrowDownRight, BarChart3, Target } from 'lucide-react';

const Dashboard = () => {
  const marketMetrics = [
    {
      title: 'High-Potential Cities',
      value: '47',
      change: '+12%',
      trend: 'up',
      icon: MapPin,
      color: 'blue'
    },
    {
      title: 'Addressable Market Size',
      value: '₹2,340 Cr',
      change: '+18%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Potential Sellers',
      value: '1.2M',
      change: '+25%',
      trend: 'up',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Category Opportunities',
      value: '23',
      change: '+5%',
      trend: 'up',
      icon: Package,
      color: 'orange'
    }
  ];

  const topCities = [
    { name: 'Nashik', state: 'Maharashtra', score: 94, population: '15.3L', digitalPen: '68%', competition: 'Medium' },
    { name: 'Rajkot', state: 'Gujarat', score: 91, population: '13.8L', digitalPen: '72%', competition: 'Low' },
    { name: 'Jalandhar', state: 'Punjab', score: 89, population: '8.7L', digitalPen: '75%', competition: 'Medium' },
    { name: 'Raipur', state: 'Chhattisgarh', score: 87, population: '10.4L', digitalPen: '61%', competition: 'Low' },
    { name: 'Jodhpur', state: 'Rajasthan', score: 85, population: '10.3L', digitalPen: '58%', competition: 'Low' }
  ];

  const categoryInsights = [
    { category: 'Fashion & Apparel', potential: 'High', growth: '+32%', competition: 'Medium' },
    { category: 'Home & Kitchen', potential: 'Very High', growth: '+45%', competition: 'Low' },
    { category: 'Electronics', potential: 'Medium', growth: '+18%', competition: 'High' },
    { category: 'Beauty & Personal Care', potential: 'High', growth: '+28%', competition: 'Medium' }
  ];

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const colorClasses = {
            blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
            green: 'bg-gradient-to-br from-green-500 to-green-600',
            purple: 'bg-gradient-to-br from-purple-500 to-purple-600',
            orange: 'bg-gradient-to-br from-orange-500 to-orange-600'
          };
          
          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className={`${colorClasses[metric.color]} p-3 rounded-xl shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span>{metric.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                <p className="text-sm text-gray-600 mt-1">{metric.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Priority Cities */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Priority Cities</h2>
            <span className="text-sm text-gray-500">Expansion Score</span>
          </div>
          <div className="space-y-4">
            {topCities.map((city, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 border border-gray-100 hover:border-indigo-200">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shadow-sm ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white' :
                        index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500 text-white' :
                        index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white' :
                        'bg-gradient-to-br from-blue-400 to-blue-500 text-white'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{city.name}</h3>
                      <p className="text-sm text-gray-500">{city.state}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center space-x-4 text-xs text-gray-600">
                    <span>Pop: {city.population}</span>
                    <span>Digital: {city.digitalPen}</span>
                    <span className={`px-2 py-1 rounded-full font-medium ${
                      city.competition === 'Low' ? 'bg-green-100 text-green-800' :
                      city.competition === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {city.competition} Competition
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{city.score}</div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Insights */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Category Opportunities</h2>
            <span className="text-sm text-gray-500">Growth Potential</span>
          </div>
          <div className="space-y-4">
            {categoryInsights.map((category, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{category.category}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    category.potential === 'Very High' ? 'bg-green-100 text-green-800' :
                    category.potential === 'High' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {category.potential}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <ArrowUpRight className="w-3 h-3 text-green-500" />
                    <span>Growth: {category.growth}</span>
                  </span>
                  <span>Competition: {category.competition}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className="space-y-8">
        {/* Methodology Section */}
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-8 text-white shadow-2xl border border-purple-500/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Strategic Intelligence Methodology
            </h2>
            <p className="text-slate-300 text-lg">How we decode market potential using advanced analytics and real-world data</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-blue-300">Demographics Score</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">Weighted analysis of population density, age distribution (18-45 focus), income levels, and education rates</p>
              <div className="text-xs text-slate-400 space-y-1">
                <div>• Census data + NSSO surveys</div>
                <div>• Income distribution analysis</div>
                <div>• Education penetration rates</div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-green-300">Digital Penetration</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">Internet usage rates, smartphone adoption, digital payment penetration, and social media engagement</p>
              <div className="text-xs text-slate-400 space-y-1">
                <div>• TRAI telecom data</div>
                <div>• UPI transaction volumes</div>
                <div>• Social media user base</div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-purple-300">Competition Analysis</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">Market saturation levels, existing e-commerce presence, local retail density, and competitive intensity</p>
              <div className="text-xs text-slate-400 space-y-1">
                <div>• E-commerce platform presence</div>
                <div>• Local retail mapping</div>
                <div>• Market share analysis</div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-orange-300">Logistics Infrastructure</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">Highway connectivity, railway networks, warehouse availability, and last-mile delivery feasibility</p>
              <div className="text-xs text-slate-400 space-y-1">
                <div>• Road & rail connectivity index</div>
                <div>• Warehouse density mapping</div>
                <div>• Delivery partner presence</div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-pink-300">Economic Indicators</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">GDP per capita, growth rates, industrial presence, employment levels, and purchasing power parity</p>
              <div className="text-xs text-slate-400 space-y-1">
                <div>• District GDP analysis</div>
                <div>• Industrial output data</div>
                <div>• Employment statistics</div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-indigo-300">Customer Satisfaction</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">Service quality expectations, delivery preferences, return behavior, and brand loyalty patterns</p>
              <div className="text-xs text-slate-400 space-y-1">
                <div>• Customer survey data</div>
                <div>• Service expectation mapping</div>
                <div>• Behavioral pattern analysis</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">Composite Scoring Algorithm</h3>
            <p className="text-slate-300 mb-4">Our proprietary algorithm weighs each factor based on e-commerce success correlation:</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">25%</div>
                <div className="text-slate-400">Digital Penetration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">20%</div>
                <div className="text-slate-400">Demographics</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">20%</div>
                <div className="text-slate-400">Competition</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">20%</div>
                <div className="text-slate-400">Logistics</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">15%</div>
                <div className="text-slate-400">Economic</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl border-4 border-yellow-400/30 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              🎯 HIGH IMPACT
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-400/10 rounded-full"></div>
          
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
            <Package className="w-8 h-8 text-yellow-400" />
            <span>Strategic Category Intelligence</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-yellow-300">🚀 Market Opportunity</h3>
              <p className="text-indigo-100 mb-3">
                Fashion & Home categories show 45% untapped potential in Tier 2 markets, with 3x lower competition than Tier 1 cities.
              </p>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-sm text-indigo-200">Addressable Market</div>
                <div className="text-xl font-bold text-yellow-300">₹2,340 Cr</div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-yellow-300">💡 Strategic Insight</h3>
              <p className="text-purple-100 mb-3">
                Seller adoption rates are 40% higher in Tier 2/3 cities due to limited alternatives and stronger community trust networks.
              </p>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-sm text-purple-200">CAC Advantage</div>
                <div className="text-xl font-bold text-yellow-300">60% Lower</div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-yellow-300">🎯 Action Plan</h3>
              <p className="text-pink-100 mb-3">
                Prioritize Nashik & Rajkot for Q1 2024 expansion with category-specific seller onboarding and localized assortment.
              </p>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-sm text-pink-200">Expected ROI</div>
                <div className="text-xl font-bold text-yellow-300">285%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;