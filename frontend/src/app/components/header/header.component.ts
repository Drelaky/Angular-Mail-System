import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { HeaderNavType } from '../../types/headerNav.types';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  navMenu: HeaderNavType[] = [];

  constructor(private readonly headerService: HeaderService) {}

  ngOnInit(): void {
    this.navMenu = this.headerService.navMenu;
  }

  changeRoute(menuItem: HeaderNavType): void {
    this.navMenu.forEach((item) => {
      if (menuItem.title !== item.title) {
        item.isActive = false;
      } else {
        item.isActive = true;
      }
    });
  }
}
