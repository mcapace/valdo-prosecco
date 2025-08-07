# Analytics Setup Guide

This guide explains how to configure analytics for the Valdo Prosecco landing page.

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Mixpanel
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token_here

# Sentry Error Tracking
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://valdoprosecco.com
NEXT_PUBLIC_ENVIRONMENT=production
```

## Analytics Services

### 1. Vercel Analytics
- **Automatic**: Configured automatically when deployed to Vercel
- **Features**: Page views, user sessions, performance metrics
- **No setup required** for Vercel deployments

### 2. Google Analytics 4
- **Setup**: Create a GA4 property and get your Measurement ID
- **Features**: User behavior, conversion tracking, e-commerce
- **Integration**: Automatic event tracking for wine interactions

### 3. Mixpanel
- **Setup**: Create a Mixpanel project and get your token
- **Features**: Detailed user journey, funnel analysis, A/B testing
- **Custom Events**: Wine interactions, vineyard tours, pairing selections

### 4. Sentry
- **Setup**: Create a Sentry project and get your DSN
- **Features**: Error tracking, performance monitoring, session replay
- **Configuration**: Automatic error capture and reporting

## Usage in Components

### Basic Analytics Hook
```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

function WineCard({ wine }) {
  const { trackWineInteraction, trackPurchase } = useAnalytics();

  const handleView = () => {
    trackWineInteraction(wine.name, 'view');
  };

  const handlePurchase = () => {
    trackPurchase(wine.name, wine.price, 'product_card');
  };

  return (
    <div onClick={handleView}>
      <button onClick={handlePurchase}>Buy Now</button>
    </div>
  );
}
```

### Custom Events
```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

function VineyardTour() {
  const { trackTourInteraction, trackJourney } = useAnalytics();

  const handleTourPoint = (point: string) => {
    trackTourInteraction(point, 'click');
    trackJourney(`tour_${point}`, 1, 6);
  };

  return (
    <div>
      <button onClick={() => handleTourPoint('glera_vines')}>
        Glera Vines
      </button>
    </div>
  );
}
```

### Error Tracking
```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

function ContactForm() {
  const { trackContact, trackError } = useAnalytics();

  const handleSubmit = async (data) => {
    try {
      trackContact('submit', 'contact_form');
      await submitForm(data);
      trackContact('success', 'contact_form');
    } catch (error) {
      trackError(error, { form_data: data });
    }
  };
}
```

## Analytics Provider

Wrap your app with the AnalyticsProvider:

```tsx
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AnalyticsProvider googleAnalyticsId={process.env.NEXT_PUBLIC_GA_ID}>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
```

## Tracked Events

### Wine Interactions
- `wine_interaction` - Bottle clicks, rotations, zoom
- `purchase_intent` - Add to cart, buy now clicks
- `wine_view` - Wine page views

### Vineyard Tour
- `vineyard_tour_interaction` - Tour point clicks
- `user_journey_step` - Tour progression

### Pairing Wheel
- `pairing_interaction` - Category selections
- `pairing_view` - Pairing wheel views

### User Actions
- `language_switch` - Language changes
- `newsletter_signup` - Email subscriptions
- `contact_form` - Form submissions

### Performance
- `performance_metric` - Page load times
- `error_occurred` - JavaScript errors

## Dashboard Setup

### Google Analytics 4
1. Create custom events for wine interactions
2. Set up e-commerce tracking
3. Configure conversion goals

### Mixpanel
1. Create funnels for user journey
2. Set up A/B tests for different layouts
3. Track user properties and segmentation

### Sentry
1. Set up alert rules for critical errors
2. Configure performance thresholds
3. Enable session replay for debugging

## Privacy Compliance

### GDPR Compliance
- Implement cookie consent banner
- Provide opt-out mechanisms
- Document data processing activities

### CCPA Compliance
- Provide data access and deletion options
- Implement "Do Not Sell" functionality
- Maintain data processing records

## Performance Monitoring

### Core Web Vitals
- Track LCP, FID, CLS metrics
- Set up performance budgets
- Monitor real user metrics

### Custom Metrics
- Wine interaction response times
- 3D model loading performance
- Image optimization effectiveness

## Troubleshooting

### Common Issues
1. **Events not firing**: Check environment variables
2. **Duplicate events**: Verify tracking implementation
3. **Performance impact**: Monitor bundle size

### Debug Mode
Enable debug mode in development:
```tsx
// In development, events are logged to console
if (process.env.NODE_ENV === 'development') {
  console.log('Analytics event:', eventName, properties);
}
```

## Best Practices

1. **Consistent naming**: Use snake_case for event names
2. **Meaningful properties**: Include relevant context
3. **Error handling**: Wrap tracking calls in try-catch
4. **Performance**: Debounce frequent events
5. **Privacy**: Don't track sensitive user data 