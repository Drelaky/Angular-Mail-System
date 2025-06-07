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
import { ApiService } from '../../../../services/api-service.service';
import { WithDestroyObservable } from '../../../../mixins/with-destroy-observable';
import { takeUntil } from 'rxjs';
import { Label } from '../../../../types/labels.types';

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
export class LabelComponent extends WithDestroyObservable(Object) implements OnInit {
  @ViewChild('labelDialog') labelDialog!: ElementRef<HTMLDialogElement>;

  constructor(private readonly apiService: ApiService) {
    super();
  }

  faPlus = faPlus;
  presetColors: string[] = [
    '#f44336',
    '#2196f3',
    '#4caf50',
    '#ff9800',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#009688',
    '#795548',
  ];

  labels: Label[] = [];

  generateLabelForm!: ReturnType<typeof this.generateForm>;
  selectiveColor: string = '#a63030';

  ngOnInit(): void {
    this.getAllLabels();
    this.generateLabelForm = this.generateForm();
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
    this.apiService
      .createLabel(this.generateLabelForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.getAllLabels();
          this.labelDialog.nativeElement.close();
          this.generateLabelForm.reset();
        },
        error: (error) => {
          console.error('Error creating label:', error);
        },
      });
  }

  getAllLabels() {
    this.apiService
      .getAllLabels()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.labels = response.result;
        },
        error: (error) => {
          console.error('Error fetching labels:', error);
        },
      });
  }
}
