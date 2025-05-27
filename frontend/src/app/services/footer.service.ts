import { Injectable } from '@angular/core';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  faLocationDot = faLocationDot;
  faPhone = faPhone;
  faEnvelope = faEnvelope;

  footerContactItems = [
    {
      text: 'Budapest, Hungary',
      street: '123 Example Street',
      icon: faLocationDot,
    },
    {
      text: '+36 30 123 4567',
      icon: faPhone,
      link: 'tel:+36301234567',
    },
    {
      text: 'Drelaky@example.com',
      icon: faEnvelope,
      link: 'mailto:Drelaky@example.com',
    },
  ];

  constructor() {}
}
