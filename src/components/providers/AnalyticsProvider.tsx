import { ReactNode } from 'react';
import { Analytics, SpeedInsights, GoogleAnalytics } from '@/lib/analytics';

interface AnalyticsProviderProps {
  children: ReactNode;
  googleAnalyticsId?: string;
}

export function AnalyticsProvider({ children, googleAnalyticsId }: AnalyticsProviderProps) {
  return (
    <>
      {children}
      
      {/* Vercel Analytics */}
      <Analytics />
      
      {/* Vercel Speed Insights */}
      <SpeedInsights />
      
      {/* Google Analytics */}
      {googleAnalyticsId && <GoogleAnalytics gaId={googleAnalyticsId} />}
    </>
  );
} 