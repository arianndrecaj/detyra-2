import { Routes } from '@angular/router';

import {TestComponent} from './test/test.component';
import {FormSuccessComponent} from './form-success/form-success.component';

export const routes: Routes = [
  {
    path: '', component: TestComponent,
  },
  {
    path: 'success',component: FormSuccessComponent,
  },
  {
      path: '**', redirectTo: '',
  }
];
