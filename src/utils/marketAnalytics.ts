// Market Analytics Engine with ML/AI Components

export interface CityData {
  name: string;
  state: string;
  tier: string;
  population: number;
  demographics: {
    ageGroup18_35: number;
    ageGroup36_50: number;
    avgIncome: number;
    educationRate: number;
    urbanization: number;
  };
  digital: {
    internetPenetration: number;
    smartphoneAdoption: number;
    digitalPaymentUsage: number;
    socialMediaUsers: number;
  };
  economic: {
    gdpPerCapita: number;
    growthRate: number;
    industrialPresence: number;
    employmentRate: number;
  };
  logistics: {
    highwayConnectivity: number;
    railwayConnectivity: number;
    warehouseAvailability: number;
    lastMileInfrastructure: number;
  };
  competition: {
    ecommercePresence: number;
    localRetailDensity: number;
    marketSaturation: number;
  };
}

export interface SellerData {
  category: string;
  businessType: 'individual' | 'small_business' | 'established';
  experience: number;
  digitalSkills: number;
  productRange: number;
  customerRating: number;
  monthlyRevenue: number;
}

// 1. MARKET SCORING ALGORITHM
export class MarketScoringEngine {
  private weights = {
    demographics: 0.20,
    digital: 0.25,
    competition: 0.20,
    logistics: 0.20,
    economic: 0.15
  };

  calculateDemographicsScore(demographics: CityData['demographics']): number {
    // Weighted scoring based on e-commerce favorable demographics
    const ageScore = (demographics.ageGroup18_35 * 0.6 + demographics.ageGroup36_50 * 0.4);
    const incomeScore = Math.min(demographics.avgIncome / 50000 * 100, 100);
    const educationScore = demographics.educationRate;
    const urbanScore = demographics.urbanization;
    
    return (ageScore * 0.3 + incomeScore * 0.3 + educationScore * 0.25 + urbanScore * 0.15);
  }

  calculateDigitalScore(digital: CityData['digital']): number {
    // Digital readiness for e-commerce adoption
    return (
      digital.internetPenetration * 0.3 +
      digital.smartphoneAdoption * 0.3 +
      digital.digitalPaymentUsage * 0.25 +
      digital.socialMediaUsers * 0.15
    );
  }

  calculateCompetitionScore(competition: CityData['competition']): number {
    // Higher score = less competition (better opportunity)
    const saturationPenalty = competition.marketSaturation;
    const presencePenalty = competition.ecommercePresence;
    const retailDensity = competition.localRetailDensity;
    
    return 100 - (saturationPenalty * 0.4 + presencePenalty * 0.35 + retailDensity * 0.25);
  }

  calculateLogisticsScore(logistics: CityData['logistics']): number {
    return (
      logistics.highwayConnectivity * 0.3 +
      logistics.railwayConnectivity * 0.25 +
      logistics.warehouseAvailability * 0.25 +
      logistics.lastMileInfrastructure * 0.2
    );
  }

  calculateEconomicScore(economic: CityData['economic']): number {
    const gdpScore = Math.min(economic.gdpPerCapita / 200000 * 100, 100);
    const growthScore = Math.min(economic.growthRate * 10, 100);
    
    return (
      gdpScore * 0.35 +
      growthScore * 0.25 +
      economic.industrialPresence * 0.2 +
      economic.employmentRate * 0.2
    );
  }

  calculateOverallScore(cityData: CityData): number {
    const demographicsScore = this.calculateDemographicsScore(cityData.demographics);
    const digitalScore = this.calculateDigitalScore(cityData.digital);
    const competitionScore = this.calculateCompetitionScore(cityData.competition);
    const logisticsScore = this.calculateLogisticsScore(cityData.logistics);
    const economicScore = this.calculateEconomicScore(cityData.economic);

    return Math.round(
      demographicsScore * this.weights.demographics +
      digitalScore * this.weights.digital +
      competitionScore * this.weights.competition +
      logisticsScore * this.weights.logistics +
      economicScore * this.weights.economic
    );
  }
}

