import dentistAbout from "../assets/dentist-about.jpg"

const About = () => {
    return (
      <section className="bg-white py-16" id="about">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center">
          <div className="sm:w-1/2 flex justify-center sm:justify-start mb-8 sm:mb-0">
            <img
              src={dentistAbout}
              alt="About Us"
              className="w-80 sm:w-full rounded-lg shadow-lg"
            />
          </div>
            <div className="sm:w-1/2 sm:pl-8 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              At our dental clinic, we believe in more than just treating teeth—we aim to 
              build lasting relationships with our patients. With a team of highly qualified 
              professionals, we bring decades of experience and cutting-edge technology to 
              deliver outstanding care.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Whether you're here for a routine check-up or a specialized procedure, we ensure 
              every visit is stress-free, comfortable, and personalized to your needs.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We are committed to staying ahead with the latest advancements in dental science, 
              offering services that include preventative care, cosmetic dentistry, orthodontics, 
              and more. Our mission is simple: to help you achieve and maintain a healthy, 
              beautiful smile that you can be proud of.
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;
  