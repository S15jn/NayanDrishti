import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaEye,
  FaGlasses,
  FaHeart,
  FaShieldAlt,
  FaStar,
  FaSun,
} from "react-icons/fa";

const services = [
  {
    title: "Eye Testing",
    text: "Computerized vision checkup",
    icon: <FaEye />,
  },
  {
    title: "Spectacles",
    text: "Premium frames and lenses",
    icon: <FaGlasses />,
  },
  {
    title: "Contact Lenses",
    text: "Comfortable daily wear options",
    icon: <FaHeart />,
  },
  {
    title: "Sunglasses",
    text: "UV protection with style",
    icon: <FaSun />,
  },
];

const products = [
  {
    name: "Classic Frame",
    price: "₹1999",
    image:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Metal Frame",
    price: "₹2499",
    image:
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Premium Lens",
    price: "₹2999",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sun Collection",
    price: "₹1799",
    image:
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 text-slate-900">
      <section
        className="relative min-h-[78vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 min-h-[78vh] flex items-center">
          <div className="max-w-2xl text-white">
            <p className="inline-flex items-center gap-2 bg-white/15 border border-white/25 px-4 py-2 rounded-full text-sm mb-5">
              <FaStar className="text-yellow-300" />
              Trusted Eye Care & Opticals
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
              Nayan Drishti Opticals
            </h1>

            <p className="text-lg md:text-xl text-white/85 mb-8 max-w-xl">
              Advanced eye testing, stylish eyewear, and clear vision care for
              your everyday life.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/appointment")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg font-semibold shadow-lg"
              >
                Book Eye Test
              </button>

              <button
                onClick={() => navigate("/appointment")}
                className="bg-white text-slate-900 hover:bg-slate-100 px-7 py-3 rounded-lg font-semibold"
              >
                Visit Store
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["Modern Testing", "Accurate computerized eye checkup"],
            ["Stylish Frames", "Latest designs for every face"],
            ["Fair Pricing", "Quality eyewear at honest prices"],
          ].map(([title, text]) => (
            <div key={title} className="bg-white p-5 rounded-lg shadow-lg">
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-slate-500 mt-1">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-14 px-6">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-blue-600 font-semibold text-sm">Services</p>
            <h2 className="text-2xl font-bold mt-1">Complete Vision Care</h2>
          </div>

          <button
            onClick={() => navigate("/appointment")}
            className="hidden md:inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-lg"
          >
            <FaCalendarCheck />
            Book Now
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-5">
          {services.map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition"
            >
              <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xl mb-4">
                {item.icon}
              </div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-slate-500 mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-blue-600 font-semibold text-sm">Collection</p>
            <h2 className="text-2xl font-bold mt-1">Featured Eyewear</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {products.map((item) => (
              <div
                key={item.name}
                className="bg-slate-50 rounded-lg overflow-hidden shadow hover:shadow-xl transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-44 w-full object-cover"
                />

                <div className="p-4">
                  <p className="font-semibold">{item.name}</p>

                
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-14 px-6">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            ["Expert Care", <FaEye />],
            ["Quality Products", <FaShieldAlt />],
            ["Affordable Price", <FaStar />],
            ["Satisfaction", <FaHeart />],
          ].map(([title, icon]) => (
            <div key={title} className="bg-white p-6 rounded-lg shadow">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-3">
                {icon}
              </div>
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-slate-500 mt-2">
                Trusted by many customers
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h2 className="text-2xl font-bold">Book Your Eye Test Today</h2>
            <p className="text-blue-100 mt-1">
              Clearer vision starts with one appointment.
            </p>
          </div>

          <button
            onClick={() => navigate("/appointment")}
            className="bg-white text-blue-600 hover:bg-blue-50 px-7 py-3 rounded-lg font-semibold"
          >
            Book Appointment
          </button>
        </div>
      </section>

      <footer className="bg-slate-950 text-white p-6 text-center">
        <p>© 2026 Nayan Drishti Opticals</p>
      </footer>
    </div>
  );
};

export default Home;
