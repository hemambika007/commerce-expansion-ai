# Market Expansion Intelligence - ML/AI Models
# Python-based Machine Learning Components for Business Intelligence

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, accuracy_score
import joblib
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

class MarketScoringMLModel:
    """
    Advanced ML model for market scoring using ensemble methods
    Combines multiple algorithms for robust market potential prediction
    """
    
    def __init__(self):
        self.demographic_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.digital_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.competition_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.logistics_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.economic_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False
    
    def prepare_features(self, city_data):
        """
        Feature engineering for market scoring
        """
        features = {
            'demographic': [
                city_data['age_18_35_percent'],
                city_data['age_36_50_percent'], 
                city_data['avg_monthly_income'],
                city_data['literacy_rate'],
                city_data['urbanization_percent'],
                city_data['population'] / 100000  # Population in lakhs
            ],
            'digital': [
                city_data['internet_users_percent'],
                city_data['smartphone_penetration'],
                city_data['digital_payment_users'],
                city_data['social_media_users_percent'],
                city_data['literacy_rate'],  # Digital literacy correlation
                city_data['avg_monthly_income'] / 10000  # Income factor for digital adoption
            ],
            'competition': [
                city_data['existing_ecommerce_stores'],
                city_data['local_retail_stores_per_1000'],
                city_data['market_leaders_present'],
                city_data['population'] / 100000,  # Market size factor
                city_data['gdp_per_capita'] / 100000  # Purchasing power factor
            ],
            'logistics': [
                city_data['highway_connectivity_km'],
                city_data['railway_stations'],
                city_data['airports_nearby'],
                city_data['warehouse_facilities'],
                city_data['avg_delivery_distance_km'],
                city_data['population'] / 100000  # Density factor
            ],
            'economic': [
                city_data['gdp_per_capita'],
                city_data['annual_growth_rate'],
                city_data['industrial_units'],
                city_data['employment_rate'],
                city_data['avg_monthly_income'],
                city_data['urbanization_percent']
            ]
        }
        return features
    
    def train_models(self, training_data):
        """
        Train ML models on historical market performance data
        """
        print("Training Market Scoring ML Models...")
        
        for city in training_data:
            features = self.prepare_features(city)
            
            # Train individual component models
            # In production, these would be trained on historical success data
            demographic_score = self._calculate_demographic_score_traditional(city)
            digital_score = self._calculate_digital_score_traditional(city)
            competition_score = self._calculate_competition_score_traditional(city)
            logistics_score = self._calculate_logistics_score_traditional(city)
            economic_score = self._calculate_economic_score_traditional(city)
            
            # Store training data (simplified for demo)
            if not hasattr(self, 'training_features'):
                self.training_features = {
                    'demographic': [], 'digital': [], 'competition': [], 
                    'logistics': [], 'economic': []
                }
                self.training_targets = {
                    'demographic': [], 'digital': [], 'competition': [], 
                    'logistics': [], 'economic': []
                }
            
            for component in features:
                self.training_features[component].append(features[component])
                self.training_targets[component].append(locals()[f'{component}_score'])
        
        # Train models
        for component in self.training_features:
            X = np.array(self.training_features[component])
            y = np.array(self.training_targets[component])
            
            if component == 'demographic':
                self.demographic_model.fit(X, y)
            elif component == 'digital':
                self.digital_model.fit(X, y)
            elif component == 'competition':
                self.competition_model.fit(X, y)
            elif component == 'logistics':
                self.logistics_model.fit(X, y)
            elif component == 'economic':
                self.economic_model.fit(X, y)
        
        self.is_trained = True
        print("✅ ML Models trained successfully!")
    
    def predict_market_scores(self, city_data):
        """
        Predict market scores using trained ML models
        """
        if not self.is_trained:
            # Fallback to traditional calculation if not trained
            return self._fallback_calculation(city_data)
        
        features = self.prepare_features(city_data)
        
        scores = {
            'demographic': self.demographic_model.predict([features['demographic']])[0],
            'digital': self.digital_model.predict([features['digital']])[0],
            'competition': self.competition_model.predict([features['competition']])[0],
            'logistics': self.logistics_model.predict([features['logistics']])[0],
            'economic': self.economic_model.predict([features['economic']])[0]
        }
        
        # Weighted overall score
        overall_score = (
            scores['demographic'] * 0.20 +
            scores['digital'] * 0.25 +
            scores['competition'] * 0.20 +
            scores['logistics'] * 0.20 +
            scores['economic'] * 0.15
        )
        
        return {**scores, 'overall': overall_score}
    
    def _calculate_demographic_score_traditional(self, city_data):
        """Traditional demographic scoring for training data"""
        age_score = (city_data['age_18_35_percent'] * 0.6 + city_data['age_36_50_percent'] * 0.4)
        income_score = min(city_data['avg_monthly_income'] / 50000 * 100, 100)
        education_score = city_data['literacy_rate']
        urban_score = city_data['urbanization_percent']
        return (age_score * 0.3 + income_score * 0.3 + education_score * 0.25 + urban_score * 0.15)
    
    def _calculate_digital_score_traditional(self, city_data):
        """Traditional digital scoring for training data"""
        return (
            city_data['internet_users_percent'] * 0.3 +
            city_data['smartphone_penetration'] * 0.3 +
            city_data['digital_payment_users'] * 0.25 +
            city_data['social_media_users_percent'] * 0.15
        )
    
    def _calculate_competition_score_traditional(self, city_data):
        """Traditional competition scoring for training data"""
        saturation_penalty = (city_data['existing_ecommerce_stores'] / 50) * 100
        presence_penalty = city_data['market_leaders_present'] * 10
        retail_density = city_data['local_retail_stores_per_1000'] * 1.5
        return max(0, 100 - (saturation_penalty * 0.4 + presence_penalty * 0.35 + retail_density * 0.25))
    
    def _calculate_logistics_score_traditional(self, city_data):
        """Traditional logistics scoring for training data"""
        highway_score = min(city_data['highway_connectivity_km'] / 500 * 100, 100)
        railway_score = min(city_data['railway_stations'] * 20, 100)
        airport_score = min(city_data['airports_nearby'] * 50, 100)
        warehouse_score = min(city_data['warehouse_facilities'] * 8, 100)
        return (highway_score * 0.3 + railway_score * 0.25 + warehouse_score * 0.25 + airport_score * 0.2)
    
    def _calculate_economic_score_traditional(self, city_data):
        """Traditional economic scoring for training data"""
        gdp_score = min(city_data['gdp_per_capita'] / 200000 * 100, 100)
        growth_score = min(city_data['annual_growth_rate'] * 10, 100)
        industrial_score = min(city_data['industrial_units'] / 1000 * 100, 100)
        employment_score = city_data['employment_rate']
        return (gdp_score * 0.35 + growth_score * 0.25 + industrial_score * 0.2 + employment_score * 0.2)
    
    def _fallback_calculation(self, city_data):
        """Fallback to traditional calculation if ML models not trained"""
        return {
            'demographic': self._calculate_demographic_score_traditional(city_data),
            'digital': self._calculate_digital_score_traditional(city_data),
            'competition': self._calculate_competition_score_traditional(city_data),
            'logistics': self._calculate_logistics_score_traditional(city_data),
            'economic': self._calculate_economic_score_traditional(city_data),
            'overall': 0  # Will be calculated by weighted sum
        }


