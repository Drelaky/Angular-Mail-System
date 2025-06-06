import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as freeReguarIcons from '@fortawesome/free-regular-svg-icons';
import * as freeSolidIcons from '@fortawesome/free-solid-svg-icons';
import {
  faEnvelope,
  faPaperPlane,
  faPen,
  faStar,
  faTrash,
  faTriangleExclamation,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs';
import { WithDestroyObservable } from '../../../../mixins/with-destroy-observable';
import { ApiService } from '../../../../services/api-service.service';
import { ApiResponse } from '../../../../types/api.types';
import { InboxMailType, InboxSidebarType, InboxType } from '../../../../types/inbox';
import { LabelComponent } from '../label/label.component';
import { HttpErrorResponse } from '@angular/common/http';
import { SafePipe } from '../../../../pipes/safe.pipe';
import { UtilsService } from '../../../../services/utils.service';
import { MatButtonModule } from '@angular/material/button';
import { EmailService } from '../../../../services/email/email.service';

@Component({
  selector: 'app-mail-readable',
  imports: [
    LabelComponent,
    FontAwesomeModule,
    NgClass,
    NgStyle,
    SafePipe,
    NgTemplateOutlet,
    MatButtonModule,
  ],
  templateUrl: './mail-readable.component.html',
  styleUrl: './mail-readable.component.scss',
})
export class MailReadableComponent extends WithDestroyObservable(Object) implements OnInit {
  //TODO TYPE FIXING
  actions: InboxSidebarType[] = [
    {
      title: 'Inbox',
      content: [
        {
          icon: faEnvelope,
          title: 'Inbox',
          count: 0,
          active: true,
        },
        {
          icon: faStar,
          title: 'Starred',
          count: 0,
          active: false,
        },
        {
          icon: faWarning,
          title: 'Spam',
          count: 0,
          active: false,
        },
        {
          icon: faTriangleExclamation,
          title: 'Important',
          count: 0,
          active: false,
        },
        {
          icon: faPaperPlane,
          title: 'Sent',
          count: 0,
          active: false,
        },
        {
          icon: faPen,
          title: 'Drafts',
          count: 0,
          active: false,
        },
        {
          icon: faTrash,
          title: 'Trash',
          count: 0,
          active: false,
        },
      ],
    },
    {
      title: 'Labels',
      content: undefined,
    },
  ];
  actionsSignal!: WritableSignal<InboxSidebarType[]>;
  emailId!: string;
  faTrash = freeSolidIcons.faTrash;
  faStar = faStar;
  faStarSolid = freeReguarIcons.faStar;
  faAngleLeft = freeSolidIcons.faAngleLeft;
  openDeletePopup: boolean = false;

  mailData: InboxMailType = {
    name: '',
    email: '',
    message: '',
    id: '',
    isRead: false,
    isStared: false,
    createdAt: new Date(),
    badge: [],
    role: '',
  };

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute,
    private readonly utilService: UtilsService,
    private emailService: EmailService
  ) {
    super();

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.emailId = params['id']?.toLocaleUpperCase() || '';
    });
  }

  ngOnInit(): void {
    this.actionsSignal = this.emailService.actionsSignal;
    this.getOneMail(this.emailId);
    this.emailService.getActions();
  }

  starredMail(mail: InboxMailType): void {
    this.emailService.starredMail(mail);
  }

  selectAction(action: InboxType): void {
    this.emailService.selectAction(action);
  }

  backToInbox(): void {
    this.router.navigate(['/', 'core', 'email']);
  }

  async getOneMail(id: string): Promise<void> {
    this.apiService.getOneMail(id).subscribe({
      next: (response: ApiResponse<string, InboxMailType>) => {
        response.result.HTML = this.utilService.getSanitizedMessage(response.result.message);
        this.mailData = response.result;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching mail:', error);
      },
    });
  }
  getActions(): void {
    this.emailService.getActions();
  }

  opendeletePopup(): void {
    this.openDeletePopup = !this.openDeletePopup;
  }

  closeDeletePopup(): void {
    this.openDeletePopup = false;
  }

  deleteMail(id: string): void {
    this.apiService.deleteMail(id).subscribe({
      next: (response: ApiResponse<string, { id: string }>) => {
        this.router.navigate(['/', 'core', 'email']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting mail:', error);
      },
    });
  }
}
