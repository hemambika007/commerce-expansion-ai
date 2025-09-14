// Sample city data for demonstration
import { CityData } from './marketAnalytics';

export const sampleCityData: { [key: string]: CityData } = {
  'Nashik': {
    name: 'Nashik',
    state: 'Maharashtra',
    tier: 'Tier 2',
    population: 1530000,
    demographics: {
      ageGroup18_35: 42,
      ageGroup36_50: 28,
      avgIncome: 45000,
      educationRate: 78,
      urbanization: 85
    },
    digital: {
      internetPenetration: 68,
      smartphoneAdoption: 72,
      digitalPaymentUsage: 45,
      socialMediaUsers: 38
    },
    economic: {
      gdpPerCapita: 180000,
      growthRate: 7.2,
      industrialPresence: 85,
      employmentRate: 82
    },
    logistics: {
      highwayConnectivity: 95,
      railwayConnectivity: 88,
      warehouseAvailability: 75,
      lastMileInfrastructure: 70
    },
    competition: {
      ecommercePresence: 25,
      localRetailDensity: 60,
      marketSaturation: 35
    }
  },
  'Rajkot': {
    name: 'Rajkot',
    state: 'Gujarat',
    tier: 'Tier 2',
    population: 1380000,
    demographics: {
      ageGroup18_35: 45,
      ageGroup36_50: 30,
      avgIncome: 52000,
      educationRate: 82,
      urbanization: 88
    },
    digital: {
      internetPenetration: 72,
      smartphoneAdoption: 78,
      digitalPaymentUsage: 52,
      socialMediaUsers: 42
    },
    economic: {
      gdpPerCapita: 195000,
      growthRate: 8.1,
      industrialPresence: 90,
      employmentRate: 85
    },
    logistics: {
      highwayConnectivity: 92,
      railwayConnectivity: 85,
      warehouseAvailability: 68,
      lastMileInfrastructure: 72
    },
    competition: {
      ecommercePresence: 18,
      localRetailDensity: 55,
      marketSaturation: 28
    }
  },
  'Jalandhar': {
    name: 'Jalandhar',
    state: 'Punjab',
    tier: 'Tier 2',
    population: 870000,
    demographics: {
      ageGroup18_35: 48,
      ageGroup36_50: 32,
      avgIncome: 48000,
      educationRate: 85,
      urbanization: 82
    },
    digital: {
      internetPenetration: 75,
      smartphoneAdoption: 80,
      digitalPaymentUsage: 48,
      socialMediaUsers: 45
    },
    economic: {
      gdpPerCapita: 175000,
      growthRate: 6.8,
      industrialPresence: 78,
      employmentRate: 80
    },
    logistics: {
      highwayConnectivity: 98,
      railwayConnectivity: 92,
      warehouseAvailability: 82,
      lastMileInfrastructure: 85
    },
    competition: {
      ecommercePresence: 32,
      localRetailDensity: 65,
      marketSaturation: 42
    }
  },
  'Raipur': {
    name: 'Raipur',
    state: 'Chhattisgarh',
    tier: 'Tier 2',
    population: 1040000,
    demographics: {
      ageGroup18_35: 38,
      ageGroup36_50: 25,
      avgIncome: 35000,
      educationRate: 68,
      urbanization: 72
    },
    digital: {
      internetPenetration: 61,
      smartphoneAdoption: 65,
      digitalPaymentUsage: 35,
      socialMediaUsers: 28
    },
    economic: {
      gdpPerCapita: 145000,
      growthRate: 6.2,
      industrialPresence: 65,
      employmentRate: 75
    },
    logistics: {
      highwayConnectivity: 78,
      railwayConnectivity: 82,
      warehouseAvailability: 45,
      lastMileInfrastructure: 55
    },
    competition: {
      ecommercePresence: 15,
      localRetailDensity: 45,
      marketSaturation: 22
    }
  },
  'Jodhpur': {
    name: 'Jodhpur',
    state: 'Rajasthan',
    tier: 'Tier 2',
    population: 1030000,
    demographics: {
      ageGroup18_35: 40,
      ageGroup36_50: 28,
      avgIncome: 38000,
      educationRate: 72,
      urbanization: 78
    },
    digital: {
      internetPenetration: 58,
      smartphoneAdoption: 62,
      digitalPaymentUsage: 32,
      socialMediaUsers: 25
    },
    economic: {
      gdpPerCapita: 155000,
      growthRate: 5.8,
      industrialPresence: 68,
      employmentRate: 78
    },
    logistics: {
      highwayConnectivity: 85,
      railwayConnectivity: 88,
      warehouseAvailability: 52,
      lastMileInfrastructure: 58
    },
    competition: {
      ecommercePresence: 12,
      localRetailDensity: 42,
      marketSaturation: 18
    }
  },
  'Coimbatore': {
    name: 'Coimbatore',
    state: 'Tamil Nadu',
    tier: 'Tier 2',
    population: 1120000,
    demographics: {
      ageGroup18_35: 44,
      ageGroup36_50: 30,
      avgIncome: 55000,
      educationRate: 88,
      urbanization: 90
    },
    digital: {
      internetPenetration: 71,
      smartphoneAdoption: 76,
      digitalPaymentUsage: 49,
      socialMediaUsers: 41
    },
    economic: {
      gdpPerCapita: 210000,
      growthRate: 7.8,
      industrialPresence: 92,
      employmentRate: 87
    },
    logistics: {
      highwayConnectivity: 88,
      railwayConnectivity: 85,
      warehouseAvailability: 72,
      lastMileInfrastructure: 75
    },
    competition: {
      ecommercePresence: 28,
      localRetailDensity: 58,
      marketSaturation: 38
    }
  },
  'Agra': {
    name: 'Agra',
    state: 'Uttar Pradesh',
    tier: 'Tier 2',
    population: 1680000,
    demographics: {
      ageGroup18_35: 36,
      ageGroup36_50: 26,
      avgIncome: 32000,
      educationRate: 65,
      urbanization: 68
    },
    digital: {
      internetPenetration: 55,
      smartphoneAdoption: 58,
      digitalPaymentUsage: 28,
      socialMediaUsers: 22
    },
    economic: {
      gdpPerCapita: 125000,
      growthRate: 5.2,
      industrialPresence: 58,
      employmentRate: 72
    },
    logistics: {
      highwayConnectivity: 82,
      railwayConnectivity: 78,
      warehouseAvailability: 48,
      lastMileInfrastructure: 52
    },
    competition: {
      ecommercePresence: 22,
      localRetailDensity: 68,
      marketSaturation: 45
    }
  },
  'Madurai': {
    name: 'Madurai',
    state: 'Tamil Nadu',
    tier: 'Tier 2',
    population: 1010000,
    demographics: {
      ageGroup18_35: 38,
      ageGroup36_50: 27,
      avgIncome: 36000,
      educationRate: 75,
      urbanization: 75
    },
    digital: {
      internetPenetration: 53,
      smartphoneAdoption: 57,
      digitalPaymentUsage: 31,
      socialMediaUsers: 26
    },
    economic: {
      gdpPerCapita: 140000,
      growthRate: 6.0,
      industrialPresence: 62,
      employmentRate: 76
    },
    logistics: {
      highwayConnectivity: 75,
      railwayConnectivity: 80,
      warehouseAvailability: 42,
      lastMileInfrastructure: 48
    },
    competition: {
      ecommercePresence: 18,
      localRetailDensity: 52,
      marketSaturation: 32
    }
  },
  'Vijayawada': {
    name: 'Vijayawada',
    state: 'Andhra Pradesh',
    tier: 'Tier 2',
    population: 1030000,
    demographics: {
      ageGroup18_35: 41,
      ageGroup36_50: 29,
      avgIncome: 42000,
      educationRate: 80,
      urbanization: 82
    },
    digital: {
      internetPenetration: 59,
      smartphoneAdoption: 64,
      digitalPaymentUsage: 36,
      socialMediaUsers: 30
    },
    economic: {
      gdpPerCapita: 165000,
      growthRate: 6.5,
      industrialPresence: 72,
      employmentRate: 79
    },
    logistics: {
      highwayConnectivity: 80,
      railwayConnectivity: 85,
      warehouseAvailability: 55,
      lastMileInfrastructure: 62
    },
    competition: {
      ecommercePresence: 20,
      localRetailDensity: 48,
      marketSaturation: 28
    }
  },
  'Kanpur': {
    name: 'Kanpur',
    state: 'Uttar Pradesh',
    tier: 'Tier 2',
    population: 2840000,
    demographics: {
      ageGroup18_35: 39,
      ageGroup36_50: 27,
      avgIncome: 38000,
      educationRate: 70,
      urbanization: 78
    },
    digital: {
      internetPenetration: 62,
      smartphoneAdoption: 66,
      digitalPaymentUsage: 34,
      socialMediaUsers: 28
    },
    economic: {
      gdpPerCapita: 150000,
      growthRate: 5.8,
      industrialPresence: 75,
      employmentRate: 74
    },
    logistics: {
      highwayConnectivity: 88,
      railwayConnectivity: 92,
      warehouseAvailability: 65,
      lastMileInfrastructure: 68
    },
    competition: {
      ecommercePresence: 35,
      localRetailDensity: 72,
      marketSaturation: 52
    }
  }
};