import { useMemo } from 'react';
import type { DigitalActivity, ActivityImpact } from '../types/index';

export const useCarbonCalculator = (activity: DigitalActivity): ActivityImpact => {
  return useMemo(() => {
    // Safety check for activity and its properties
    const emails = typeof activity?.emailsPerDay === 'number' ? activity.emailsPerDay : 0;
    const streaming = activity?.streamingHoursPerDay || { sd: 0, hd: 0, ultra: 0 };
    const sd = typeof streaming.sd === 'number' ? streaming.sd : 0;
    const hd = typeof streaming.hd === 'number' ? streaming.hd : 0;
    const ultra = typeof streaming.ultra === 'number' ? streaming.ultra : 0;
    const storage = typeof activity?.cloudStorageGB === 'number' ? activity.cloudStorageGB : 0;

    // 1 Email ≈ 4g CO2
    const emailImpact = (emails * 365 * 4) / 1000; // in kg

    // Streaming impact based on quality
    const streamingImpact = (
      (sd * 20 + 
       hd * 36 + 
       ultra * 70) * 365
    ) / 1000; // in kg

    // 1 GB Storage/yr ≈ 200g CO2
    const storageImpact = (storage * 200) / 1000; // in kg

    const totalImpact = emailImpact + streamingImpact + storageImpact;

    return {
      emailImpact: isNaN(emailImpact) ? 0 : emailImpact,
      streamingImpact: isNaN(streamingImpact) ? 0 : streamingImpact,
      storageImpact: isNaN(storageImpact) ? 0 : storageImpact,
      totalImpact: isNaN(totalImpact) ? 0 : totalImpact,
    };
  }, [activity]);
};
