export interface DigitalActivity {
  emailsPerDay: number;
  streamingHoursPerDay: {
    sd: number;
    hd: number;
    ultra: number;
  };
  cloudStorageGB: number;
}

export interface ActivityImpact {
  emailImpact: number;
  streamingImpact: number;
  storageImpact: number;
  totalImpact: number;
}

export interface OffsetSolution {
  id: string;
  title: string;
  description: string;
  carbonReduction: number; // in kg
  costPerKg: number;
  icon: string;
}
