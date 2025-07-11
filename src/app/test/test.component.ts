import { RouterOutlet } from '@angular/router';
import {ReactiveFormsModule, FormControl, FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {Component, inject} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {OCCUPATION_OPTIONS} from '../../option';
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from '@angular/material/expansion';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-test',
  imports: [RouterOutlet, ReactiveFormsModule, MatButtonToggleGroup, MatButtonToggle, MatFormField, MatLabel, MatSelect, MatOption, MatInput, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatError, MatCheckbox],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  private _fb = inject(FormBuilder);
  occupationOptions = OCCUPATION_OPTIONS;

  constructor() {
    this.mainForm.valueChanges.subscribe(value => {
      console.log('Form changed:', value);
    });
  }

  ngOnInit() {
    this.mainForm.get('question1.answer')?.valueChanges.subscribe(() => {
      if (this.isQuestionComplete('question1')) {
        this.mainForm.get('personalInfo')?.enable({ emitEvent: false });
      } else {
        this.mainForm.get('personalInfo')?.disable({ emitEvent: false });
      }
    });

    if (!this.isQuestionComplete('question1')) {
      this.mainForm.get('personalInfo')?.disable({ emitEvent: false });
    }
  }

  mainForm = this._fb.group({
    question1: this._fb.group({
      answer: ['', Validators.required],
    }),
    personalInfo: this._fb.group({
      occupation: ['',Validators.required],
      grosse: ['',Validators.required],
      gewicht: ['',Validators.required],
      bmi: ['',Validators.required],
    }),
    doctorInfo: this._fb.group({
      vorname: ['',Validators.required],
      nachname: ['', Validators.required],
      strasse: ['',Validators.required],
      nr: ['',Validators.required],
      plz: ['',Validators.required],
      ort: ['',Validators.required],
    }),
  })

  hasRequiredValidation(path: string) {
    const control = this.mainForm.get(path);
    return control?.hasError('required') && control?.touched;
  }

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
