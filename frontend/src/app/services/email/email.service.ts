import { Injectable, signal } from '@angular/core';
import {
  faEnvelope,
  faPaperPlane,
  faPen,
  faStar,
  faTrash,
  faTriangleExclamation,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import { InboxMailType, InboxSidebarType, InboxType } from '../../types/inbox';
import { ApiService } from '../api-service.service';
import { takeUntil } from 'rxjs';
import { WithDestroyObservable } from '../../mixins/with-destroy-observable';
import { ApiResponse } from '../../types/api.types';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmailService extends WithDestroyObservable(Object) {
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

  actionsSignal = signal<InboxSidebarType[]>(this.actions);
  constructor(private readonly apiService: ApiService) {
    super();
  }

  public starredMail(mail: InboxMailType): void {
    mail.isStared = !mail.isStared;

    this.apiService
      .mailEdit(mail)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ApiResponse<string, InboxMailType>) => {
          this.getActions();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating mail:', error);
        },
      });
  }

  public getActions(): void {
    this.apiService
      .getActionData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ApiResponse<string, InboxSidebarType[]>) => {
          if (this.actions[0].content && response.result[0]?.content) {
            response.result[0].content = response.result[0].content.map((item, idx) => ({
              ...item,
              icon: (this.actions[0].content as any[])[idx]?.icon ?? item.icon,
            }));
          }
          this.actionsSignal.set(response.result);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching actions:', error);
        },
      });
  }

  public selectAction(action: InboxType): void {
    this.actionsSignal.update((actions) =>
      actions.map((section) => ({
        ...section,
        content: Array.isArray(section.content)
          ? section.content.map((item) => ({
              ...item,
              active: item.title === action.title,
            }))
          : section.content,
      }))
    );
  }
}
