import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-error',
  imports: [MatInputModule],
  templateUrl: './input-error.component.html',
  styleUrl: './input-error.component.scss',
})
export class InputErrorComponent {
  @Input() errors!: ValidationErrors | null | undefined;
}