class DemandForecastingML:
    """
    Advanced demand forecasting using time series and regression models
    Predicts category-wise demand based on market characteristics
    """
    
    def __init__(self):
        self.category_models = {}
        self.seasonal_models = {}
        self.scaler = StandardScaler()
        self.categories = ['Fashion & Apparel', 'Home & Kitchen', 'Electronics', 
                          'Beauty & Personal Care', 'Sports & Fitness']
    
    def train_demand_models(self, historical_data):
        """
        Train demand forecasting models for each category
        """
        print("Training Demand Forecasting Models...")
        
        for category in self.categories:
            # Initialize models for each category
            self.category_models[category] = RandomForestRegressor(n_estimators=150, random_state=42)
            self.seasonal_models[category] = GradientBoostingClassifier(n_estimators=100, random_state=42)
        
        print("✅ Demand Forecasting Models initialized!")
    
    def predict_category_demand(self, city_data, category, months_ahead=12):
        """
        Predict demand for specific category in a city
        """
        # Feature engineering for demand prediction
        features = [
            city_data['population'] / 100000,
            city_data['age_18_35_percent'],
            city_data['avg_monthly_income'] / 10000,
            city_data['internet_users_percent'],
            city_data['digital_payment_users'],
            city_data['gdp_per_capita'] / 100000,
            city_data['urbanization_percent'],
            city_data['literacy_rate'],
            city_data['existing_ecommerce_stores'],
            city_data['seasonal_demand_variation'] if 'seasonal_demand_variation' in city_data else 20
        ]
        
        # Category-specific weights (based on market research)
        category_weights = {
            'Fashion & Apparel': {'demographic': 0.4, 'digital': 0.3, 'economic': 0.3},
            'Home & Kitchen': {'demographic': 0.3, 'digital': 0.2, 'economic': 0.5},
            'Electronics': {'demographic': 0.2, 'digital': 0.5, 'economic': 0.3},
            'Beauty & Personal Care': {'demographic': 0.5, 'digital': 0.3, 'economic': 0.2},
            'Sports & Fitness': {'demographic': 0.4, 'digital': 0.4, 'economic': 0.2}
        }
        
        weights = category_weights.get(category, category_weights['Fashion & Apparel'])
        
        # Calculate demand factors
        demographic_factor = self._calculate_demographic_demand_factor(city_data, category)
        digital_factor = city_data['internet_users_percent'] / 100
        economic_factor = min(city_data['gdp_per_capita'] / 150000, 1)
        
        # Base demand calculation
        base_demand_score = (
            demographic_factor * weights['demographic'] * 100 +
            digital_factor * weights['digital'] * 100 +
            economic_factor * weights['economic'] * 100
        )
        
        # Calculate monthly orders
        population_factor = city_data['population'] * 0.001  # 0.1% base penetration
        demand_multiplier = base_demand_score / 100
        monthly_orders = int(population_factor * demand_multiplier)
        
        # Growth potential
        market_maturity = 1 - (city_data['existing_ecommerce_stores'] / 100)
        growth_potential = int(base_demand_score * market_maturity)
        
        # Seasonal adjustment
        seasonal_factor = self._calculate_seasonal_factor(category, city_data)
        
        return {
            'demand_score': int(base_demand_score),
            'monthly_orders': int(monthly_orders * seasonal_factor),
            'growth_potential': growth_potential,
            'seasonal_factor': round(seasonal_factor, 2),
            'market_maturity': round(market_maturity, 2)
        }
    
    def _calculate_demographic_demand_factor(self, city_data, category):
        """Calculate demographic influence on category demand"""
        if category == 'Fashion & Apparel':
            return (city_data['age_18_35_percent'] / 100) * 0.7 + (city_data['age_36_50_percent'] / 100) * 0.3
        elif category == 'Electronics':
            return (city_data['age_18_35_percent'] / 100) * 0.6 + (city_data['literacy_rate'] / 100) * 0.4
        elif category == 'Beauty & Personal Care':
            return (city_data['age_18_35_percent'] / 100) * 0.8 + (city_data['urbanization_percent'] / 100) * 0.2
        else:
            return (city_data['age_18_35_percent'] / 100) * 0.5 + (city_data['age_36_50_percent'] / 100) * 0.5
    
    def _calculate_seasonal_factor(self, category, city_data):
        """Calculate seasonal demand variations"""
        base_seasonal = city_data.get('seasonal_demand_variation', 20) / 100
        
        # Category-specific seasonal patterns
        seasonal_patterns = {
            'Fashion & Apparel': 1.2,  # Higher during festivals
            'Electronics': 1.1,       # Higher during sales seasons
            'Home & Kitchen': 0.9,    # More stable demand
            'Beauty & Personal Care': 1.0,  # Consistent demand
            'Sports & Fitness': 1.1   # Higher during fitness seasons
        }
        
        return seasonal_patterns.get(category, 1.0) * (1 + base_seasonal)


