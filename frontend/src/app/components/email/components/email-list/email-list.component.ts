import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from '../search/search.component';
import { MatRadioButton } from '@angular/material/radio';
import { DatePipe, NgStyle } from '@angular/common';
import * as freeSolidIcons from '@fortawesome/free-solid-svg-icons';
import * as freeReguarIcons from '@fortawesome/free-regular-svg-icons';
import { InboxMailType } from '../../../../types/inbox';
import { WithDestroyObservable } from '../../../../mixins/with-destroy-observable';
import { ApiService } from '../../../../services/api-service.service';
import { takeUntil } from 'rxjs';
import { ApiResponse } from '../../../../types/api.types';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmailService } from '../../../../services/email/email.service';

@Component({
  selector: 'app-email-list',
  imports: [FontAwesomeModule, SearchComponent, MatRadioButton, NgStyle, DatePipe],
  templateUrl: './email-list.component.html',
  styleUrl: './email-list.component.scss',
})
export class EmailListComponent extends WithDestroyObservable(Object) implements OnInit {
  faStar = freeSolidIcons.faStar;
  faTrash = freeSolidIcons.faTrash;
  faStarSolid = freeReguarIcons.faStar;
  faAngleLeft = freeSolidIcons.faAngleLeft;
  faAngleRight = freeSolidIcons.faAngleRight;
  emailsCount = 0;
  faEllipsisVertical = freeSolidIcons.faEllipsisVertical;

  displayedColumns: string[] = ['select', 'starred', 'name', 'badge', 'content', 'date'];
  dataSource!: InboxMailType[];

  selectedMail: InboxMailType | null = null;

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly emailService: EmailService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getMails();
  }

  getMails(): void {
    this.apiService
      .getMails()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ApiResponse<string, { count: number; emails: InboxMailType[] }>) => {
          this.dataSource = response.result.emails;
          this.emailsCount = response.result.count;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching mails:', error);
        },
      });
  }

  selectMail(mailId: string): void {
    this.router.navigate(['/', 'core', 'email', mailId]);
  }

  starredMail(mail: InboxMailType): void {
    this.emailService.starredMail(mail).subscribe({
      next: () => this.emailService.refreshActions(),
      error: (err) => console.error('Failed to star mail', err),
    });
  }

  selectMailCheckbox(mail: InboxMailType): void {
    if (this.selectedMail && this.selectedMail.id === mail.id) {
      this.selectedMail = null;
      this.emailService.selectedMail$.next(null);
      return;
    }

    this.selectedMail = mail;
    this.emailService.selectedMail$.next(mail);
  }

  searchEmails(searchTerm: string): void {
    if (!searchTerm) {
      this.getMails();
      return;
    }

    this.apiService
      .searchMails(searchTerm)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ApiResponse<string, { count: number; emails: InboxMailType[] }>) => {
          this.dataSource = response.result.emails;
          this.emailsCount = response.result.count;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error searching emails:', error);
        },
      });
  }
}