// 2. DEMAND FORECASTING MODEL
export class DemandForecastingEngine {
  private categoryWeights = {
    'Fashion & Apparel': { demographic: 0.4, digital: 0.3, economic: 0.3 },
    'Home & Kitchen': { demographic: 0.3, digital: 0.2, economic: 0.5 },
    'Electronics': { demographic: 0.2, digital: 0.5, economic: 0.3 },
    'Beauty & Personal Care': { demographic: 0.5, digital: 0.3, economic: 0.2 },
    'Sports & Fitness': { demographic: 0.4, digital: 0.4, economic: 0.2 }
  };

  predictCategoryDemand(cityData: CityData, category: string): {
    demandScore: number;
    monthlyOrders: number;
    growthPotential: number;
  } {
    const weights = this.categoryWeights[category] || this.categoryWeights['Fashion & Apparel'];
    
    const demographicFactor = this.calculateDemographicFactor(cityData.demographics, category);
    const digitalFactor = cityData.digital.internetPenetration / 100;
    const economicFactor = Math.min(cityData.economic.gdpPerCapita / 150000, 1);
    
    const demandScore = Math.round(
      demographicFactor * weights.demographic * 100 +
      digitalFactor * weights.digital * 100 +
      economicFactor * weights.economic * 100
    );

    // Calculate estimated monthly orders based on population and demand score
    const baseOrderRate = cityData.population * 0.001; // 0.1% of population as base
    const demandMultiplier = demandScore / 100;
    const monthlyOrders = Math.round(baseOrderRate * demandMultiplier);

    // Growth potential based on market maturity
    const maturityFactor = 1 - (cityData.competition.marketSaturation / 100);
    const growthPotential = Math.round(demandScore * maturityFactor);

    return { demandScore, monthlyOrders, growthPotential };
  }

  private calculateDemographicFactor(demographics: CityData['demographics'], category: string): number {
    switch (category) {
      case 'Fashion & Apparel':
        return (demographics.ageGroup18_35 / 100) * 0.7 + (demographics.ageGroup36_50 / 100) * 0.3;
      case 'Electronics':
        return (demographics.ageGroup18_35 / 100) * 0.6 + (demographics.educationRate / 100) * 0.4;
      case 'Beauty & Personal Care':
        return (demographics.ageGroup18_35 / 100) * 0.8 + (demographics.urbanization / 100) * 0.2;
      default:
        return (demographics.ageGroup18_35 / 100) * 0.5 + (demographics.ageGroup36_50 / 100) * 0.5;
    }
  }
}

// 3. SELLER SUCCESS PREDICTION MODEL
export class SellerSuccessPredictor {
  predictSellerSuccess(sellerData: SellerData, cityData: CityData): {
    successProbability: number;
    riskFactors: string[];
    recommendations: string[];
  } {
    let successScore = 0;
    const riskFactors: string[] = [];
    const recommendations: string[] = [];

    // Experience factor (0-30 points)
    const experienceScore = Math.min(sellerData.experience * 5, 30);
    successScore += experienceScore;

    // Digital skills factor (0-25 points)
    const digitalScore = (sellerData.digitalSkills / 10) * 25;
    successScore += digitalScore;
    if (sellerData.digitalSkills < 6) {
      riskFactors.push('Low digital skills');
      recommendations.push('Provide digital marketing training');
    }

    // Market fit factor (0-25 points)
    const categoryDemand = new DemandForecastingEngine().predictCategoryDemand(cityData, sellerData.category);
    const marketFitScore = (categoryDemand.demandScore / 100) * 25;
    successScore += marketFitScore;

    // Business type factor (0-20 points)
    const businessTypeScore = sellerData.businessType === 'established' ? 20 : 
                             sellerData.businessType === 'small_business' ? 15 : 10;
    successScore += businessTypeScore;

    // City digital readiness alignment
    const cityDigitalScore = new MarketScoringEngine().calculateDigitalScore(cityData.digital);
    if (cityDigitalScore < 60 && sellerData.digitalSkills > 7) {
      successScore += 10; // Advantage in less digital markets
    }

    // Risk assessment
    if (cityData.competition.marketSaturation > 70) {
      riskFactors.push('High market saturation');
      recommendations.push('Focus on unique value proposition');
    }

    if (sellerData.customerRating < 4.0) {
      riskFactors.push('Low customer rating');
      recommendations.push('Improve product quality and customer service');
    }

    const successProbability = Math.min(successScore, 100);

    return { successProbability, riskFactors, recommendations };
  }

