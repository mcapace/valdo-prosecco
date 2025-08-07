# Valdo Prosecco - Brand Typography Setup Guide

## 🎨 Brand Fonts Overview

The Valdo Prosecco website uses the official brand fonts as specified in the brand book:

### Primary Fonts
- **Trajan Pro (Serif)** - For titles and headlines
  - Regular (400)
  - Bold (700)

- **Raleway (Sans-serif)** - For body text and extended copy
  - Light (300)
  - Regular (400)
  - Semibold (600)

## 📁 Font Implementation Status

### ✅ Currently Implemented
- **Raleway**: Successfully loaded from Google Fonts
- **Trajan Pro Alternative**: Using Cinzel (similar serif font) as temporary replacement

### 🔄 To Complete Setup
- **Trajan Pro**: Needs to be added as local font files

## 🛠️ Adding Trajan Pro Fonts

### Option 1: Purchase and Install Trajan Pro (Recommended)

1. **Purchase Trajan Pro** from Adobe Fonts or authorized reseller
2. **Download the font files**:
   - `TrajanPro-Regular.ttf`
   - `TrajanPro-Bold.ttf`

3. **Place files in the fonts directory**:
   ```bash
   # Create fonts directory (if not exists)
   mkdir -p src/fonts
   
   # Copy font files
   cp /path/to/TrajanPro-Regular.ttf src/fonts/
   cp /path/to/TrajanPro-Bold.ttf src/fonts/
   ```

4. **Update layout.tsx** to use local fonts:
   ```typescript
   // Replace the current Cinzel import with:
   import localFont from 'next/font/local'
   
   const trajanPro = localFont({
     src: [
       {
         path: '../fonts/TrajanPro-Regular.ttf',
         weight: '400',
         style: 'normal',
       },
       {
         path: '../fonts/TrajanPro-Bold.ttf',
         weight: '700',
         style: 'normal',
       },
     ],
     variable: '--font-trajan',
     display: 'swap',
   })
   ```

### Option 2: Continue with Cinzel (Temporary)

If Trajan Pro is not immediately available, the site will continue to work with Cinzel as a temporary alternative. Cinzel is a similar serif font that provides a good approximation of Trajan Pro's elegant style.

## 🎯 Typography Usage Guide

### Headlines & Titles (Trajan Pro)
```css
.valdo-headline-xl    /* Page headlines: 6xl-8xl */
.valdo-headline-lg    /* Large headlines: 4xl-6xl */
.valdo-headline       /* Section titles: 3xl-4xl */
.valdo-title          /* Subsection titles: 2xl-3xl */
.valdo-subtitle       /* Emphasized titles: xl-2xl */
```

### Body Text (Raleway)
```css
.valdo-body-lg        /* Large body text: text-lg */
.valdo-body           /* Normal body text: text-base */
.valdo-body-light     /* Light body text: font-light */
.valdo-body-semibold  /* Emphasized text: font-semibold */
```

### Special Cases
```css
.valdo-gold-title     /* Gold accent titles */
.font-trajan          /* Direct Trajan Pro usage */
.font-raleway         /* Direct Raleway usage */
```

## 📋 Component Typography Examples

### Hero Section
```jsx
<h1 className="valdo-headline-xl text-white">
  Valdo: <span className="valdo-gold-title">The Gold Standard</span>
</h1>
```

### Section Headers
```jsx
<h2 className="valdo-headline text-black">
  The Bolla Family Legacy
</h2>
```

### Body Copy
```jsx
<p className="valdo-body-lg text-gray-600">
  From a small family winery to a global leader...
</p>
```

### Navigation
```jsx
<a className="font-trajan text-2xl text-valdo-gold">
  VALDO
</a>
```

## 🎨 Brand Colors

The typography system works with the official brand colors:
- **Valdo Gold**: `#D4AF37`
- **Valdo Black**: `#0A0A0A`

## 🔧 Technical Implementation

### Font Loading Strategy
- **Raleway**: Loaded from Google Fonts with `display: 'swap'`
- **Trajan Pro**: Local font files with `display: 'swap'`
- **Fallback**: System fonts for optimal performance

### CSS Variables
```css
--font-trajan: 'Trajan Pro', serif;
--font-raleway: 'Raleway', sans-serif;
```

### Tailwind Configuration
```javascript
fontFamily: {
  'trajan': ['var(--font-trajan)', 'serif'],
  'raleway': ['var(--font-raleway)', 'sans-serif'],
  'sans': ['var(--font-raleway)', 'sans-serif'],
}
```

## ✅ Verification Checklist

After implementing Trajan Pro:

- [ ] Font files are in `src/fonts/` directory
- [ ] `layout.tsx` uses `localFont` for Trajan Pro
- [ ] All typography classes render correctly
- [ ] Font weights (400, 700) are available
- [ ] Performance is optimized with `display: 'swap'`
- [ ] Fallback fonts are working

## 🚀 Next Steps

1. **Purchase Trajan Pro** if not already owned
2. **Download font files** from Adobe Fonts or reseller
3. **Place files** in `src/fonts/` directory
4. **Update layout.tsx** to use local fonts
5. **Test typography** across all components
6. **Verify performance** and loading times

## 📞 Support

For questions about font licensing or implementation:
- Contact Adobe Fonts for Trajan Pro licensing
- Refer to the brand book for typography specifications
- Check Next.js font optimization documentation

---

**Note**: The current implementation with Cinzel provides a professional appearance while maintaining the brand aesthetic. Trajan Pro will provide the exact brand specification when implemented. 