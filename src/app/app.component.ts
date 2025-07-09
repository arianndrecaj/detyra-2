import { RouterOutlet } from '@angular/router';
import {ReactiveFormsModule, FormControl, FormBuilder} from '@angular/forms';
import {Component, inject} from '@angular/core';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, MatRadioGroup, MatRadioButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  private _fb = inject(FormBuilder);

  mainForm = this._fb.group({
    question1: this._fb.group({
      answer: [''],
      subQuestions: this._fb.group({
        subQuestion1: this._fb.group({
          answer: [''],
          subQuestion2: this._fb.group({
            answer: [''],
            subQuestion3: this._fb.group({
              answer: [''],
            })
          })
        }),
      })
    }),
    question2:  this._fb.group({
      answer: [''],
      subQuestions: this._fb.group({
        subQuestion1: this._fb.group({
          answer: [''],
          subQuestion2: this._fb.group({
            answer: [''],
          })
        })
      })
    }),
    question3:  this._fb.group({
      answer: [''],
      medication: this._fb.array([])
    }),
  })

  isQuestion1Complete(): boolean {
    const q1 = this.mainForm.get('question1.answer')?.value;
    const sq1 = this.mainForm.get('question1.subQuestions.subQuestion1.answer')?.value;
    const sq2 = this.mainForm.get('question1.subQuestions.subQuestion1.subQuestion2.answer')?.value;
    const sq3 = this.mainForm.get('question1.subQuestions.subQuestion1.subQuestion2.subQuestion3.answer')?.value;

    return !!q1 && !!sq1 && !!sq2 && !!sq3;
  }
  constructor() {
    console.log(this.mainForm.value)
  }
}