  estimateSellerPotential(cityData: CityData): {
    totalPotentialSellers: number;
    categoryBreakdown: { [key: string]: number };
    onboardingDifficulty: 'Easy' | 'Medium' | 'Hard';
  } {
    const baseSellers = cityData.population * 0.008; // 0.8% of population as potential sellers
    
    // Adjust based on economic factors
    const economicMultiplier = Math.min(cityData.economic.gdpPerCapita / 100000, 2);
    const digitalMultiplier = cityData.digital.internetPenetration / 100;
    const competitionMultiplier = 1 + ((100 - cityData.competition.marketSaturation) / 100);
    
    const totalPotentialSellers = Math.round(
      baseSellers * economicMultiplier * digitalMultiplier * competitionMultiplier
    );

    // Category breakdown based on local preferences and market data
    const categoryBreakdown = {
      'Fashion & Apparel': Math.round(totalPotentialSellers * 0.35),
      'Home & Kitchen': Math.round(totalPotentialSellers * 0.25),
      'Electronics': Math.round(totalPotentialSellers * 0.15),
      'Beauty & Personal Care': Math.round(totalPotentialSellers * 0.15),
      'Sports & Fitness': Math.round(totalPotentialSellers * 0.10)
    };

    // Onboarding difficulty assessment
    const digitalReadiness = cityData.digital.internetPenetration;
    const educationLevel = cityData.demographics.educationRate;
    
    let onboardingDifficulty: 'Easy' | 'Medium' | 'Hard';
    if (digitalReadiness > 70 && educationLevel > 75) {
      onboardingDifficulty = 'Easy';
    } else if (digitalReadiness > 50 && educationLevel > 60) {
      onboardingDifficulty = 'Medium';
    } else {
      onboardingDifficulty = 'Hard';
    }

    return { totalPotentialSellers, categoryBreakdown, onboardingDifficulty };
  }
}

// 4. DYNAMIC PRICING MODEL
export class DynamicPricingEngine {
  calculateOptimalPricing(cityData: CityData, category: string, basePrice: number): {
    recommendedPrice: number;
    priceElasticity: number;
    demandImpact: number;
  } {
    // Purchase power adjustment
    const purchasePowerIndex = cityData.economic.gdpPerCapita / 150000; // Normalized to national average
    const purchasePowerMultiplier = Math.max(0.7, Math.min(1.3, purchasePowerIndex));
    
    // Competition adjustment
    const competitionFactor = cityData.competition.marketSaturation / 100;
    const competitionMultiplier = 1 - (competitionFactor * 0.2); // Max 20% discount for high competition
    
    // Digital adoption adjustment (higher digital adoption = price sensitivity)
    const digitalFactor = cityData.digital.digitalPaymentUsage / 100;
    const digitalMultiplier = 1 - (digitalFactor * 0.1); // Max 10% discount for high digital adoption
    
    const recommendedPrice = Math.round(
      basePrice * purchasePowerMultiplier * competitionMultiplier * digitalMultiplier
    );

    // Price elasticity calculation
    const priceElasticity = this.calculatePriceElasticity(cityData, category);
    
    // Demand impact estimation
    const priceChange = (recommendedPrice - basePrice) / basePrice;
    const demandImpact = Math.round((1 + (priceChange * priceElasticity)) * 100);

    return { recommendedPrice, priceElasticity, demandImpact };
  }

