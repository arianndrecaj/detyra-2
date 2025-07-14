import { RouterOutlet } from '@angular/router';
import {ReactiveFormsModule, FormControl, FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {Component, inject} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {OCCUPATION_OPTIONS} from '../../option';
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from '@angular/material/expansion';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';
import {checkboxValidator} from '../validators/checkbox-validator';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatIcon, MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-test',
  imports: [RouterOutlet,MatIconModule, ReactiveFormsModule, MatButtonToggleGroup, MatButtonToggle, MatFormField, MatLabel, MatSelect, MatOption, MatInput, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatError, MatCheckbox, MatButton, MatDatepickerInput, MatDatepickerToggle, MatIcon, MatDatepicker,MatHint],
  templateUrl: './test.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './test.component.scss',
})
export class TestComponent {
  private _fb = inject(FormBuilder);
  occupationOptions = OCCUPATION_OPTIONS;
  currentStep = 0;

  constructor() {
    this.mainForm.valueChanges.subscribe(value => {
      console.log('Form changed:', value);
    });
  }

  ngOnInit() {
    const doctorGroup = this.mainForm.get('doctorInfo') as FormGroup;

    doctorGroup.get('checkbox')?.valueChanges.subscribe((checked: boolean) => {
      Object.entries(doctorGroup.controls).forEach(([key, control]) => {
        if (key === 'checkbox') return;

        if (checked) {
          control.setValue('');
          control.disable({ emitEvent: false });
        } else {
          control.enable({ emitEvent: false });
        }
      });
    });
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
      nachname: ['',Validators.required],
      strasse: ['',Validators.required],
      nr: ['',Validators.required],
      plz: ['',Validators.required],
      ort: ['',Validators.required],
      checkbox: [false],
    }, { validators: checkboxValidator() }),
    medicalTreatments: this._fb.group({
      choice: ['',Validators.required],
      choiceIfYes: this._fb.array([this.createChoiceIfYesGroup()])
    }),
    rejectedByInsurance: this._fb.group({
      choice: ['', Validators.required],
      reason: ['',Validators.required]
    }),
    misaligned: this._fb.group({
        misalignedTeeth: ['',Validators.required],
        misalignedJaw: ['',Validators.required],
        dentalTreatment: ['',Validators.required],
        dentalCheckUp: ['',Validators.required],
        dentalCleanUp: ['',Validators.required],
    }),
  })

  createChoiceIfYesGroup() {
    return this._fb.group({
      illness: ['', Validators.required],
      cured: ['', Validators.required],
      date: ['', Validators.required],
      doctorName: ['', Validators.required],
      doctorSpeciality: ['', Validators.required],
      doctorStreet: ['', Validators.required],
      doctorNumber: ['', Validators.required],
      doctorZipCode: ['', Validators.required],
      doctorCity: ['', Validators.required],    });
  }

  get choiceIfYes() {
    return this.mainForm.get('medicalTreatments.choiceIfYes') as FormArray;
  }

  addChoiceIfYes() {
    const arr = this.choiceIfYes;
    if (arr.length === 0 || arr.at(arr.length - 1).valid) {
      arr.push(this.createChoiceIfYesGroup());
    } else {
      alert('Please fill out the current treatment before adding a new one.');
    }
  }

  removeChoiceIfYes(index: number) {
    const arr = this.choiceIfYes;
    if (arr.length > 1) {
      arr.removeAt(index);
    } else {
      alert('Cannot remove the last treatment entry.');
    }
  }

  canAddChoiceIfYes(): boolean {
    const arr = this.choiceIfYes;
    return arr.length === 0 || arr.at(arr.length - 1).valid;
  }

  hasRequiredValidation(path: string) {
    const control = this.mainForm.get(path);
    return control?.hasError('required') && control?.touched;
  }

  get isCheckboxChecked() {
    return this.mainForm.get('doctorInfo.checkbox')?.value;
  }

  goToNextStep() {
    const stepKeys = Object.keys(this.mainForm.controls);
    const currentGroup = this.mainForm.get(stepKeys[this.currentStep]);
    if (this.isQuestionComplete(stepKeys[this.currentStep])) {
      this.currentStep++;
    } else if (currentGroup?.valid) {
      this.currentStep++;
    } else {
      currentGroup?.markAllAsTouched();
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  isQuestionComplete(questionPath: string): boolean {
    const questionGroup = this.mainForm.get(questionPath) as FormGroup;
    if (!questionGroup) return false;

    if (questionPath === 'medicalTreatments') {
      const choice = questionGroup.get('choice')?.value;
      if (choice === '1') {
        return questionGroup.get('choice')?.valid === true;
      }
    }

    const checkboxControl = questionGroup.get('checkbox');
    if (checkboxControl && checkboxControl.value === true) {
      return true;
    }

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
