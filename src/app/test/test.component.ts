import { RouterOutlet } from '@angular/router';
import {ReactiveFormsModule, FormControl, FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {Component, inject} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';

@Component({
  selector: 'app-test',
  imports: [RouterOutlet, ReactiveFormsModule, MatButtonToggleGroup, MatButtonToggle],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  private _fb = inject(FormBuilder);

  constructor() {
    this.mainForm.valueChanges.subscribe(value => {
      console.log('Form changed:', value);
    });
  }

  mainForm = this._fb.group({
    question1: this._fb.group({
      answer: [''],
    }),
    question2: this._fb.group({
      answer: [''],
    }),
    question3: this._fb.group({
      answer: [''],
      medication: this._fb.array([])
    }),
  })

  // get answers(): FormArray {
  //   return this.mainForm.get('question2.answers') as FormArray;
  // }

  isQuestionComplete(questionPath: string): boolean {
    const questionGroup = this.mainForm.get(questionPath) as FormGroup;
    if (!questionGroup) return false;
    const checkControls = (group: FormGroup): boolean => {
      return Object.values(group.controls).every(control => {
        if (control instanceof FormGroup) {
          return checkControls(control);
        }
        if (control instanceof FormArray) {
          return control.controls.every(item => item instanceof FormGroup ? checkControls(item) : item.value);
        }
        return control.value != null && control.value !== '' && control.valid;
      });
    };
    return checkControls(questionGroup);
  }

}