  private calculatePriceElasticity(cityData: CityData, category: string): number {
    // Base elasticity by category
    const baseElasticity = {
      'Fashion & Apparel': -1.2,
      'Electronics': -0.8,
      'Home & Kitchen': -1.0,
      'Beauty & Personal Care': -0.9,
      'Sports & Fitness': -1.1
    };

    let elasticity = baseElasticity[category] || -1.0;
    
    // Adjust based on income levels (higher income = less price sensitive)
    const incomeAdjustment = (cityData.economic.gdpPerCapita / 150000 - 1) * 0.3;
    elasticity = elasticity * (1 - incomeAdjustment);
    
    // Adjust based on competition (more competition = more price sensitive)
    const competitionAdjustment = (cityData.competition.marketSaturation / 100) * 0.2;
    elasticity = elasticity * (1 + competitionAdjustment);
    
    return Math.round(elasticity * 100) / 100;
  }
}

// 5. CHURN PREVENTION & RISK ASSESSMENT
export class ChurnPreventionEngine {
  assessMarketRisk(cityData: CityData): {
    overallRisk: 'Low' | 'Medium' | 'High';
    riskFactors: Array<{
      factor: string;
      severity: 'Low' | 'Medium' | 'High';
      probability: number;
      impact: string;
      mitigation: string;
    }>;
    earlyWarningSignals: string[];
  } {
    const riskFactors = [];
    const earlyWarningSignals = [];
    let riskScore = 0;

    // Economic risk assessment
    if (cityData.economic.growthRate < 5) {
      riskFactors.push({
        factor: 'Economic Slowdown',
        severity: 'Medium' as const,
        probability: 60,
        impact: 'Reduced consumer spending',
        mitigation: 'Focus on essential categories and value pricing'
      });
      riskScore += 20;
      earlyWarningSignals.push('GDP growth below 5%');
    }

    // Competition risk
    if (cityData.competition.marketSaturation > 80) {
      riskFactors.push({
        factor: 'Market Saturation',
        severity: 'High' as const,
        probability: 85,
        impact: 'Increased customer acquisition costs',
        mitigation: 'Differentiate through unique value proposition'
      });
      riskScore += 30;
      earlyWarningSignals.push('Market saturation above 80%');
    }

    // Infrastructure risk
    if (cityData.logistics.lastMileInfrastructure < 60) {
      riskFactors.push({
        factor: 'Infrastructure Challenges',
        severity: 'Medium' as const,
        probability: 70,
        impact: 'Higher delivery costs and delays',
        mitigation: 'Invest in local logistics partnerships'
      });
      riskScore += 25;
      earlyWarningSignals.push('Poor last-mile infrastructure');
    }

    // Digital adoption risk
    if (cityData.digital.internetPenetration < 50) {
      riskFactors.push({
        factor: 'Low Digital Adoption',
        severity: 'High' as const,
        probability: 90,
        impact: 'Slower user acquisition and engagement',
        mitigation: 'Implement digital literacy programs'
      });
      riskScore += 35;
      earlyWarningSignals.push('Internet penetration below 50%');
    }

    const overallRisk = riskScore > 60 ? 'High' : riskScore > 30 ? 'Medium' : 'Low';

    return { overallRisk, riskFactors, earlyWarningSignals };
  }

  predictSellerChurn(sellerData: SellerData, cityData: CityData): {
    churnProbability: number;
    churnRisk: 'Low' | 'Medium' | 'High';
    retentionStrategies: string[];
  } {
    let churnScore = 0;
    const retentionStrategies = [];

    // Performance-based churn risk
    if (sellerData.customerRating < 3.5) {
      churnScore += 30;
      retentionStrategies.push('Provide customer service training');
    }

    if (sellerData.monthlyRevenue < 10000) {
      churnScore += 25;
      retentionStrategies.push('Offer marketing support and promotion opportunities');
    }

    // Market condition impact
    const marketRisk = this.assessMarketRisk(cityData);
    if (marketRisk.overallRisk === 'High') {
      churnScore += 20;
      retentionStrategies.push('Provide market-specific support and guidance');
    }

    // Digital skills impact
    if (sellerData.digitalSkills < 5) {
      churnScore += 15;
      retentionStrategies.push('Offer digital skills training programs');
    }

    const churnProbability = Math.min(churnScore, 100);
    const churnRisk = churnProbability > 60 ? 'High' : churnProbability > 30 ? 'Medium' : 'Low';

    return { churnProbability, churnRisk, retentionStrategies };
  }
}

