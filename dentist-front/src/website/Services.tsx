import React, { useState, useEffect } from "react";
import ServicesViewModel from "../Services/ServicesApi";
import { Service } from "../models/ServicesModel";

interface ServicesProps {
  viewModel: ServicesViewModel;
}



const Services: React.FC<ServicesProps> = ({ viewModel }) => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    setServices(viewModel.getServices());
  }, [viewModel]);

  return (
    <section id="services" className="py-20 text-center bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
      <p className="mt-4 text-gray-600">
        We offer a range of dental services to meet all your oral health needs.
      </p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 border rounded-md shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={service.icon}
              alt={service.name}
              width={100}
              className="m-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {service.name}
            </h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