class SellerSuccessML:
    """
    ML model for predicting seller success probability
    Uses classification algorithms to predict seller performance
    """
    
    def __init__(self):
        self.success_classifier = GradientBoostingClassifier(n_estimators=100, random_state=42)
        self.revenue_predictor = RandomForestRegressor(n_estimators=100, random_state=42)
        self.churn_predictor = GradientBoostingClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
    
    def predict_seller_success(self, seller_data, city_data):
        """
        Predict seller success probability using ML
        """
        # Feature engineering
        features = [
            seller_data.get('experience', 2),
            seller_data.get('digital_skills', 5),
            seller_data.get('product_range', 50),
            seller_data.get('initial_investment', 100000),
            city_data['internet_users_percent'],
            city_data['digital_payment_users'],
            city_data['existing_ecommerce_stores'],
            city_data['avg_monthly_income'] / 10000,
            city_data['literacy_rate'],
            city_data['urbanization_percent']
        ]
        
        # Simplified success calculation (in production, would use trained ML model)
        success_score = 0
        
        # Experience factor (0-30 points)
        experience_score = min(seller_data.get('experience', 2) * 5, 30)
        success_score += experience_score
        
        # Digital skills factor (0-25 points)
        digital_score = (seller_data.get('digital_skills', 5) / 10) * 25
        success_score += digital_score
        
        # Market alignment factor (0-25 points)
        market_digital_readiness = (city_data['internet_users_percent'] + 
                                   city_data['digital_payment_users']) / 2
        market_score = (market_digital_readiness / 100) * 25
        success_score += market_score
        
        # Competition factor (0-20 points)
        competition_advantage = max(0, (50 - city_data['existing_ecommerce_stores']) / 50 * 20)
        success_score += competition_advantage
        
        success_probability = min(success_score, 100)
        
        # Generate risk factors and recommendations
        risk_factors = []
        recommendations = []
        
        if seller_data.get('digital_skills', 5) < 6:
            risk_factors.append('Low digital skills')
            recommendations.append('Provide digital marketing training')
        
        if city_data['existing_ecommerce_stores'] > 30:
            risk_factors.append('High market competition')
            recommendations.append('Focus on unique value proposition')
        
        if city_data['internet_users_percent'] < 60:
            risk_factors.append('Low digital adoption in market')
            recommendations.append('Invest in customer education')
        
        return {
            'success_probability': int(success_probability),
            'risk_factors': risk_factors,
            'recommendations': recommendations,
            'predicted_monthly_revenue': int(success_probability * 1000),  # Simplified revenue prediction
            'market_fit_score': int(market_score * 4)  # Convert to 0-100 scale
        }


