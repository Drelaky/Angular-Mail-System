import { NgClass } from '@angular/common';
import { Component, HostListener, OnInit, WritableSignal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InboxSidebarType, InboxType } from '../../../../types/inbox';
import { EmailService } from '../../../../services/email/email.service';
import { LabelComponent } from '../label/label.component';
import { ApiService } from '../../../../services/api-service.service';
import { takeUntil } from 'rxjs';
import { WithDestroyObservable } from '../../../../mixins/with-destroy-observable';
import { ApiResponse } from '../../../../types/api.types';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-email-sidebar',
  imports: [NgClass, FontAwesomeModule, LabelComponent],
  templateUrl: './email-sidebar.component.html',
  styleUrl: './email-sidebar.component.scss',
  host: {
    '[class.is-mobile]': 'isMobile',
  },
})
export class EmailSidebarComponent extends WithDestroyObservable(Object) implements OnInit {
  actionsSignal!: WritableSignal<InboxSidebarType[]>;
  isMobile = false;

  constructor(
    private readonly emailService: EmailService,
    private readonly apiService: ApiService
  ) {
    super();
    if (window.innerWidth <= 768) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  ngOnInit(): void {
    this.actionsSignal = this.emailService.actionsSignal;
    this.emailService.refreshActions();
  }

  selectAction(action: InboxType): void {
    this.emailService.selectAction(action);

    const updatedActions = this.emailService.actionsSignal();
    const activeItem = updatedActions
      .flatMap((section) => (Array.isArray(section.content) ? section.content : []))
      .find((item) => item.active);

    if (activeItem) {
      this.apiService
        .getSelectedEmailType(activeItem.title)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: ApiResponse<string, any[]>) => {
            if (response.result) {
              this.emailService.selectedTypeMails$.next(response.result);
            }
          },
          error(error: HttpErrorResponse) {
            console.log(error);
          },
        });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth <= 768;
  }
}
