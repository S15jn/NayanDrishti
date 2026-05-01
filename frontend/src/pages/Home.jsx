import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="bg-white py-10 px-6 md:flex items-center justify-between">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-4">
            Har Nazar Mein <span className="text-blue-600">Clarity</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Advanced Eye Care. Stylish Eyewear. Perfect Vision for a Better Life.
          </p>


          <button
            onClick={() => navigate("/appointment")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Book Eye Test
          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1588776814546-ec7e3c62f71d"
          alt="hero"
          className="w-[350px] mt-6 md:mt-0 rounded-lg"
        />
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-10 px-6 text-center">
        <h2 className="text-xl font-semibold mb-6">Our Services</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {["Eye Testing", "Spectacles", "Contact Lenses", "Sunglasses"].map(
            (item) => (
              <div
                key={item}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md"
              >
                <p className="font-medium">{item}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Quality service you can trust
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* ================= COLLECTION ================= */}
      <section className="py-10 px-6 text-center">
        <h2 className="text-xl font-semibold mb-6">Our Collection</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow">
              <img
                src="https://via.placeholder.com/150"
                alt="frame"
                className="mx-auto mb-3"
              />
              <p className="font-medium">Frame {i}</p>
              <p className="text-blue-600 font-semibold">₹1999</p>
              <button className="mt-2 border px-3 py-1 text-sm rounded">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="py-10 px-6 bg-white text-center">
        <h2 className="text-xl font-semibold mb-6">
          Why Choose Nayan Drishti?
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {["Expert Care", "Quality Products", "Affordable Price", "Satisfaction"].map(
            (item) => (
              <div key={item}>
                <p className="font-medium">{item}</p>
                <p className="text-sm text-gray-500">
                  Trusted by many customers
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-blue-600 text-white text-center py-8">
        <h2 className="text-lg font-semibold mb-3">
          Book Your Eye Test Today
        </h2>

        {/* FIXED CTA BUTTON */}
        <button
          onClick={() => navigate("/appointment")}
          className="bg-white text-blue-600 px-6 py-2 rounded"
        >
          Book Appointment
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-white p-6 text-center">
        <p>© 2026 Nayan Drishti Opticals</p>
      </footer>
    </div>
  );
};

export default Home;