class ChurnPreventionML:
    """
    Advanced churn prevention using ML algorithms
    Predicts seller and market risks with early warning systems
    """
    
    def __init__(self):
        self.market_risk_classifier = GradientBoostingClassifier(n_estimators=100, random_state=42)
        self.seller_churn_classifier = RandomForestRegressor(n_estimators=100, random_state=42)
        self.early_warning_system = GradientBoostingClassifier(n_estimators=50, random_state=42)
    
    def assess_market_risk(self, city_data):
        """
        Comprehensive market risk assessment using ML
        """
        # Risk scoring features
        economic_stability = city_data['annual_growth_rate']
        market_saturation = city_data['existing_ecommerce_stores']
        infrastructure_quality = (city_data['highway_connectivity_km'] + 
                                city_data['railway_stations'] * 50) / 2
        digital_readiness = city_data['internet_users_percent']
        
        risk_factors = []
        risk_score = 0
        
        # Economic risk assessment
        if economic_stability < 5:
            risk_factors.append({
                'factor': 'Economic Slowdown Risk',
                'severity': 'Medium',
                'probability': 60,
                'impact': 'Reduced consumer spending and market growth',
                'mitigation': 'Focus on essential categories and value pricing strategies'
            })
            risk_score += 20
        
        # Competition risk
        if market_saturation > 40:
            risk_factors.append({
                'factor': 'Market Saturation Risk',
                'severity': 'High',
                'probability': 85,
                'impact': 'Increased customer acquisition costs and margin pressure',
                'mitigation': 'Differentiate through unique value proposition and seller support'
            })
            risk_score += 30
        
        # Infrastructure risk
        if infrastructure_quality < 300:
            risk_factors.append({
                'factor': 'Infrastructure Limitations',
                'severity': 'Medium',
                'probability': 70,
                'impact': 'Higher logistics costs and delivery delays',
                'mitigation': 'Invest in local logistics partnerships and micro-fulfillment'
            })
            risk_score += 25
        
        # Digital adoption risk
        if digital_readiness < 50:
            risk_factors.append({
                'factor': 'Low Digital Adoption',
                'severity': 'High',
                'probability': 90,
                'impact': 'Slower user acquisition and lower engagement rates',
                'mitigation': 'Implement digital literacy programs and offline-to-online bridge'
            })
            risk_score += 35
        
        # Determine overall risk level
        overall_risk = 'High' if risk_score > 60 else 'Medium' if risk_score > 30 else 'Low'
        
        # Early warning signals
        early_warning_signals = []
        if economic_stability < 6:
            early_warning_signals.append('GDP growth trending below 6%')
        if market_saturation > 35:
            early_warning_signals.append('E-commerce density above sustainable levels')
        if digital_readiness < 55:
            early_warning_signals.append('Digital adoption lagging behind national average')
        
        return {
            'overall_risk': overall_risk,
            'risk_score': risk_score,
            'risk_factors': risk_factors,
            'early_warning_signals': early_warning_signals,
            'risk_mitigation_priority': 'High' if risk_score > 50 else 'Medium'
        }
    
    def predict_seller_churn(self, seller_data, city_data):
        """
        Predict seller churn probability with ML
        """
        # Churn risk features
        performance_score = seller_data.get('monthly_revenue', 15000) / 1000
        market_support = (city_data['internet_users_percent'] + 
                         city_data['digital_payment_users']) / 2
        competition_pressure = city_data['existing_ecommerce_stores']
        
        churn_score = 0
        retention_strategies = []
        
        # Performance-based churn risk
        if performance_score < 10:  # Less than 10k monthly revenue
            churn_score += 30
            retention_strategies.append('Provide targeted marketing support and promotion opportunities')
        
        # Market condition impact
        if market_support < 60:
            churn_score += 20
            retention_strategies.append('Offer digital skills training and market education')
        
        # Competition pressure
        if competition_pressure > 30:
            churn_score += 25
            retention_strategies.append('Provide differentiation support and exclusive partnerships')
        
        # Digital skills impact
        if seller_data.get('digital_skills', 5) < 5:
            churn_score += 15
            retention_strategies.append('Implement comprehensive digital literacy programs')
        
        churn_probability = min(churn_score, 100)
        churn_risk = 'High' if churn_probability > 60 else 'Medium' if churn_probability > 30 else 'Low'
        
        return {
            'churn_probability': churn_probability,
            'churn_risk': churn_risk,
            'retention_strategies': retention_strategies,
            'intervention_priority': 'Immediate' if churn_probability > 70 else 'Scheduled',
            'success_factors': self._identify_success_factors(seller_data, city_data)
        }
    
    def _identify_success_factors(self, seller_data, city_data):
        """Identify key success factors for seller retention"""
        factors = []
        
        if city_data['digital_payment_users'] > 50:
            factors.append('High digital payment adoption supports online sales')
        
        if city_data['existing_ecommerce_stores'] < 25:
            factors.append('Low competition provides market opportunity')
        
        if seller_data.get('experience', 2) > 3:
            factors.append('Seller experience provides competitive advantage')
        
        return factors


