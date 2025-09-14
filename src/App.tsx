import React, { useState } from 'react';
import { MapPin, TrendingUp, Users, Package, BarChart3, Target, DollarSign, Truck } from 'lucide-react';
import Dashboard from './components/Dashboard';
import MarketScoring from './components/MarketScoring';
import SellerMapping from './components/SellerMapping';
import LogisticsAnalysis from './components/LogisticsAnalysis';
import BusinessCase from './components/BusinessCase';
import DataUpload from './components/DataUpload';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Market Overview', icon: BarChart3 },
    { id: 'scoring', label: 'City Scoring', icon: Target },
    { id: 'sellers', label: 'Seller Mapping', icon: Users },
    { id: 'logistics', label: 'Logistics Analysis', icon: Truck },
    { id: 'business', label: 'Business Case', icon: DollarSign },
    { id: 'upload', label: 'Data Intelligence', icon: Package },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'scoring':
        return <MarketScoring />;
      case 'sellers':
        return <SellerMapping />;
      case 'logistics':
        return <LogisticsAnalysis />;
      case 'business':
        return <BusinessCase />;
      case 'upload':
        return <DataUpload />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Market Expansion Intelligence
                </h1>
                <p className="text-sm text-gray-500">AI-Powered Tier 2/3 Market Analysis Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <span>500+ Cities Analyzed</span>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600 bg-indigo-50/50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-50 to-slate-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Built for strategic market expansion analysis • AI-powered insights for Tier 2/3 Indian markets
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <Package className="w-4 h-4" />
                <span>Next-Gen E-commerce Intelligence</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;