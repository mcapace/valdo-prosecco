import HeroSection from '@/components/sections/HeroSection';
import TimelineSection from '@/components/sections/TimelineSection';
import ValdobbiadeneSection from '@/components/sections/ValdobbiadeneSection';
import ValdoDifferenceSection from '@/components/sections/ValdoDifferenceSection';
import WineSection from '@/components/sections/WineSection';
import CasaValdoSection from '@/components/sections/CasaValdoSection';
import LifestyleSection from '@/components/sections/LifestyleSection';
import InstagramFeed from '@/components/sections/InstagramFeed';
import Footer from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />
      
      {/* 2. The Bolla Legacy (Timeline) */}
      <TimelineSection />
      
      {/* 3. Valdo is Valdobbiadene */}
      <ValdobbiadeneSection />
      
      {/* 4. The Valdo Difference */}
      <ValdoDifferenceSection />
      
      {/* 5. The Wines of Valdo */}
      <WineSection />
      
      {/* 6. Casa Valdo */}
      <CasaValdoSection />
      
      {/* 7. Drink Prosecco Like an Italian!!! */}
      <LifestyleSection />
      
      {/* 8. Instagram Feed */}
      <InstagramFeed />
      
      {/* 9. Footer */}
      <Footer />
    </main>
  );
} 