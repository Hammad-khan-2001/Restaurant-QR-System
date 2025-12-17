// import React, { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { FiArrowRight } from "react-icons/fi";
// import '../index.css'

// const desktopImages = [
//   "https://plus.unsplash.com/premium_photo-1736167753494-13b26720e9fe?q=80&w=870&auto=format&fit=crop",
//   "https://plus.unsplash.com/premium_photo-1736167749881-437527ffd5e1?q=80&w=870&auto=format&fit=crop",
//   "https://plus.unsplash.com/premium_photo-1705479742945-8e60551b06c6?q=80&w=870&auto=format&fit=crop",
//   "https://plus.unsplash.com/premium_photo-1705479742829-ed3897905443?q=80&w=870&auto=format&fit=crop"
// ];

// const mobileImages = [
//   "https://images.unsplash.com/photo-1511081692775-05d0f180a065?q=80&w=386&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?q=80&w=395&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1650741568251-12dbc68a21bb?w=500&auto=format&fit=crop&q=60",
//   "https://plus.unsplash.com/premium_photo-1670984939096-f3cfd48c7408?w=500&auto=format&fit=crop&q=60"
// ]

// export default function Home() {
//   const [index, setIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
//   const [imagesLoop, setImagesLoop] = useState([]);
//   const [loaded, setLoaded] = useState(false);
//   const sliderRef = useRef();

//   // Check screen width
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 640);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Setup imagesLoop with duplicate first image for infinite loop
//   useEffect(() => {
//     const imgs = isMobile ? mobileImages : desktopImages;
//     setImagesLoop([...imgs, imgs[0]]);
//     setIndex(0);
//   }, [isMobile]);

//   // Mark slider as loaded for initial opacity
//   useEffect(() => {
//     if (imagesLoop.length > 0) setLoaded(true);
//   }, [imagesLoop]);

//   // Slide interval
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex(prev => prev + 1);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   // Reset index instantly when last duplicate is reached
//   useEffect(() => {
//     if (imagesLoop.length === 0) return;
//     if (index === imagesLoop.length - 1) {
//       const timeout = setTimeout(() => {
//         sliderRef.current.style.transition = 'none';
//         setIndex(0);
//         setTimeout(() => {
//           sliderRef.current.style.transition = 'transform 1s ease-in-out';
//         }, 50);
//       }, 1000); // match slide duration
//       return () => clearTimeout(timeout);
//     }
//   }, [index, imagesLoop.length]);

//   // Preload images for smooth initial load
//   useEffect(() => {
//     imagesLoop.forEach(src => {
//       const img = new Image();
//       img.src = src;
//     });
//   }, [imagesLoop]);

//   return (
//     <div>
//       <Navbar />

//       {/* HERO */}
//       <section className="relative w-full h-screen overflow-hidden min-h-[500px]">

//         {/* Slider container */}
//         <div
//           ref={sliderRef}
//           className={`flex w-full h-full transition-transform duration-1000 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
//           style={{ transform: `translateX(-${index * 100}%)` }}
//         >
//           {imagesLoop.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               alt="slide"
//               className="w-full h-full shrink-0 object-cover"
//             />
//           ))}
//         </div>

//         {/* Text + Button overlay */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-black/30">
//           <h1 className="text-4xl md:text-6xl font-bold text-[#D4AF37] drop-shadow-xl">
//             Welcome to <span className="text-white">Scanbite</span>
//           </h1>

//           <p className="mt-4 text-gray-300 max-w-xl">
//             A premium QR-based restaurant system redefining luxury dining.
//           </p>

//           <Link
//             to="/menu"
//             className="mt-8 bg-[#D4AF37] text-black px-8 py-3 rounded-full flex items-center gap-2 hover:bg-[#b9910c] transition shadow-lg hover:shadow-2xl"
//           >
//             Explore Menu <FiArrowRight />
//           </Link>
//         </div>
//       </section>

//       {/* ================= FEATURES ================= */}
//       <section className="py-20 bg-black text-center">
//         <h2 className="font-heading text-4xl text-[#D4AF37] mb-10">
//           Why Scanbite?
//         </h2>

//         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
//           {[
//             {
//               title: "Luxury Dining",
//               desc: "Experience an ambience of elegance, where every dish is crafted to perfection with premium ingredients and artistic presentation."
//             },
//             {
//               title: "QR Menu System",
//               desc: "Say goodbye to paper menus. Instantly access a beautifully designed digital menu with just one scan — fast, safe, and modern."
//             },
//             {
//               title: "Smart Ordering",
//               desc: "Enjoy a seamless and intelligent ordering experience that connects directly to the kitchen for quick and accurate service."
//             }
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="bg-[#160d00] border border-[#160d00] p-6 rounded-xl hover:scale-105 transition duration-300"
//             >
//               <h3 className="text-xl text-[#D4AF37] mb-2">{item.title}</h3>
//               <p className="text-gray-400 text-sm">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }







import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import About from "../components/About";
import '../index.css'
import Features from "../components/Features";
import Footer from "../components/Footer"

