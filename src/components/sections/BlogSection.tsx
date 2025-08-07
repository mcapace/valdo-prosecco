'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { imageService } from '@/services/imageServiceClient';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  slug: string;
}

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Sample blog posts - replace with real data from CMS
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Art of Prosecco: From Grape to Glass',
      excerpt: 'Discover the meticulous process behind crafting the perfect Prosecco, from vineyard to your glass.',
      category: 'Winemaking',
      image: imageService.getImage('Vineyards', 0),
      date: '2024-01-15',
      readTime: '5 min read',
      slug: 'art-of-prosecco'
    },
    {
      id: '2',
      title: 'Valdobbiadene: A UNESCO World Heritage Site',
      excerpt: 'Explore the stunning landscapes and rich history of Valdobbiadene, the heart of Prosecco production.',
      category: 'Region',
      image: imageService.getImage('Vineyards', 1),
      date: '2024-01-10',
      readTime: '4 min read',
      slug: 'valdobbiadene-unesco'
    },
    {
      id: '3',
      title: 'Perfect Pairings: Prosecco and Italian Cuisine',
      excerpt: 'Learn how to pair Valdo Prosecco with authentic Italian dishes for the ultimate dining experience.',
      category: 'Food & Wine',
      image: imageService.getImage('Lifestyle', 0),
      date: '2024-01-05',
      readTime: '6 min read',
      slug: 'prosecco-pairings'
    },
    {
      id: '4',
      title: 'The Bolla Family Legacy: Three Generations of Excellence',
      excerpt: 'Meet the family behind Valdo and learn about their century-long commitment to quality winemaking.',
      category: 'Family',
      image: imageService.getImage('Casa Valdo', 0),
      date: '2023-12-28',
      readTime: '7 min read',
      slug: 'bolla-family-legacy'
    },
    {
      id: '5',
      title: 'DOC vs DOCG: Understanding Prosecco Classifications',
      excerpt: 'A comprehensive guide to Italian wine classifications and what makes Valdo Prosecco exceptional.',
      category: 'Education',
      image: imageService.getImage('Wine Bottles', 0),
      date: '2023-12-20',
      readTime: '5 min read',
      slug: 'doc-vs-docg'
    },
    {
      id: '6',
      title: 'Celebrating Life\'s Moments with Prosecco',
      excerpt: 'From weddings to graduations, discover why Prosecco has become the drink of choice for celebrations.',
      category: 'Lifestyle',
      image: imageService.getImage('Lifestyle', 1),
      date: '2023-12-15',
      readTime: '4 min read',
      slug: 'celebrating-with-prosecco'
    }
  ];

  const categories = ['all', 'Winemaking', 'Region', 'Food & Wine', 'Family', 'Education', 'Lifestyle'];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePostClick = (post: BlogPost) => {
    // Analytics tracking would go here
  };

  const formatDate = (dateString: string) => {
    // Use a simple date format to avoid hydration issues
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-trajan text-4xl md:text-5xl mb-6">
            Stories from Valdobbiadene
          </h2>
          <p className="font-raleway text-gray-600 text-lg max-w-3xl mx-auto">
            Discover the stories, traditions, and passion behind Valdo Prosecco through our latest articles and insights.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-full font-raleway font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#D4AF37] text-black'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handlePostClick(post)}
            >
              {/* Post Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-[#D4AF37] text-black px-3 py-1 rounded-full text-sm font-bold">
                  {post.category}
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{formatDate(post.date)}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="font-trajan text-xl mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="font-raleway text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#B8941F] font-raleway font-medium transition-colors"
                >
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="font-trajan text-2xl mb-4">Stay Updated</h3>
          <p className="font-raleway text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest stories, wine tips, and exclusive offers from Valdo Prosecco.
          </p>
          <div className="flex max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent font-raleway"
            />
            <button className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-raleway font-semibold hover:bg-[#B8941F] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 