import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-label',
  imports: [MatCheckboxModule, FontAwesomeModule],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
})
export class LabelComponent {
  @ViewChild('labelDialog') labelDialog!: ElementRef<HTMLDialogElement>;

  faPlus = faPlus;
  dummyData = [
    {
      id: 1,
      name: 'Personal',
      color: '#f44336',
    },
    {
      id: 2,
      name: 'Work',
      color: '#2196f3',
    },
    {
      id: 3,
      name: 'Family',
      color: '#4caf50',
    },
    {
      id: 4,
      name: 'Friends',
      color: '#ff9800',
    },
    {
      id: 5,
      name: 'Other',
      color: '#9c27b0',
    },
  ];

  openDialog() {
    this.labelDialog.nativeElement.showModal();

    this.labelDialog.nativeElement.addEventListener('click', (event) => {
      this.labelDialog.nativeElement.getBoundingClientRect();
      var rect = this.labelDialog.nativeElement.getBoundingClientRect();
      var inIsDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!inIsDialog) {
        this.labelDialog.nativeElement.close();
      }
    });
  }
}
