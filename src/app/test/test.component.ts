import { RouterOutlet } from '@angular/router';
import {
  ReactiveFormsModule,
  FormControl,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl
} from '@angular/forms';
import {Component, inject} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {OCCUPATION_OPTIONS, INTERVAL_OPTIONS} from '../../option';
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from '@angular/material/expansion';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';
import {checkboxValidator} from '../validators/checkbox-validator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-test',
  imports: [RouterOutlet, MatIconModule,MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonToggleGroup, MatButtonToggle, MatFormField, MatLabel, MatSelect, MatOption, MatInput, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatError, MatCheckbox, MatButton, MatHint,MatDatepickerModule, MatNativeDateModule],
  templateUrl: './test.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './test.component.scss',
})
export class TestComponent {
  private _fb = inject(FormBuilder);
  file: File | null = null;
  imagePreview: string[] = [];
  minDate: Date;
  occupationOptions = OCCUPATION_OPTIONS;
  intervalOptions = INTERVAL_OPTIONS;
  currentStep = 0;

  onFileSelected(event: Event,  index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (index === 0) {
        this.file = file;
      }
      this.file = file;
      this.imagePreview[index] = file.name;
    }
  }

  constructor() {
    this.mainForm.valueChanges.subscribe(value => {
      console.log('Form changed:', value);
    });

    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 1);
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
    disability: this._fb.group({
      choice: ['',Validators.required],
      ifDisabilityYes: this._fb.array([this.createIfDisability()])
    }),
    medications: this._fb.group({
      choice: ['',Validators.required],
      ifTakingMeds: this._fb.array([this.createIfTakingMeds()])
    }),
    drugs: this._fb.group({
      choice: ['', Validators.required],
      doYouTakeDrugs: [''],
      ifTakingDrugs: this._fb.array([this.createIfTakingDrugs()]),
      dailyCigar: ['',Validators.required],
      dailyAlcohol: ['',Validators.required],
    }),
    furtherQuestions: this._fb.group({
      choice: ['', Validators.required],
      pregnancyExpected: ['', Validators.required],
    }),
    medicalReport: this._fb.group({
      uploadedReport: ['',Validators.required],
    }),
    dentalCheckUp: this._fb.group({
      checkUpDate: ['',Validators.required],
    }),
    teethDisease: this._fb.group({
      choice: ['', Validators.required],
      whichOne: ['',Validators.required],
    }),
    upToDateCheckUp: this._fb.group({
      choice: ['', Validators.required],
      whatIntervals: ['', Validators.required],
    }),
    treatmentPlanned: this._fb.group({
      choice: ['', Validators.required],
      //qtu ke met
    })
  })

  createIfTakingDrugs() {
    const drugsGroup = this._fb.group({
      whichOne: ['', Validators.required],
      howOften: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      checkbox: [false],
    })
    drugsGroup.get('checkbox')?.valueChanges.subscribe(checked => {
      if (checked) {
        drugsGroup.get('endDate')?.disable();
        drugsGroup.get('endDate')?.setValue('');
      } else {
        drugsGroup.get('endDate')?.enable();
      }
    });
    return drugsGroup;
  }

  createIfTakingMeds() {
    const medGroup = this._fb.group({
      typeOfMed: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [{ value: '', disabled: false }],
      checkbox: [false]
    });
    medGroup.get('checkbox')?.valueChanges.subscribe(checked => {
      if (checked) {
        medGroup.get('endDate')?.disable();
        medGroup.get('endDate')?.setValue('');
      } else {
        medGroup.get('endDate')?.enable();
      }
    });
    return medGroup;
  }

  createIfDisability(){
    return this._fb.group({
      typeOfDisability: ['', Validators.required],
      uploadIV: ['',Validators.required],
    });
  }

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
      doctorCity: ['', Validators.required],
    });
  }

  getFormArray(path: string): FormArray {
    return this.mainForm.get(path) as FormArray;
  }

  addToFormArray(path: string, createGroupFn: () => FormGroup) {
    const arr = this.getFormArray(path);
    if (arr.length === 0 || arr.at(arr.length - 1).valid) {
      arr.push(createGroupFn());
    } else {
      alert('Please fill out the current entry before adding a new one.');
    }
  }

  removeFromFormArray(path: string, index: number) {
    const arr = this.getFormArray(path);
    if (arr.length > 1) {
      arr.removeAt(index);
    } else {
      alert('Cannot remove the last entry.');
    }
  }

  canAddToFormArray(path: string): boolean {
    const arr = this.getFormArray(path);
    return arr.length === 0 || arr.at(arr.length - 1).valid;
  }

  hasRequiredValidation(path: string) {
    const control = this.mainForm.get(path);
    return control?.hasError('required') && control?.touched;
  }

  getCheckboxValue(path: string): boolean {
    const control = this.mainForm.get(path);
    return control?.value === true;
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
    const group = this.mainForm.get(questionPath) as FormGroup;
    if (!group) return false;

    const choiceControl = group.get('choice');
    if (choiceControl?.value === 'Nein') {
      return choiceControl.valid;
    }

    const checkboxControl = group.get('checkbox');
    if (checkboxControl?.value === true) {
      return true;
    }

    const isValidRecursively = (ctrl: AbstractControl, parent?: FormGroup): boolean => {
      if (ctrl instanceof FormGroup) {
        return Object.entries(ctrl.controls).every(([key, childCtrl]) => {
          if (key === 'endDate' && ctrl.get('checkbox')?.value === true) {
            return true;
          }
          return isValidRecursively(childCtrl, ctrl);
        });
      }

      if (ctrl instanceof FormArray) {
        return ctrl.controls.every(item => isValidRecursively(item));
      }

      return ctrl.valid;
    };

    if (questionPath === 'drugs') {
      const doYouTakeDrugs = group.get('doYouTakeDrugs')?.value;
      if (doYouTakeDrugs === 'Ja') {
        const formArray = group.get('ifTakingDrugs') as FormArray;
        const arrayValid = formArray.controls.every(item => isValidRecursively(item));
        return group.valid && arrayValid;
      }
    }

    return isValidRecursively(group);
  }


}