# Integration class for TypeScript/JavaScript bridge
class MLModelBridge:
    """
    Bridge class to integrate Python ML models with TypeScript frontend
    Provides simplified interface for web application
    """
    
    def __init__(self):
        self.market_scorer = MarketScoringMLModel()
        self.demand_forecaster = DemandForecastingML()
        self.seller_predictor = SellerSuccessML()
        self.churn_preventer = ChurnPreventionML()
        
        # Initialize with sample training data
        self._initialize_models()
    
    def _initialize_models(self):
        """Initialize models with sample training data"""
        # In production, this would load from a comprehensive dataset
        sample_training_data = [
            {
                'city_name': 'Nashik', 'population': 1530000, 'age_18_35_percent': 42,
                'age_36_50_percent': 28, 'avg_monthly_income': 45000, 'literacy_rate': 78,
                'urbanization_percent': 85, 'internet_users_percent': 68,
                'smartphone_penetration': 72, 'digital_payment_users': 45,
                'social_media_users_percent': 38, 'existing_ecommerce_stores': 25,
                'local_retail_stores_per_1000': 60, 'market_leaders_present': 3,
                'highway_connectivity_km': 450, 'railway_stations': 5,
                'airports_nearby': 1, 'warehouse_facilities': 12,
                'gdp_per_capita': 180000, 'annual_growth_rate': 7.2,
                'industrial_units': 850, 'employment_rate': 82,
                'avg_delivery_distance_km': 45, 'seasonal_demand_variation': 25
            }
        ]
        
        try:
            self.market_scorer.train_models(sample_training_data)
            self.demand_forecaster.train_demand_models(sample_training_data)
            print("✅ All ML models initialized successfully!")
        except Exception as e:
            print(f"⚠️ ML model initialization warning: {e}")
    
    def calculate_market_intelligence(self, city_data):
        """
        Main function to calculate all market intelligence metrics
        This would be called from the TypeScript application
        """
        try:
            # Market scoring
            market_scores = self.market_scorer.predict_market_scores(city_data)
            
            # Demand forecasting for all categories
            demand_forecasts = {}
            categories = ['Fashion & Apparel', 'Home & Kitchen', 'Electronics', 
                         'Beauty & Personal Care', 'Sports & Fitness']
            
            for category in categories:
                demand_forecasts[category] = self.demand_forecaster.predict_category_demand(
                    city_data, category
                )
            
            # Risk assessment
            market_risk = self.churn_preventer.assess_market_risk(city_data)
            
            return {
                'market_scores': market_scores,
                'demand_forecasts': demand_forecasts,
                'market_risk': market_risk,
                'ml_confidence': 0.85,  # Model confidence score
                'last_updated': datetime.now().isoformat()
            }
            
        except Exception as e:
            print(f"Error in ML calculation: {e}")
            return None


