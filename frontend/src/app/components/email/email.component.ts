import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { Component, HostListener, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEnvelope,
  faPaperPlane,
  faPen,
  faStar,
  faTrash,
  faTriangleExclamation,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import * as freeSolidIcons from '@fortawesome/free-solid-svg-icons';
import * as freeReguarIcons from '@fortawesome/free-regular-svg-icons';
import { InboxMailType, InboxSidebarType, InboxType } from '../../types/inbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { LabelComponent } from './components/label/label.component';
import { SearchComponent } from './components/search/search.component';
import { WithDestroyObservable } from '../../mixins/with-destroy-observable';
import { ApiService } from '../../services/api-service.service';
import { takeUntil } from 'rxjs';
import { ApiResponse } from '../../types/api.types';
import { HttpErrorResponse } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { EmailService } from '../../services/email/email.service';

@Component({
  selector: 'app-email',
  imports: [
    FontAwesomeModule,
    NgClass,
    FormsModule,
    NgStyle,
    DatePipe,
    MatTableModule,
    MatCheckboxModule,
    LabelComponent,
    SearchComponent,
    MatRadioModule,
  ],
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss',
})
export class EmailComponent extends WithDestroyObservable(Object) implements OnInit {
  actionsSignal!: WritableSignal<InboxSidebarType[]>;
  isMobile = false;

  faStar = faStar;
  faTrash = freeSolidIcons.faTrash;
  faSearch = freeSolidIcons.faSearch;
  faStarSolid = freeReguarIcons.faStar;
  faAngleLeft = freeSolidIcons.faAngleLeft;
  faAngleRight = freeSolidIcons.faAngleRight;
  emailsCount = 0;

  displayedColumns: string[] = ['select', 'starred', 'name', 'badge', 'content', 'date'];
  dataSource!: InboxMailType[];

  selectedMail: InboxMailType | null = null;

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private emailService: EmailService
  ) {
    super();
  }

  ngOnInit(): void {
    this.actionsSignal = this.emailService.actionsSignal;
    this.getMails();
    this.emailService.getActions();
  }

  starredMail(mail: InboxMailType): void {
    this.emailService.starredMail(mail);
  }

  selectAction(action: InboxType): void {
    this.emailService.selectAction(action);
  }

  selectMail(mailId: string): void {
    this.router.navigate(['/', 'core', 'email', 'messages', mailId]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth <= 768;
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

  getActions(): void {
    this.emailService.getActions();
    this.actionsSignal = this.emailService.actionsSignal;
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

  selectMailCheckbox(mail: InboxMailType): void {
    if (this.selectedMail && this.selectedMail.id === mail.id) {
      this.selectedMail = null;
      console.log('Deselected Mail');
      return;
    }

    this.selectedMail = mail;

    console.log('Selected Mail:', this.selectedMail);
  }
}
