import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-core',
  imports: [RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
})
export class CoreComponent {}
