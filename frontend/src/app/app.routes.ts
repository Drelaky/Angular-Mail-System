import { Routes } from '@angular/router';
import { MailReadableComponent } from './components/email/components/mail-readable/mail-readable.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/select-page/select-page.component').then((m) => m.SelectPageComponent),
  },
  {
    path: 'core',
    loadComponent: () => import('./components/core/core.component').then((m) => m.CoreComponent),
    children: [
      {
        path: 'contact-form',
        loadComponent: () =>
          import('./components/contact-form/contact-form.component').then(
            (m) => m.ContactFormComponent
          ),
      },
      {
        path: 'email',
        loadComponent: () =>
          import('./components/email/email.component').then((m) => m.EmailComponent),
      },
      {
        path: 'email/messages/:id',
        component: MailReadableComponent,
      },
    ],
  },
];
