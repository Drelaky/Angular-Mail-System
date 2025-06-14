import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmailSidebarComponent } from './components/email-sidebar/email-sidebar.component';

@Component({
  selector: 'app-email',
  imports: [NgClass, EmailSidebarComponent, RouterModule],
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss',
})
export class EmailComponent {
  isMobile = false;

  constructor() {
    if (window.innerWidth <= 768) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth <= 768;
  }
}
