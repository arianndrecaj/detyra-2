import { Routes } from '@angular/router';

import {TestComponent} from './test/test.component';
import {Test2Component} from './test2/test2.component';
import {FormSuccessComponent} from './form-success/form-success.component';

export const routes: Routes = [
  {
    path: '', component: TestComponent,
  },
  {
    path: 'test2', component: Test2Component,
  },
  {
    path: 'success',component: FormSuccessComponent,
  },
  {
      path: '**', redirectTo: '',
  }
];
