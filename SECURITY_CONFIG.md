# Security Configuration Guide

This guide explains the comprehensive security setup for the Valdo Prosecco landing page.

## Security Headers Overview

The application implements multiple layers of security through HTTP headers to protect against various attack vectors.

### 1. DNS Prefetch Control
```http
X-DNS-Prefetch-Control: on
```
- **Purpose**: Controls DNS prefetching behavior
- **Benefit**: Improves performance while maintaining security
- **Configuration**: Enabled for better user experience

### 2. HTTP Strict Transport Security (HSTS)
```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```
- **Purpose**: Forces HTTPS connections
- **Duration**: 2 years (63072000 seconds)
- **Scope**: Includes all subdomains
- **Preload**: Included in browser HSTS preload lists

### 3. Frame Options
```http
X-Frame-Options: SAMEORIGIN
```
- **Purpose**: Prevents clickjacking attacks
- **Configuration**: Allows framing only from same origin
- **Alternative**: `DENY` for maximum security

### 4. Content Type Options
```http
X-Content-Type-Options: nosniff
```
- **Purpose**: Prevents MIME type sniffing
- **Benefit**: Reduces risk of XSS attacks
- **Configuration**: Strict MIME type enforcement

### 5. Referrer Policy
```http
Referrer-Policy: origin-when-cross-origin
```
- **Purpose**: Controls referrer information in requests
- **Configuration**: Sends origin only for cross-origin requests
- **Privacy**: Protects user privacy while maintaining functionality

### 6. Content Security Policy (CSP)
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google-analytics.com *.googletagmanager.com *.mixpanel.com *.sentry.io https://vercel.live; style-src 'self' 'unsafe-inline' fonts.googleapis.com https://cdn.jsdelivr.net; font-src 'self' fonts.gstatic.com https://cdn.jsdelivr.net; img-src 'self' data: https: blob: *.google-analytics.com *.mixpanel.com *.sentry.io https://images.unsplash.com; connect-src 'self' *.google-analytics.com *.mixpanel.com *.sentry.io https://vercel.live https://api.vercel.com; frame-src 'self' https://vercel.live; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';
```

#### CSP Directives Explained:

**default-src 'self'**
- Default fallback for all resource types
- Only allows resources from same origin

**script-src**
- Controls JavaScript execution
- Allows inline scripts and eval (required for Next.js)
- Permits analytics and monitoring scripts

**style-src**
- Controls CSS loading
- Allows inline styles (required for Tailwind CSS)
- Permits Google Fonts and CDN resources

**font-src**
- Controls font loading
- Permits Google Fonts and CDN resources

**img-src**
- Controls image loading
- Allows data URLs, HTTPS, and blob URLs
- Permits analytics tracking pixels

**connect-src**
- Controls network connections
- Permits analytics and monitoring services
- Allows Vercel deployment connections

**frame-src**
- Controls iframe embedding
- Permits Vercel preview functionality

**object-src 'none'**
- Blocks all plugins and objects
- Prevents Flash, Java, and other plugins

**base-uri 'self'**
- Restricts base URI to same origin
- Prevents base tag hijacking

**form-action 'self'**
- Restricts form submissions to same origin
- Prevents form hijacking attacks

**frame-ancestors 'self'**
- Prevents site from being embedded in iframes
- Additional clickjacking protection

### 7. Permissions Policy
```http
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
```
- **Purpose**: Controls browser feature access
- **Configuration**: Blocks camera, microphone, geolocation, and FLoC
- **Privacy**: Enhances user privacy protection

### 8. Cross-Domain Policies
```http
X-Permitted-Cross-Domain-Policies: none
```
- **Purpose**: Controls cross-domain policy files
- **Configuration**: Blocks all cross-domain policies
- **Security**: Prevents unauthorized cross-domain access

## Analytics Integration Security

### Google Analytics
- **Domain**: `*.google-analytics.com`, `*.googletagmanager.com`
- **Purpose**: User behavior tracking and conversion monitoring
- **CSP**: Explicitly allowed in script-src and connect-src

### Mixpanel
- **Domain**: `*.mixpanel.com`
- **Purpose**: Detailed user journey and funnel analysis
- **CSP**: Explicitly allowed in script-src, img-src, and connect-src

### Sentry
- **Domain**: `*.sentry.io`
- **Purpose**: Error tracking and performance monitoring
- **CSP**: Explicitly allowed in script-src, img-src, and connect-src

### Vercel
- **Domain**: `https://vercel.live`, `https://api.vercel.com`
- **Purpose**: Deployment and preview functionality
- **CSP**: Explicitly allowed in script-src, connect-src, and frame-src

