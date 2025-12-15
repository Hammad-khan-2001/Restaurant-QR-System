import React from 'react';

const Features = () => {
  const reasons = [
    {
      title: "Luxury Dining",
      subtitle: "The Ambiance",
      desc: "Experience an ambience of elegance, where every dish is crafted to perfection with premium ingredients and artistic presentation. Culinary art meets sensory orchestration.",
      icon: '🍴'
    },
    {
      title: "QR Menu System",
      subtitle: "The Interface",
      desc: "Say goodbye to paper menus. Instantly access a beautifully designed digital menu with just one scan—fast, safe, and modern. Your device is your portal.",
      icon: '📱' 
    },
    {
      title: "Smart Ordering",
      subtitle: "The Efficiency",
      desc: "Enjoy a seamless and intelligent ordering experience that connects directly to the kitchen. Predictive technology ensures quick and accurate service, every time.",
      icon: '⚡' 
    }
  ];

  return (
    
    <section className="py-16 sm:py-24 bg-[#0a0600] text-center overflow-hidden">
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#D4AF37] tracking-wider mb-16 sm:mb-20">
          Why Choose Scanbite?
        </h2>

        <div className="flex flex-col gap-6 sm:gap-8 max-w-4xl mx-auto">
          {reasons.map((item, i) => (
            <div
              key={i}
             
              className="relative text-left bg-[#160d00] p-6 sm:p-8 rounded-2xl shadow-2xl shadow-amber-900/40 overflow-hidden"
            >

            
              <div
                className="absolute top-0 left-0 h-full w-4 sm:w-6 lg:w-8 bg-[#D4AF37] transform translate-x-0"
              ></div>
           
              <div className="relative z-10 flex items-start space-x-4 sm:space-x-6">

              
                <div className="shrink-0 text-3xl sm:text-4xl text-[#160d00] scale-100 transition duration-500">
                  {item.icon}
                </div>
              
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">{item.subtitle}</p>
                  <h3
                    
                    className="text-2xl sm:text-3xl font-bold mb-3 text-white transition duration-500"
                  >
                    {item.title}
                  </h3>
                  <p
                    
                    className="text-base sm:text-lg text-gray-300 leading-relaxed transition duration-500"
                  >
                    {item.desc}
                  </p>
                </div>
              </div>

        
              <div className="hidden sm:block absolute right-6 top-1/2 -translate-y-1/2 opacity-100 text-4xl sm:text-5xl text-[#D4AF37] translate-x-0">
                →
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;