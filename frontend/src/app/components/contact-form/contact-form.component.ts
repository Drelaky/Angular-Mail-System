import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { WithDestroyObservable } from '../../mixins/with-destroy-observable';
import { ApiService } from '../../services/api-service.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent extends WithDestroyObservable(Object) implements OnInit {
  contactForm!: ReturnType<typeof this.generateForm>;
  @ViewChild('formDirective') private formDirective!: NgForm;

  constructor(private readonly apiService: ApiService) {
    super();
  }

  ngOnInit(): void {
    this.contactForm = this.generateForm();
  }

  generateForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      ]),
      message: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.apiService
      .sendContactForm({
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        message: this.contactForm.value.message,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.contactForm.reset(
            {
              name: null,
              email: null,
              message: null,
            },
            { emitEvent: false }
          );
          this.formDirective.resetForm();
          this.contactForm.markAsUntouched();
          this.contactForm.markAsPristine();
          this.contactForm.updateValueAndValidity();
        },
        error: (error) => {
          console.error('Error submitting form:', error);
        },
      });
  }
}
