import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-select-page',
  imports: [RouterModule],
  templateUrl: './select-page.component.html',
  styleUrl: './select-page.component.scss',
})
export class SelectPageComponent {
  cards: { title: string; description: string; routerLink: string[] }[] = [
    {
      title: 'form',
      description: 'This is a form component that allows users to input data and submit it.',
      routerLink: ['/', 'core', 'contact-form'],
    },
    {
      title: 'email',
      description: 'This is an email component that allows users to send and receive emails.',
      routerLink: ['/', 'core', 'email'],
    },
  ];
}
