'use client'

import React, { useState } from 'react';
import { Gift, Star, Coins, Zap, Heart, Diamond, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const BonusBox = () => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentBonus, setCurrentBonus] = useState<typeof bonuses[0] | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasOpenedBox, setHasOpenedBox] = useState(false);

  // List of possible bonuses
  const bonuses = [
    {
      id: 1,
      name: "30% OFF All Plans",
      description: "Get 30% discount on all trading plans!",
      icon: (
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-white font-bold text-lg">30%</span>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-orange-800">OFF</span>
          </div>
        </div>
      ),
      rarity: "legendary",
      color: "bg-gradient-to-br from-orange-100 to-red-100"
    },
    {
      id: 2,
      name: "Energy Boost",
      description: "Full energy restoration!",
      icon: <Zap className="w-16 h-16 text-blue-500" />,
      rarity: "common",
      color: "bg-blue-100"
    },
    {
      id: 3,
      name: "Lucky Star",
      description: "A rare star that brings fortune!",
      icon: <Star className="w-16 h-16 text-purple-500" />,
      rarity: "rare",
      color: "bg-purple-100"
    },
    {
      id: 4,
      name: "Life Heart",
      description: "Extra life in the game!",
      icon: <Heart className="w-16 h-16 text-red-500" />,
      rarity: "rare",
      color: "bg-red-100"
    },
    {
      id: 5,
      name: "Diamond",
      description: "Legendary diamond! Incredible luck!",
      icon: <Diamond className="w-16 h-16 text-cyan-500" />,
      rarity: "legendary",
      color: "bg-cyan-100"
    }
  ];

  const handleBoxClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsBoxOpen(true);
    setHasOpenedBox(true);

    // Always show the 30% discount bonus
    const discountBonus = bonuses[0]; // The 30% OFF bonus
    
    // Delay for box opening animation
    setTimeout(() => {
      setCurrentBonus(discountBonus);
      setShowModal(true);
      setIsAnimating(false);
    }, 1200);
  };

  // Function to handle Get Started button clicks
  const handleGetStarted = () => {
    if (hasOpenedBox) {
      // If user has opened the box, redirect to main site
      redirectWithDiscount();
    } else {
      // If user hasn't opened the box, scroll to it
      const boxElement = document.querySelector('[data-bonus-box]');
      if (boxElement) {
        boxElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  };

  // Function to redirect with discount parameters and UTM tracking
  const redirectWithDiscount = () => {
    // Base URL for your main site
    const baseUrl = 'https://prospecttrade.org';
    
    // UTM parameters for Google Analytics tracking
    const utmParams = {
      utm_source: 'preland',
      utm_medium: 'landing_page',
      utm_campaign: 'preland30_discount',
      utm_content: 'bonus_box',
      utm_term: '30percent_off'
    };
    
    // Discount data - convert numbers to strings for URLSearchParams
    const discountData = {
      discount: 'PRELAND30',
      amount: '30',
      source: 'preland',
      timestamp: Date.now().toString()
    };
    
    // Combine all parameters
    const allParams = { ...utmParams, ...discountData };
    
    // Create URL with all parameters
    const params = new URLSearchParams(allParams);
    const urlWithParams = `${baseUrl}?${params.toString()}`;
    
    // Open in new tab
    window.open(urlWithParams, '_blank');
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentBonus(null);
    setIsBoxOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      
      {/* Header with Logo and Brand */}
      <div className="absolute top-4 md:top-8 left-1/2 transform -translate-x-1/2 text-center px-4 w-full max-w-4xl">
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
          {/* Logo - replace with your actual logo */}
          <Image
            src="/images/your-logo.png"
            alt="ProspectTrade Logo"
            width={48}
            height={48}
            className="rounded-xl shadow-lg"
            onError={(e) => {
              // Fallback if logo image doesn't load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          
          {/* Fallback logo */}
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hidden">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            ProspectTrade
          </h1>
        </div>
      </div>

      {/* New Main Content - Updated Text */}
      <div className="text-center mb-2 md:mb-3 mt-16 sm:mt-20 md:mt-24 px-4 max-w-4xl">
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
            <span className="text-red-400">Tired of working overtime for peanuts?</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
            Still wasting money on courses that never deliver real results? <span className="text-white font-semibold">Sounds familiar?</span>
          </p>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
            We&apos;re not here to promise you 100x gains — but we <em className="text-blue-400 font-semibold">are</em> here to offer you a real chance to earn consistently. 
            <span className="block mt-2 text-gray-300">No hype. Just proven rules, real support, and a team that wins together.</span>
          </p>
          
          <div className="pt-4 md:pt-6">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
              🎁 <span className="text-yellow-400">Open your gift box and start changing your life today.</span>
            </p>
            <p className="text-base sm:text-lg text-blue-300 font-medium">
              Your journey to financial freedom starts now.
            </p>
          </div>
        </div>
      </div>

      {/* Bonus Box - Made Larger */}
      <div className="relative mb-12" data-bonus-box>
        <div
          onClick={handleBoxClick}
          className={`
            relative cursor-pointer transition-all duration-1000 transform
            ${isBoxOpen ? 'scale-110' : 'hover:scale-105'}
            ${isAnimating ? 'animate-bounce' : ''}
            ${!isBoxOpen && !isAnimating ? 'hover:drop-shadow-2xl' : ''}
          `}
        >
          {/* Larger Box Container */}
          <div className="relative w-72 h-72">
            {/* Next.js Image component for optimization */}
            <Image
              src="/images/bonus-box.png" // Path to your image
              alt="Bonus Box"
              width={288}
              height={288}
              className={`
                w-full h-full object-contain transition-all duration-1000 drop-shadow-2xl
                ${isBoxOpen ? 'brightness-125 saturate-150 contrast-110' : 'hover:brightness-110'}
                ${isAnimating ? 'animate-pulse' : ''}
              `}
              priority
              onError={(e) => {
                // Show fallback if image doesn't load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            
            {/* Fallback - Standard box */}
            <div className={`
              absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-2xl
              items-center justify-center transition-all duration-1000 hidden
              ${isBoxOpen ? 'from-yellow-400 to-orange-500' : ''}
            `}>
              <Gift className={`
                w-24 h-24 text-white transition-all duration-1000
                ${isBoxOpen ? 'scale-150 text-yellow-200' : ''}
              `} />
            </div>
          </div>

          {/* Glow effect */}
          <div className={`
            absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none
            ${!isBoxOpen && !isAnimating ? 'hover:shadow-2xl hover:shadow-blue-500/30' : ''}
          `} />

          {/* Particle effects when opening */}
          {isBoxOpen && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-ping"
                  style={{
                    top: `${10 + Math.random() * 80}%`,
                    left: `${10 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.08}s`,
                    animationDuration: '1.2s'
                  }}
                >
                  <Star className="w-6 h-6 text-yellow-400 opacity-75" />
                </div>
              ))}
              
              {/* Large sparkles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`sparkle-${i}`}
                  className={`
                    absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full
                    animate-bounce opacity-80
                  `}
                  style={{
                    top: `${15 + Math.random() * 70}%`,
                    left: `${15 + Math.random() * 70}%`,
                    animationDelay: `${i * 0.12}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          )}

          {/* Pulsing effect during animation */}
          {isAnimating && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 animate-ping" />
          )}
        </div>
      </div>

      {/* Company Description Section */}
      <div className="mt-12 md:mt-16 max-w-4xl mx-auto text-center px-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
            Why Choose ProspectTrade?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Zap className="w-6 md:w-8 h-6 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">24/7 Trading</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                We trade 24 hours a day, regardless of market conditions. Our algorithms never sleep, ensuring you never miss profitable opportunities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Heart className="w-6 md:w-8 h-6 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Personal Approach</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                We offer an individual approach to each client. Every trader gets personalized strategies tailored to their risk profile and goals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Coins className="w-6 md:w-8 h-6 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Referral Program</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Join our referral program where everyone can earn. Share ProspectTrade with friends and get rewarded for every successful referral.
              </p>
            </div>
          </div>
          
          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10">
            <p className="text-gray-300 text-sm mb-4 md:mb-6">
              Learn more about our services and start your trading journey at{" "}
              <button 
                onClick={redirectWithDiscount}
                className="text-blue-400 hover:text-blue-300 font-semibold underline transition-colors duration-200 bg-transparent border-none cursor-pointer"
              >
                prospecttrade.org
              </button>
            </p>
            
            {/* Get Started Button after features */}
            <div className="text-center">
              <button
                onClick={handleGetStarted}
                className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-200 font-bold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🚀 Get Started
              </button>
              <p className="text-gray-400 text-xs md:text-sm mt-2 md:mt-3 px-4">
                {hasOpenedBox ? 'Ready to claim your discount!' : 'Open the bonus box to unlock your special offer!'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {/* Testimonial 1 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div className="ml-4">
                <h4 className="text-white font-semibold text-lg">Michael Chen</h4>
                <p className="text-gray-300 text-sm">Professional Trader</p>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              &quot;ProspectTrade&apos;s analytics have completely transformed my trading strategy. The insights are incredibly accurate and have boosted my returns by 40%.&quot;
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <div className="ml-4">
                <h4 className="text-white font-semibold text-lg">Sarah Johnson</h4>
                <p className="text-gray-300 text-sm">Investment Manager</p>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              &quot;Finally, analytics that actually work! The market predictions are spot-on, and the interface is incredibly intuitive. Best investment I&apos;ve made.&quot;
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div className="ml-4">
                <h4 className="text-white font-semibold text-lg">Alex Rodriguez</h4>
                <p className="text-gray-300 text-sm">Day Trader</p>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              &quot;I&apos;ve tried dozens of trading platforms, but ProspectTrade is in a league of its own. The real-time analytics give me the edge I need to stay profitable.&quot;
            </p>
          </div>
        </div>

        {/* Additional testimonials row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 mt-8">
          {/* Testimonial 4 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                E
              </div>
              <div className="ml-4">
                <h4 className="text-white font-semibold text-lg">Emma Thompson</h4>
                <p className="text-gray-300 text-sm">Crypto Analyst</p>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              &quot;The crypto market insights are phenomenal. ProspectTrade helped me identify trends before they became obvious to everyone else. Incredible platform!&quot;
            </p>
          </div>

          {/* Testimonial 5 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                D
              </div>
              <div className="ml-4">
                <h4 className="text-white font-semibold text-lg">David Kim</h4>
                <p className="text-gray-300 text-sm">Portfolio Manager</p>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              &quot;Managing multiple portfolios became effortless with ProspectTrade. The data visualization and predictive models are simply outstanding. Highly recommended!&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Modal with bonus */}
      {showModal && currentBonus && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm"
          onClick={(e) => {
            // Close modal when clicking on backdrop
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div 
            className="bg-white rounded-3xl p-10 max-w-lg mx-4 transform animate-scaleIn shadow-2xl border-4 border-gradient-to-r from-yellow-400 to-orange-500"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-3">
                🎉 Congratulations!
              </h2>
              <p className="text-xl text-gray-600">You received a bonus:</p>
            </div>

            <div className={`
              ${currentBonus.color} rounded-2xl p-8 mb-8 text-center
              transform hover:scale-105 transition-transform duration-200 shadow-inner
            `}>
              <div className="mb-6">{currentBonus.icon}</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                {currentBonus.name}
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                {currentBonus.description}
              </p>
              
              <div className="mt-6">
                <span className={`
                  px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider
                  ${currentBonus.rarity === 'common' ? 'bg-gray-200 text-gray-800' : ''}
                  ${currentBonus.rarity === 'rare' ? 'bg-purple-200 text-purple-800' : ''}
                  ${currentBonus.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg' : ''}
                `}>
                  {currentBonus.rarity === 'common' ? 'Common' : ''}
                  {currentBonus.rarity === 'rare' ? 'Rare' : ''}
                  {currentBonus.rarity === 'legendary' ? 'Legendary' : ''}
                </span>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  closeModal();
                  redirectWithDiscount();
                }}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                ✨ Claim Your 30% Discount
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BonusBox;