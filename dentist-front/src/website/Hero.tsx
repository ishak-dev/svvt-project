import dentistHeroImg from "../../src/assets/dentist-hero.jpg"

const Hero = () => {
    return (
      <section className="bg-white-100 py-24" id="hero">
        <div className="container mx-auto px-6 flex flex-col-reverse sm:flex-row items-center">
          {/* Left Side */}
          <div className="sm:w-1/2 text-center sm:text-left">
            <h1 className="text-7xl font-bold text-gray-800 mb-4">
              A dental clinic that you can trust
            </h1>
            <p className="text-gray-600 mb-6 text-xl">
              Your smile is our priority. We provide exceptional dental care for a healthy, happy smile.
            </p>
            <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition duration-300">
              Book an Appointment
            </button>
          </div>
  
          {/* Right Side */}
          <div className="sm:w-1/2 flex justify-center sm:justify-end">
            <img
              src={dentistHeroImg}
              alt="Dentist"
              className="w-80 sm:w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    );
  };
  
  export default Hero;
  