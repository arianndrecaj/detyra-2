import { Component } from '@angular/core';
import {TestComponent} from '../test/test.component';

@Component({
  selector: 'app-test2',
  imports: [
    TestComponent
  ],
  templateUrl: './test2.component.html',
  styleUrl: './test2.component.scss'
})
export class Test2Component {

}
