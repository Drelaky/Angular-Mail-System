import {
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
import { Label, SelectedLabels } from '../../../../types/labels.types';
import { InboxMailType } from '../../../../types/inbox';
import { EmailService } from '../../../../services/email/email.service';
import { toObservable } from '@angular/core/rxjs-interop';

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
  private readonly destroyRef = inject(DestroyRef);

  selectedMail: InboxMailType | null = null;

  constructor(
    private readonly apiService: ApiService,
    private readonly emailService: EmailService
  ) {
    super();
  }

  faPlus = faPlus;
  selectedLabels: SelectedLabels[] = [];
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

    this.emailService.selectedMail$.pipe(takeUntil(this.destroy$)).subscribe((mail) => {
      this.selectedMail = mail;
      if (mail && mail.labels) {
        const selectedIds = mail.labels.map((label) => label.id);
        this.selectedLabels = mail.labels;

        this.labels.forEach((label) => {
          label.selected = selectedIds.includes(label.id);
        });
      } else {
        this.labels.forEach((label) => (label.selected = false));
      }
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

  isSelected(label: Label) {
    if (!this.selectedMail) {
      console.warn('No mail selected to update.');
      return;
    }

    const foundLabel = this.selectedLabels.find((selectedLabel) => selectedLabel.id === label.id);

    if (foundLabel) {
      this.selectedLabels = this.selectedLabels.filter(
        (selectedLabel) => selectedLabel.id !== label.id
      );

      if (this.selectedMail) {
        this.selectedMail.labels = this.selectedLabels;
      }

      this.updateMailLabels();
      return true;
    }

    this.selectedLabels.push({
      id: label.id,
      name: label.name,
      color: label.color,
      selected: true,
    });

    if (this.selectedMail) {
      this.selectedMail.labels = this.selectedLabels;
    }

    this.updateMailLabels();

    return true;
  }

  updateMailLabels(): void {
    if (!this.selectedMail) {
      console.warn('No mail selected to update.');
      return;
    }

    this.apiService
      .updateMailLabels(this.selectedMail.id, this.selectedLabels)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {},
        error: (error) => {
          console.error('Error updating labels:', error);
        },
      });
  }
}
