import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { HeaderNavType } from '../../types/headerNav.types';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { takeUntil } from 'rxjs';
import { WithDestroyObservable } from '../../mixins/with-destroy-observable';

@Component({
  selector: 'app-header',
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends WithDestroyObservable(Object) implements OnInit {
  navMenu: HeaderNavType[] = [];
  faEnvelope = faEnvelope;

  constructor(private readonly headerService: HeaderService, private readonly router: Router) {
    super();

    this.navMenu = headerService.navMenu;
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value instanceof NavigationEnd) {
        this.navMenu.forEach((item) => {
          item.isActive = item.routerLink.some((link) => value.urlAfterRedirects.includes(link));
        });
      }
    });
  }

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
