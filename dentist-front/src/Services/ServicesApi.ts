import { Service } from "../models/ServicesModel";

import icon1 from "../assets/icon1.png"
import icon2 from "../assets/icon2.png"
import icon3 from "../assets/icon3.png"
import icon4 from "../assets/icon4.png"



class ServicesViewModel {
  private services: Service[] = [
    {
      name: "Cleaning",
      description: "Thorough cleaning to remove plaque and tartar, ensuring a healthy smile.",
      icon: icon1,
    },
    {
      name: "Orthodontics",
      description: "Straighten and align your teeth with our expert orthodontic treatments.",
      icon: icon2,
    },
    {
      name: "Whitening",
      description: "Achieve a brighter smile with our professional teeth whitening services.",
      icon: icon3,
    },
    {
      name: "Root Canal",
      description: "Relieve pain and save your tooth with our gentle root canal procedures.",
      icon: icon4,
    },
  ];

  getServices(): Service[] {
    return this.services;
  }
}

export default ServicesViewModel;
