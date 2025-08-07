import Navigation from '@/components/common/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import TimelineSection from '@/components/sections/TimelineSection';
import WineSpectatorCTA from '@/components/sections/WineSpectatorCTA';
import ValdobbiadeneSection from '@/components/sections/ValdobbiadeneSection';
import ValdoDifferenceSection from '@/components/sections/ValdoDifferenceSection';
import WineSection from '@/components/sections/WineSection';
import CasaValdoSection from '@/components/sections/CasaValdoSection';
import LifestyleSection from '@/components/sections/LifestyleSection';
import InstagramFeed from '@/components/sections/InstagramFeed';
import Footer from '@/components/sections/Footer';

export default function ValdoLandingPage() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <div id="timeline">
        <TimelineSection />
      </div>
      <WineSpectatorCTA />
      <div id="valdobbiadene">
        <ValdobbiadeneSection />
      </div>
      <div id="difference">
        <ValdoDifferenceSection />
      </div>
      <div id="wines">
        <WineSection />
      </div>
      <div id="casa">
        <CasaValdoSection />
      </div>
      <div id="lifestyle">
        <LifestyleSection />
      </div>
      <InstagramFeed />
      <Footer />
    </>
  );
}