// 6. BUSINESS CASE CALCULATOR
export class BusinessCaseCalculator {
  calculateBusinessMetrics(cityData: CityData, timeframe: number): {
    investment: { [key: string]: number };
    revenue: { [key: string]: number };
    metrics: {
      roi: number;
      npv: number;
      paybackPeriod: number;
      breakeven: number;
    };
    projections: {
      users: number[];
      sellers: number[];
      orders: number[];
      gmv: number[];
    };
  } {
    const marketScore = new MarketScoringEngine().calculateOverallScore(cityData);
    const sellerPotential = new SellerSuccessPredictor().estimateSellerPotential(cityData);
    
    // Investment calculation based on market size and complexity
    const baseInvestment = cityData.population / 100000; // Base investment per 100k population
    const complexityMultiplier = marketScore < 70 ? 1.3 : marketScore < 85 ? 1.1 : 1.0;
    
    const investment = {
      initial: Math.round(baseInvestment * 0.8 * complexityMultiplier * 10) / 10,
      marketing: Math.round(baseInvestment * 0.6 * complexityMultiplier * 10) / 10,
      logistics: Math.round(baseInvestment * 0.5 * complexityMultiplier * 10) / 10,
      technology: Math.round(baseInvestment * 0.3 * complexityMultiplier * 10) / 10,
      operations: Math.round(baseInvestment * 0.4 * complexityMultiplier * 10) / 10
    };
    
    investment.total = Object.values(investment).reduce((sum, val) => sum + val, 0);

    // Revenue projections based on market potential
    const yearlyGrowthRate = marketScore > 85 ? 1.8 : marketScore > 70 ? 1.5 : 1.3;
    const baseRevenue = (cityData.population / 100000) * (marketScore / 100) * 4;
    
    const revenue = {};
    let cumulativeRevenue = 0;
    
    for (let year = 1; year <= timeframe; year++) {
      const yearRevenue = Math.round(baseRevenue * Math.pow(yearlyGrowthRate, year) * 10) / 10;
      revenue[`year${year}`] = yearRevenue;
      cumulativeRevenue += yearRevenue;
    }
    revenue.total = Math.round(cumulativeRevenue * 10) / 10;

    // Calculate metrics
    const roi = Math.round(((revenue.total - investment.total) / investment.total) * 100);
    const discountRate = 0.12;
    let npv = -investment.total;
    
    for (let year = 1; year <= timeframe; year++) {
      npv += revenue[`year${year}`] / Math.pow(1 + discountRate, year);
    }
    npv = Math.round(npv * 10) / 10;

    const paybackPeriod = investment.total / (revenue.total / timeframe);
    const breakeven = Math.round(paybackPeriod * 12); // in months

    // Growth projections
    const baseUsers = cityData.population * 0.05; // 5% penetration target
    const baseSellers = sellerPotential.totalPotentialSellers * 0.3; // 30% of potential
    const baseOrders = baseUsers * 12; // 12 orders per user per year
    const baseGMV = baseOrders * 800; // Average order value ₹800

    const projections = {
      users: [],
      sellers: [],
      orders: [],
      gmv: []
    };

    for (let year = 1; year <= timeframe; year++) {
      const growthFactor = Math.pow(yearlyGrowthRate, year);
      projections.users.push(Math.round(baseUsers * growthFactor));
      projections.sellers.push(Math.round(baseSellers * growthFactor));
      projections.orders.push(Math.round(baseOrders * growthFactor));
      projections.gmv.push(Math.round(baseGMV * growthFactor / 10000000) / 100); // in Cr
    }

    return {
      investment,
      revenue,
      metrics: { roi, npv, paybackPeriod: Math.round(paybackPeriod * 10) / 10, breakeven },
      projections
    };
  }
}

// Export all engines for use in components
export {
  MarketScoringEngine,
  DemandForecastingEngine,
  SellerSuccessPredictor,
  DynamicPricingEngine,
  ChurnPreventionEngine,
  BusinessCaseCalculator
};