## External Resources Security

### Google Fonts
- **Domain**: `fonts.googleapis.com`, `fonts.gstatic.com`
- **Purpose**: Typography and design
- **CSP**: Explicitly allowed in style-src and font-src

### Unsplash Images
- **Domain**: `https://images.unsplash.com`
- **Purpose**: High-quality stock photography
- **CSP**: Explicitly allowed in img-src

### CDN Resources
- **Domain**: `https://cdn.jsdelivr.net`
- **Purpose**: Third-party libraries and resources
- **CSP**: Explicitly allowed in style-src and font-src

## Security Best Practices

### 1. Regular Updates
- Keep all dependencies updated
- Monitor security advisories
- Update CSP as new services are added

### 2. Monitoring
- Use Sentry for error tracking
- Monitor CSP violations
- Track security-related events

### 3. Testing
- Test CSP in development
- Validate headers in production
- Use security scanning tools

### 4. Compliance
- GDPR compliance for analytics
- CCPA compliance for data handling
- Privacy policy updates

## CSP Violation Monitoring

### Development Mode
```javascript
// CSP violations are logged to console in development
if (process.env.NODE_ENV === 'development') {
  console.warn('CSP Violation:', violation);
}
```

### Production Monitoring
- Sentry captures CSP violations
- Analytics track security events
- Error reporting for policy violations

## Troubleshooting

### Common Issues

1. **Analytics Not Working**
   - Check CSP script-src and connect-src
   - Verify domain allowlists
   - Test in development mode

2. **Fonts Not Loading**
   - Check CSP font-src and style-src
   - Verify Google Fonts domains
   - Test with network tab

3. **Images Not Displaying**
   - Check CSP img-src
   - Verify image domains
   - Test with different image sources

4. **External Scripts Blocked**
   - Add domains to script-src
   - Check for typos in CSP
   - Test with browser dev tools

### Debug Mode
```javascript
// Enable CSP reporting in development
if (process.env.NODE_ENV === 'development') {
  // Add report-uri to CSP for violation reporting
  'report-uri /api/csp-violation';
}
```

## Security Headers Testing

### Online Tools
- [Security Headers](https://securityheaders.com)
- [Mozilla Observatory](https://observatory.mozilla.org)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com)

### Manual Testing
```bash
# Test headers with curl
curl -I https://your-domain.com

# Test CSP with browser dev tools
# Check Console for violations
```

## Future Enhancements

### Planned Security Features
1. **Subresource Integrity (SRI)** for external resources
2. **Feature Policy** for additional browser controls
3. **Expect-CT** for certificate transparency
4. **Public Key Pinning** for additional certificate security

### Monitoring Improvements
1. **Real-time CSP violation alerts**
2. **Security event dashboard**
3. **Automated security scanning**
4. **Compliance reporting tools**

## Compliance Notes

### GDPR Compliance
- Analytics data anonymization
- User consent management
- Data retention policies
- Right to deletion implementation

### CCPA Compliance
- Data access requests
- Opt-out mechanisms
- Data processing disclosures
- Consumer rights implementation

### Industry Standards
- OWASP security guidelines
- Web security best practices
- Privacy-first design principles
- Accessibility compliance 