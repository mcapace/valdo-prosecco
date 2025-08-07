'use client';

import React from 'react';
import Image from 'next/image';

const valdoDifferenceData = [
  {
    title: "DECADES OF FAMILY PARTNERSHIP",
    description: "Chief Winemaker Gianfranco Zanon oversees the winemaking for Valdo working closely with the grower families of the region",
    image: "/images/Winemaker/Copia di Gianfranco Zanon(1).jpg",
    caption: "Gianfranco Zanon, Chief Winemaker, representing four generations of the Bolla family's winemaking tradition",
    alt: "Valdo Chief Winemaker Gianfranco Zanon in the vineyards of Valdobbiadene",
    link: "https://us.valdo.com/pages/prosecco-history-and-facts"
  },
  {
    title: "SUSTAINABILITY",
    description: "Building a more responsible & equitable future",
    image: "/images/Sustainable/Copia di valdo-2.jpg",
    caption: "Solar-powered facilities demonstrate Valdo's commitment to sustainable winemaking",
    alt: "Solar panels at Valdo winery for eco-friendly Prosecco production",
    link: "https://us.valdo.com/pages/sustainability"
  },
  {
    title: "VALUES",
    description: "Tradition Meets Innovation",
    image: "/images/lifestyle/Copia di BICCHIERE.jpg",
    caption: "Hand harvesting each and every grape coupled with integrating innovative techniques in the winery",
    alt: "Glass of Prosecco overlooking the vineyards of Valdobbiadene",
    link: "https://us.valdo.com/collections/all"
  },
  {
    title: "PIONEER IN CUVÉE",
    description: "First to introduce the concept of Cuvee with the gentle pressing of the grapes for Valdo's prestige wine- Numero 10",
    image: "/images/Bottle Shots/numero-10-docg.svg",
    caption: "Creating the highest quality for the Valdo family of wines",
    alt: "Valdo Numero 10 DOCG corks and quality seals",
    link: "https://us.valdo.com/pages/awards"
  },
  {
    title: "COMMITMENT TO QUALITY",
    description: "Excellence in every bottle",
    image: "/images/lifestyle/VALDOAMERICA2 5.jpg",
    caption: "Only the finest grapes are selected for Valdo's award-winning Prosecco",
    alt: "Valdo's commitment to quality winemaking",
    link: "https://us.valdo.com/blogs/perlage-magazine/how-prosecco-is-made"
  },
  {
    title: "LAND STEWARDSHIP",
    description: "For future generations",
    image: "/images/Vineyards/Copia di Copia di dettaglio vigneti.jpg",
    caption: "UNESCO World Heritage vineyards preserved for future generations",
    alt: "Aerial view of Valdo's terraced vineyards in Valdobbiadene",
    link: "https://us.valdo.com/pages/our-winery"
  }
];

const ValdoDifferenceSection: React.FC = () => {
  return (
    <section className="section-minimal bg-beige">
      <div className="container-minimal">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">THE VALDO DIFFERENCE</h2>
          <p className="section-subtitle">
            Valdo is a true Italian original, whose wines express their heritage in vibrant, graceful sparkling wines. The Bolla Family has developed a loyal relationship with the family-owned vineyards of Valdobbiadene that has spanned generations.
          </p>
        </div>

        {/* Six Differentiators Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {valdoDifferenceData.map((item) => (
            <div key={item.title} className="text-center">
              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg mb-4">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={400}
                    height={300}
                    className="w-full h-56 object-cover"
                  />
                </div>
              </a>
              <h3 className="text-lg font-semibold mb-2 text-black">{item.title}</h3>
              <p className="text-sm text-black font-medium mb-2">{item.description}</p>
              <p className="text-xs text-gray-600 italic">{item.caption}</p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <h3 className="text-headline font-semibold text-black mb-6">Experience the Valdo Difference</h3>
          <p className="text-body text-black leading-relaxed max-w-3xl mx-auto mb-8 font-medium">
            Discover why Valdo has been the gold standard of Prosecco for nearly a century. Every bottle tells a story of passion, tradition, and uncompromising quality.
          </p>
          <a 
            href="https://us.valdo.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-minimal gold"
          >
            Discover Our Legacy
          </a>
        </div>
      </div>
    </section>
  );
};

export default ValdoDifferenceSection; 