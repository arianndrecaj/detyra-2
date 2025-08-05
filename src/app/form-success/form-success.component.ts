import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-success',
  imports: [],
  templateUrl: './form-success.component.html',
  styleUrl: './form-success.component.scss'
})
export class FormSuccessComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }
}