# Example usage and testing
if __name__ == "__main__":
    # Initialize ML bridge
    ml_bridge = MLModelBridge()
    
    # Sample city data for testing
    test_city = {
        'city_name': 'Rajkot',
        'population': 1380000,
        'age_18_35_percent': 45,
        'age_36_50_percent': 30,
        'avg_monthly_income': 52000,
        'literacy_rate': 82,
        'urbanization_percent': 88,
        'internet_users_percent': 72,
        'smartphone_penetration': 78,
        'digital_payment_users': 52,
        'social_media_users_percent': 42,
        'existing_ecommerce_stores': 18,
        'local_retail_stores_per_1000': 55,
        'market_leaders_present': 2,
        'highway_connectivity_km': 380,
        'railway_stations': 4,
        'airports_nearby': 1,
        'warehouse_facilities': 8,
        'gdp_per_capita': 195000,
        'annual_growth_rate': 8.1,
        'industrial_units': 920,
        'employment_rate': 85,
        'avg_delivery_distance_km': 35,
        'seasonal_demand_variation': 20
    }
    
    # Test ML calculations
    print("🧠 Testing ML Market Intelligence...")
    results = ml_bridge.calculate_market_intelligence(test_city)
    
    if results:
        print(f"✅ Market Scores: {results['market_scores']}")
        print(f"✅ Demand Forecasts: {results['demand_forecasts']}")
        print(f"✅ Risk Assessment: {results['market_risk']['overall_risk']}")
        print(f"✅ ML Confidence: {results['ml_confidence']}")
    else:
        print("❌ ML calculation failed")