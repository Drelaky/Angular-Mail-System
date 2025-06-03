import { Injectable } from '@angular/core';
import { HeaderNavType } from '../types/headerNav.types';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  navMenu: HeaderNavType[] = [
    {
      title: 'Contact Form',
      routerLink: ['/', 'core', 'contact-form'],
      isActive: false,
    },
    {
      title: 'Email',
      routerLink: ['/', 'core', 'email'],
      isActive: false,
    },
  ];
}
