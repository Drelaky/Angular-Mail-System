import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ColorPickerDirective } from 'ngx-color-picker';

@Component({
  selector: 'app-label',
  imports: [
    MatCheckboxModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    ColorPickerDirective,
    FormsModule,
  ],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
})
export class LabelComponent implements OnInit {
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

  generateLabelForm!: ReturnType<typeof this.generateForm>;
  selectiveColor: string = '#a63030';

  ngOnInit(): void {
    this.generateLabelForm = this.generateForm();

    this.generateLabelForm.valueChanges.subscribe((x) => {
      console.log(x);
    });
  }

  generateForm(): FormGroup {
    return new FormGroup({
      color: new FormControl<string>('#a63030'),
      name: new FormControl<string>('', [Validators.required]),
    });
  }

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
        this.generateLabelForm.reset();
      }
    });
  }

  changeColor(color: string) {
    this.generateLabelForm.get('color')?.setValue(color);
  }

  onSubmit(): void {
    console.log(this.generateLabelForm.value);
    //this.generateLabelForm.reset();
  }
}
