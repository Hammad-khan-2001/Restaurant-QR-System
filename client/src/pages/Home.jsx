import React from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'
import { FiArrowRight } from "react-icons/fi";


export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="bg-black text-white font-body ">

        {/* HERO */}
        <section className="min-h-[85vh] pt-7 flex items-center justify-center bg-linear-to-b from-black via-[#1a0000] to-[#200000]">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-[#D4AF37]">
                Welcome to <span className="text-white">Scanbite</span>
              </h1>

              <p className="mt-4 text-lg text-gray-300">
                A premium QR-based restaurant system redefining luxury dining.
              </p>

              <blockquote className="mt-6 italic text-gray-400 border-l-4 border-[#D4AF37] pl-4">
                “Where elegance meets taste.”
              </blockquote>

              <div className="mt-8 flex gap-4">
                <Link
                  to="/menu"
                  className="bg-black active:scale-95 text-white/80 px-6 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-[#0a0a0a] transition"
                >
                  Explore Menu <FiArrowRight />
                </Link>

                {/* <Link
                  to="/contact"
                  className="border-none bg-[#b9910c] active:scale-95 text-[#000000] px-6 py-3 rounded-md hover:bg-[#a88307] transition"
                >
                  Reserve Table
                </Link> */}
              </div>
            </div>

            <section
              className="relative min-h-[85vh] flex items-center bg-cover bg-center scale-x-[-1]"
              style={{
                backgroundImage:
                  "url('/chefart.png')",
              }}
            >
            </section>


          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 bg-black text-center">
          <h2 className="font-heading text-4xl text-[#D4AF37] mb-10">
            Why Scanbite?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
            {[
              {
                title: "Luxury Dining",
                desc: "Experience an ambience of elegance, where every dish is crafted to perfection with premium ingredients and artistic presentation."
              },
              {
                title: "QR Menu System",
                desc: "Say goodbye to paper menus. Instantly access a beautifully designed digital menu with just one scan — fast, safe, and modern."
              },
              {
                title: "Smart Ordering",
                desc: "Enjoy a seamless and intelligent ordering experience that connects directly to the kitchen for quick and accurate service."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#20000086] border border-[#220202] p-6 rounded-xl hover:scale-105 transition duration-300"
              >
                <h3 className="text-xl text-[#D4AF37] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>


      </div>
    </div>
  );
};

















