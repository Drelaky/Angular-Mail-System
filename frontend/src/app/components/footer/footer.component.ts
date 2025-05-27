import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterService } from '../../services/footer.service';
import { FooterContantItemType } from '../../types/footer.types';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  currentYear: number;
  contactItems: FooterContantItemType[] = [];

  constructor(private readonly footerService: FooterService) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.contactItems = this.footerService.footerContactItems;
  }

  navigateTo(route?: string): void {
    if (route) {
      window.location.href = route;
    } else {
      console.warn('No route provided for navigation');
    }
  }
}
