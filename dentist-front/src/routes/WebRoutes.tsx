import Hero from "../website/Hero";
import About from "../website/About";
import Services from "../website/Services";
import Appointment from "../website/Appointment";
import Articles from "../website/Articles";
import Footer from "../website/Footer";
import Navbar from "../website/Navbar";

import AppointmentViewModel from "../Services/AppointmentApi";
import ArticlesViewModel from "../Services/ArticlesApi";
import ServicesViewModel from "../Services/ServicesApi";

const WebRoutes = () => {
  const appointmentViewModel = new AppointmentViewModel();
  const articlesViewModel = new ArticlesViewModel();
  const servicesViewModel = new ServicesViewModel();

  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Services viewModel={servicesViewModel} />
      <Appointment viewModel={appointmentViewModel} />
      <Articles viewModel={articlesViewModel} />
      <Footer />
    </div>
  );
};

export default WebRoutes;
