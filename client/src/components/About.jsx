import React, { useRef, useState, useEffect } from 'react';


const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

// === 2. Define the Custom CSS Animation Keyframes (Breathing Glow) ===
const customStyles = `
/* Slow, subtle pulse for the glow effect */
@keyframes breathing-glow {
  0%, 100% {
    
    box-shadow: 0 0 20px rgba(120, 53, 15, 0.7); 
  }
  50% {

    box-shadow: 0 0 40px rgba(120, 53, 15, 1.0);
  }
}
.animate-breathing-glow {

  animation: breathing-glow 4s infinite alternate ease-in-out;
}
`;

// === 3. The Animated Component ===

const About = () => {
  const pillars = [
    {
      title: 'Precision Engineered Flavor',
      description: 'The Scanbite Protocol uses computational gastronomy to guarantee peak flavor by analyzing microscopic ingredient composition.',
      image: 'https://img.freepik.com/free-photo/restaurant-interior_1127-3394.jpg',
      alignment: 'left',
    },
    {
      title: 'Unrivaled Global Provenance',
      description: 'We source exclusively from micro-lot farms and authenticated single-source reserves. Quality with a traceable history.',
      image: 'https://popmenucloud.com/jwutdrmk/67f010e1-4698-4340-9ba4-a1c9428699f1.jpg',
      alignment: 'right',
    },
  ];

  return (
    <>
      <style>{customStyles}</style>

      <section className="bg-[#0a0600] text-stone-300 py-24 sm:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-6xl font-serif font-extrabold text-amber-400 tracking-wider mb-4">
              Our Unique Manifesto
            </h2>
            <p className="text-xl max-w-3xl mx-auto border-b border-amber-400/50 pb-4">
              Where the Future of Dining Meets Timeless Craftsmanship.
            </p>
          </div>

          {/* Animated Pillars Grid */}
          <div className="space-y-32">
            {pillars.map((pillar, index) => (
              <AnimatedPillar
                key={pillar.title}
                pillar={pillar}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};


const AnimatedPillar = ({ pillar, index }) => {
  
  const [ref, isVisible] = useOnScreen({ threshold: 0.3 });

  
  const imageSlideFrom = pillar.alignment === 'right' ? 'translate-x-full' : '-translate-x-full';
  const textSlideFrom = pillar.alignment === 'right' ? '-translate-x-full' : 'translate-x-full';


  const rowClasses = `flex flex-col ${pillar.alignment === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`;

  
  const animationClasses = isVisible
    ? 'opacity-100 transform translate-x-0'
    : 'opacity-0';


  const imageAnimClasses = `${animationClasses} transition-all duration-1500 ease-in-out ${!isVisible ? imageSlideFrom : ''}`;

  
  const textAnimClasses = `${animationClasses} transition-all duration-1500 ease-in-out ${!isVisible ? textSlideFrom : ''}`;


  return (
    <div ref={ref} className={rowClasses}>

      {/* 1. Animated Image Block (Unique Effect) */}
      <div
        className={`w-full lg:w-1/2 p-4 perspective-1000 ${imageAnimClasses}`}
      // The image now has no immediate delay (starts at 0ms)
      >
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-in-out transform hover:rotate-y-2 hover:rotate-x-1 hover:scale-[1.02] animate-breathing-glow"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 15px 30px rgba(0,0,0,0.8)'
          }}
        >
          <img
            src={pillar.image}
            alt={pillar.title}
            className="w-full h-96 object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-stone-900 opacity-20 pointer-events-none"></div>
        </div>
      </div>

      {/* 2. Text Content Block */}
      <div
        className={`w-full lg:w-1/2 ${textAnimClasses}`}
        // The text is delayed by 500ms to smoothly follow the image
        style={{ transitionDelay: '500ms' }}
      >
        <span className="text-lg font-medium tracking-widest text-amber-400 uppercase">
          Pillar {index + 1}
        </span>
        <h3 className="mt-2 text-5xl font-serif font-bold text-white">
          {pillar.title}
        </h3>
        <p className="mt-6 text-xl leading-9 text-stone-400 border-l-4 border-amber-400 pl-6 py-2">
          {pillar.description}
        </p>
        <button className="mt-8 px-8 py-3 bg-amber-400 text-stone-900 text-lg font-semibold rounded-full shadow-lg transition duration-300 hover:bg-amber-500 hover:shadow-amber-900/80">
          Discover The Process
        </button>
      </div>
    </div>
  );
};

export default About;