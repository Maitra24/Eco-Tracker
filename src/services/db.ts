// Simulate a database persistent store
import type { DigitalActivity } from '../types/index';

class EcoDatabase {
  private static instance: EcoDatabase;
  private storageKey = 'eco_tracker_db';

  private constructor() {}

  public static getInstance(): EcoDatabase {
    if (!EcoDatabase.instance) {
      EcoDatabase.instance = new EcoDatabase();
    }
    return EcoDatabase.instance;
  }

  // Activity Methods
  public saveActivity(activity: DigitalActivity): void {
    localStorage.setItem(`${this.storageKey}_activity`, JSON.stringify(activity));
  }

  public getActivity(): DigitalActivity | null {
    const data = localStorage.getItem(`${this.storageKey}_activity`);
    return data ? JSON.parse(data) : null;
  }

  // Community Methods (Mocking persistent interactions)
  public async getCommunityStats() {
    return {
      totalUsers: 24892,
      totalTreesPlanted: 142093,
      totalCarbonSaved: '5.2t',
      liveOffsetEvents: [
        { id: '1', user: 'Liam K.', action: 'Plant 5 Trees', time: 'Just now' },
        { id: '2', user: 'Sofia R.', action: 'Cleared 25GB', time: '2m ago' },
      ]
    };
  }

  // Achievement Methods
  public async getAchievements() {
    const data = localStorage.getItem(`${this.storageKey}_achievements`);
    const defaultAchievements = [
      { id: '1', title: 'Carbon Neutral', completed: false, date: null },
      { id: '2', title: 'Data Dieter', completed: true, date: '2026-02-01' },
    ];
    return data ? JSON.parse(data) : defaultAchievements;
  }

  // Early Access Methods
  public saveEarlyAccess(data: { name: string; email: string }): void {
    const existing = this.getEarlyAccessRequests();
    existing.push({ ...data, timestamp: new Date().toISOString() });
    localStorage.setItem(`${this.storageKey}_early_access`, JSON.stringify(existing));
  }

  public getEarlyAccessRequests(): any[] {
    const data = localStorage.getItem(`${this.storageKey}_early_access`);
    return data ? JSON.parse(data) : [];
  }
}

export const db = EcoDatabase.getInstance();
