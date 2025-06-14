import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from '../search/search.component';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { DatePipe, NgStyle, NgTemplateOutlet } from '@angular/common';
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
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-email-list',
  imports: [
    FontAwesomeModule,
    SearchComponent,
    MatRadioButton,
    NgStyle,
    DatePipe,
    NgTemplateOutlet,
    MatRadioModule,
  ],
  templateUrl: './email-list.component.html',
  styleUrl: './email-list.component.scss',
})
export class EmailListComponent extends WithDestroyObservable(Object) implements OnInit {
  @ViewChild('roleDialog') roleDialog!: ElementRef<HTMLDialogElement>;
  faStar = freeSolidIcons.faStar;
  faTrash = freeSolidIcons.faTrash;
  faStarSolid = freeReguarIcons.faStar;
  faAngleLeft = freeSolidIcons.faAngleLeft;
  faAngleRight = freeSolidIcons.faAngleRight;
  emailsCount = 0;
  faEllipsisVertical = freeSolidIcons.faEllipsisVertical;
  isRoleDropdown = false;
  displayedColumns: string[] = ['select', 'starred', 'name', 'badge', 'content', 'date'];
  dataSource!: InboxMailType[];

  selectedMail: InboxMailType | null = null;

  roles = [
    {
      name: 'Spam',
      selected: false,
      click: () => this.selectedEvent('Spam'),
    },
    {
      name: 'Important',
      selected: false,
      click: () => this.selectedEvent('Important'),
    },
    {
      name: 'Sent',
      selected: false,
      click: () => this.selectedEvent('Sent'),
    },
    {
      name: 'Draft',
      selected: false,
      click: () => this.selectedEvent('Draft'),
    },
    {
      name: 'Trash',
      selected: false,
      click: () => this.selectedEvent('Trash'),
    },
  ];

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly emailService: EmailService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getMails();

    this.emailService.selectedTypeMails$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value: InboxMailType[] | null) => {
        if (!value) {
          this.dataSource = [];
        } else {
          this.dataSource = value;
        }
      },
    });
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

  openRoleDropdown(): void {
    this.isRoleDropdown = !this.isRoleDropdown;
  }

  selectedEvent(role: string | null): void {
    if (!this.selectedMail) {
      return;
    }

    if (this.selectedMail.role === role) {
      this.selectedMail.role = null;
      this.apiService
        .mailEdit(this.selectedMail)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: ApiResponse<string, InboxMailType>) => {
            this.emailService.refreshActions();
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error searching emails:', error);
          },
        });
      return;
    }

    switch (role) {
      case 'Spam':
        this.selectedMail.role = 'Spam';
        break;
      case 'Important':
        this.selectedMail.role = 'Important';
        break;
      case 'Sent':
        this.selectedMail.role = 'Sent';
        break;
      case 'Draft':
        this.selectedMail.role = 'Draft';
        break;
      case 'Trash':
        this.selectedMail.role = 'Trash';
        break;
    }

    this.apiService
      .mailEdit(this.selectedMail)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ApiResponse<string, InboxMailType>) => {
          this.emailService.refreshActions();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error searching emails:', error);
        },
      });
  }
}
