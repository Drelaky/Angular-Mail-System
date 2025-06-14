import { NgClass } from '@angular/common';
import { Component, HostListener, OnInit, WritableSignal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InboxSidebarType, InboxType } from '../../../../types/inbox';
import { EmailService } from '../../../../services/email/email.service';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-email-sidebar',
  imports: [NgClass, FontAwesomeModule, LabelComponent],
  templateUrl: './email-sidebar.component.html',
  styleUrl: './email-sidebar.component.scss',
  host: {
    '[class.is-mobile]': 'isMobile',
  },
})
export class EmailSidebarComponent implements OnInit {
  actionsSignal!: WritableSignal<InboxSidebarType[]>;
  isMobile = false;

  constructor(private readonly emailService: EmailService) {
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
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth <= 768;
  }
}
