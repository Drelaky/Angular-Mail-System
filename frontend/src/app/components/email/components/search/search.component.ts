import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { WithDestroyObservable } from '../../../../mixins/with-destroy-observable';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-search',
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent extends WithDestroyObservable(Object) implements OnInit {
  @Input() public label: string = 'Search';
  @Output() public readonly search = new EventEmitter<string>();
  faSearch = faSearch;

  formControl: FormControl = new FormControl('');

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.search.emit(value);
      });
  }
}