const desktopImages = [
  "https://plus.unsplash.com/premium_photo-1736167753494-13b26720e9fe?q=80&w=870&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1736167749881-437527ffd5e1?q=80&w=870&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1705479742945-8e60551b06c6?q=80&w=870&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1705479742829-ed3897905443?q=80&w=870&auto=format&fit=crop"
];

const mobileImages = [
  "https://images.unsplash.com/photo-1511081692775-05d0f180a065?q=80&w=386&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?q=80&w=395&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1650741568251-12dbc68a21bb?w=500&auto=format&fit=crop&q=60",
  "https://plus.unsplash.com/premium_photo-1670984939096-f3cfd48c7408?w=500&auto=format&fit=crop&q=60"
]

export default function Home() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [imagesLoop, setImagesLoop] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchParams] = useSearchParams();
  const [table, setTable] = useState(null);
  const sliderRef = useRef();

  const location = useLocation();


  // Check screen width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Setup imagesLoop
  useEffect(() => {
    const imgs = isMobile ? mobileImages : desktopImages;
    setImagesLoop([...imgs, imgs[0]]);
    setIndex(0);
  }, [isMobile]);

  // Mark slider as loaded
  useEffect(() => {
    if (imagesLoop.length > 0) setLoaded(true);
  }, [imagesLoop]);

  // Slide interval
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Reset index
  useEffect(() => {
    if (imagesLoop.length === 0) return;
    if (index === imagesLoop.length - 1) {
      const timeout = setTimeout(() => {
        sliderRef.current.style.transition = 'none';
        setIndex(0);
        setTimeout(() => {
          sliderRef.current.style.transition = 'transform 1s ease-in-out';
        }, 50);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [index, imagesLoop.length]);

  // Preload images
  useEffect(() => {
    imagesLoop.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [imagesLoop]);


  useEffect(() => {
    const savedTable = localStorage.getItem("activeTable");
    if (savedTable) {
      setTable(JSON.parse(savedTable));
    }
  }, []);



  // QR FETCH

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const slugFromUrl = searchParams.get("qr");
    const storedTable = JSON.parse(localStorage.getItem("activeTable"));

    const slug = slugFromUrl || storedTable?.slug;

    console.log("FINAL SLUG:", slug);

    if (!slug) {
      setTable(null);
      localStorage.removeItem("activeTable");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/v1/tables/${slug}`)
      .then(res => res.json())
      .then(data => {
        // 🔥 MAIN FIX
        if (!data.success || !data.data.isActive) {
          setTable(null);
          localStorage.removeItem("activeTable");
          return;
        }

        setTable(data.data);

        localStorage.setItem(
          "activeTable",
          JSON.stringify({
            tableNumber: data.data.tableNumber,
            tableId: data.data._id,
            slug: data.data.qrSlug
          })
        );
      })
      .catch(err => {
        console.log("Error fetching table:", err);
        setTable(null);
        localStorage.removeItem("activeTable");
      });
  }, [location.search]);



  useEffect(() => {
    const orderId = localStorage.getItem("activeOrderId");
    if (!orderId) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/orders/${orderId}`
        );

        if (res.data.data.status === "completed") {
          localStorage.removeItem("activeTable");
          localStorage.removeItem("activeOrderId");
          setTable(null);
        }
      } catch (err) {
        console.log("Order polling error", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);




  return (
    <div>

      {/* HERO */}
      <section className="relative w-full h-screen overflow-hidden min-h-[500px]">

        {/* Slider container */}
        <div
          ref={sliderRef}
          className={`flex w-full h-full transition-transform duration-1000 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {imagesLoop.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="slide"
              className="w-full h-full shrink-0 object-cover"
            />
          ))}
        </div>

        {/* Text + Button overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-black/50">
          {/* <h1 className="text-5xl md:text-6xl font-bold text-[#D4AF37] drop-shadow-xl">
            Welcome to <span className="text-white">Scanbite</span>
          </h1> */}
          <h1 className="text-5xl sm:text-6xl font-serif font-extrabold text-[#D4AF37] tracking-wider">
            Welcome to <span className="text-white">Scanbite</span>
          </h1>

          {/* ✅ DYNAMIC TABLE LINE */}
          <p className="mt-4 text-gray-200 text-md font-semibold max-w-xl leading-snug">
            {table ? (
              <> You are currently at Table No. <span className="text-indigo-400 font-bold">{table.tableNumber}</span></>
            ) : (
              "⚠️ You are not connected to any table. Please scan the QR on your table."
            )}
          </p>

          <Link
            to="/menu"
            className="mt-8 bg-[#D4AF37] text-black font-semibold text-lg px-8 py-2.5 rounded-2xl flex items-center gap-2 hover:bg-[#b9910c] transition shadow-lg hover:shadow-2xl"
          >
            Explore Menu <FiArrowRight />
          </Link>

        </div>
      </section>



      {/* ABOUT Section */}

      <About />

      {/* Features */}

      <Features />


      {/* FOOTER */}

      <Footer />

    </div>
  );
}
