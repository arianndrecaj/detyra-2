import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatError, MatFormField, MatInput, MatInputModule} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatNativeDateModule, MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {
  DRUGS_HOW_OFTEN_OPTIONS,
  INTERVAL_OPTIONS,
  OCCUPATION_OPTIONS,
  TEETH1_OPTIONS,
  TEETH2_OPTIONS,
  TEETH3_OPTION,
  TEETH4_OPTION,
  TEETH5_OPTIONS,
  TEETH6_OPTIONS
} from '../../option';
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from '@angular/material/expansion';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';
import {checkboxValidator} from '../validators/checkbox-validator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-test',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatError,
    MatCheckbox,
    MatButton,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOption,
    MatSelect
  ],
  templateUrl: './test.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit {
  private _fb = inject(FormBuilder);
  currentStep = 0;
  maxReachedStep = 0;
  returnStep: number | null = null;
  imagePreview: string[] = [];
  selectedFile: File | null = null;
  minDate: Date;
  NAME_PATTERN = /^[a-zA-ZäöüÄÖÜß\s]+$/;
  NUMBER_PATTERN = /^\d*\.?\d*$/;
  ZIP_PATTERN = /^\d{5}(?:[-\s]\d{4})?$/;
  occupationOptions = OCCUPATION_OPTIONS;
  intervalOptions = INTERVAL_OPTIONS;
  teethOptions1 = TEETH1_OPTIONS;
  teethOptions2 = TEETH2_OPTIONS;
  teethOptions3 = TEETH3_OPTION;
  teethOptions4 = TEETH4_OPTION;
  teethOptions5 = TEETH5_OPTIONS;
  teethOptions6 = TEETH6_OPTIONS;
  drugOptions = DRUGS_HOW_OFTEN_OPTIONS;

  invalidSteps: Set<number> = new Set();

  constructor(private router: Router) {
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 1);
  }

  ngOnInit() {
    this.mainForm.valueChanges.subscribe(() => {
      this.updateInvalidSteps();
      const completed = Object.entries(this.mainForm.controls).reduce((acc, [key, control]) => {
        if (this.isQuestionComplete(key)) {
          acc[key] = control.value;
        }
        return acc;
      }, {} as any);
      console.log('Completed form groups:', completed);
    });

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

    this.updateInvalidSteps();
    this.mainForm.reset();
    this.currentStep = 0;
    this.maxReachedStep = 0;
  }

  mainForm = this._fb.group({
    everBeenInsuredWithHelsana: this._fb.group({
      answer: ['', Validators.required],
    }),
    personalInfo: this._fb.group({
      occupation: ['', Validators.required],
      grosse: ['', [Validators.required, Validators.pattern(this.NUMBER_PATTERN)]],
      gewicht: ['', [Validators.required, Validators.pattern(this.NUMBER_PATTERN)]],
      bmi: ['', [Validators.required, Validators.pattern(this.NUMBER_PATTERN)]],
    }),
    doctorInfo: this._fb.group({
      vorname: ['', [Validators.required, Validators.pattern(this.NAME_PATTERN)]],
      nachname: ['', [Validators.required, Validators.pattern(this.NAME_PATTERN)]],
      strasse: ['', Validators.required],
      nr: ['', [Validators.required, Validators.pattern(this.NUMBER_PATTERN)]],
      plz: ['', [Validators.required, Validators.pattern(this.NUMBER_PATTERN)]],
      ort: ['', [Validators.required, Validators.pattern(this.NUMBER_PATTERN)]],
      checkbox: [false],
    }, { validators: checkboxValidator() }),
    medicalTreatments: this._fb.group({
      choice: ['', Validators.required],
      choiceIfYes: this._fb.array([this.createChoiceIfYesGroup()])
    }),
    rejectedByInsurance: this._fb.group({
      choice: ['', Validators.required],
      reason: ['',[Validators.required,Validators.pattern(this.NAME_PATTERN)]],
    }),
    misaligned: this._fb.group({
      misalignedTeeth: ['', Validators.required],
      misalignedJaw: ['', Validators.required],
      dentalTreatment: ['', Validators.required],
      dentalCheckUp: ['', Validators.required],
      dentalCleanUp: ['', Validators.required],
    }),
    disability: this._fb.group({
      choice: ['', Validators.required],
      ifDisabilityYes: this._fb.array([this.createIfDisability()])
    }),
    medications: this._fb.group({
      choice: ['', Validators.required],
      ifTakingMeds: this._fb.array([this.createIfTakingMeds()])
    }),
    drugs: this._fb.group({
      choice: ['', Validators.required],
      doYouTakeDrugs: ['',Validators.required],
      ifTakingDrugs: this._fb.array([this.createIfTakingDrugs()]),
      dailyCigar: ['', Validators.required],
      dailyAlcohol: ['', Validators.required],
    }),
    furtherQuestions: this._fb.group({
      choice: ['', Validators.required],
      pregnancyExpected: ['',Validators.required],
    }),
    medicalReport: this._fb.group({
      uploadedReport: [null, Validators.required],
    }),
    dentalCheckUp: this._fb.group({
      checkUpDate: ['', Validators.required],
    }),
    teethDisease: this._fb.group({
      choice: ['', Validators.required],
      whichOne: ['',Validators.required],
    }),
    upToDateCheckUp: this._fb.group({
      choice: ['', Validators.required],
      whatIntervals: ['',Validators.required],
    }),
    treatmentPlanned: this._fb.group({
      choice: ['', Validators.required],
      whenIsTreatmentPlanned: ['',Validators.required],
    }),
    abrasionsOrErosions: this._fb.group({
      choice: ['', Validators.required],
      whichOne: ['',Validators.required],
    }),
    misalignmentTeethOrJaw: this._fb.group({
      choice: ['', Validators.required],
      whatTypeOfMisalignment: ['',Validators.required],
    }),
    areFillingsPresent: this._fb.group({
      choice: ['', Validators.required],
      conditionOfFillings: [''],
    }),
    fixedOrRemovedDenture: this._fb.group({
      choice: ['', Validators.required],
      conditionOfRemovedDenture: [''],
    }),
    oralHygiene: this._fb.group({
      conditionOfOralHygiene: ['', Validators.required],
    }),
    periodontium: this._fb.group({
      conditionOfPeriodontium: ['', Validators.required],
    }),
    missingUnReplacedTeeth: this.createTeethGroup(),
    decayedTeeth: this.createTeethGroup(),
    rootCanalTreatedTeeth: this.createTeethGroup(),
    accidentDamagedTeeth: this.createTeethGroup(),
  });

  createTeethGroup(): FormGroup {
    return this._fb.group({
      choice: ['', Validators.required],
      markTeeth: [''],
      markTeeth2: [''],
      markTeeth3: [''],
      markTeeth4: [''],
      markTeeth5: [''],
      markTeeth6: [''],
    });
  }

  createIfTakingDrugs() {
    const drugsGroup = this._fb.group({
      whichOne: ['',Validators.required],
      howOften: ['',Validators.required],
      startDate: ['',Validators.required],
      endDate: [''],
      checkbox: [false],
    });
    this.checkBoxEndDate(drugsGroup);
    return drugsGroup;
  }

  createIfTakingMeds() {
    const medGroup = this._fb.group({
      typeOfMed: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      checkbox: [false],
    });
    this.checkBoxEndDate(medGroup);
    return medGroup;
  }

  createIfDisability() {
    return this._fb.group({
      typeOfDisability: ['', [Validators.required, Validators.pattern(this.NAME_PATTERN)]],
      uploadIV: ['', Validators.required],
    });
  }

  createChoiceIfYesGroup() {
    return this._fb.group({
      illness: ['', [Validators.required, Validators.pattern(this.NAME_PATTERN)]],
      cured: ['', Validators.required],
      date: ['', Validators.required],
      doctorName: ['', [Validators.required, Validators.pattern(this.NAME_PATTERN)]],
      doctorSpeciality: ['', [Validators.required, Validators.pattern(this.NAME_PATTERN)]],
      doctorStreet: ['', [Validators.required,Validators.pattern(this.NAME_PATTERN)]],
      doctorNumber: ['', [Validators.required,Validators.pattern(this.NUMBER_PATTERN)]],
      doctorZipCode: ['', [Validators.required, Validators.pattern(this.ZIP_PATTERN)]],
      doctorCity: ['', [Validators.required, Validators.pattern(this.NAME_PATTERN)]],
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
      alert('Bitte füllen Sie den aktuellen Eintrag aus, bevor Sie einen neuen hinzufügen.');
    }
  }

  removeFromFormArray(path: string, index: number) {
    const arr = this.getFormArray(path);
    if (arr.length > 1) {
      arr.removeAt(index);
    } else {
      alert('Der letzte Eintrag kann nicht entfernt werden.');
    }
  }

  canAddToFormArray(path: string): boolean {
    const arr = this.getFormArray(path);
    return arr.length === 0 || arr.at(arr.length - 1).valid;
  }

  hasRequiredValidation(path: string) {
    const control = this.mainForm.get(path);
    return (control?.hasError('required') || control?.hasError('pattern')) && control?.touched;
  }

  getCheckboxValue(path: string): boolean {
    const control = this.mainForm.get(path);
    return control?.value === true;
  }

  private checkBoxEndDate(group: FormGroup, checkboxName: string = 'checkbox', endDateName: string = 'endDate') {
    const checkboxControl = group.get(checkboxName);
    const endDateControl = group.get(endDateName);

    checkboxControl?.valueChanges.subscribe(checked => {
      if (checked) {
        endDateControl?.clearValidators();
        endDateControl?.setValue('');
        endDateControl?.disable({ emitEvent: false });
      } else {
        endDateControl?.setValidators([Validators.required]);
        endDateControl?.enable({ emitEvent: false });
      }
      endDateControl?.updateValueAndValidity({ emitEvent: false });
    });
  }

  private updateInvalidSteps() {
    this.invalidSteps.clear();
    const stepKeys = Object.keys(this.mainForm.controls);
    stepKeys.forEach((key, index) => {
      if (!this.isQuestionComplete(key)) {
        this.invalidSteps.add(index);
      }
    });
  }

   goNext(){
    const stepKeys = Object.keys(this.mainForm.controls);
    const currentGroup = this.mainForm.get(stepKeys[this.currentStep]);

    if (this.isQuestionComplete(stepKeys[this.currentStep]) && this.arePreviousStepsValid()) {
      this.advanceStep();
      this.scrollToStep(this.currentStep);
    } else {
      currentGroup?.markAllAsTouched();
      this.handleInvalidSteps();
    }
  }

  private arePreviousStepsValid(): boolean {
    const stepKeys = Object.keys(this.mainForm.controls);
    for (let i = 0; i < this.currentStep; i++) {
      if (!this.isQuestionComplete(stepKeys[i])) {
        return false;
      }
    }
    return true;
  }

  private advanceStep() {
    if (this.returnStep !== null && this.returnStep > this.currentStep) {
      this.currentStep = this.returnStep;
      this.returnStep = null;
    } else {
      this.currentStep++;
      this.maxReachedStep = Math.max(this.maxReachedStep, this.currentStep);
    }
  }

  private scrollToStep(step: number) {
    setTimeout(() => {
      const el = document.getElementById(`step-${step}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const firstInvalidField = el.querySelector('.has-error input, .has-error select');
        if (firstInvalidField) {
          (firstInvalidField as HTMLElement).focus();
        }
      }
    }, 200);
  }

  private handleInvalidSteps() {
    if (!this.arePreviousStepsValid()) {
      this.returnStep = this.currentStep;
      const firstInvalidStep = Array.from(this.invalidSteps).sort((a, b) => a - b)[0];
      if (firstInvalidStep !== undefined) {
        this.currentStep = firstInvalidStep;
        this.scrollToStep(this.currentStep);
      }
    }
  }

  scrollToSubQuestion(formPath: string, elementId: string): void {
    const value = this.mainForm.get(formPath)?.value;
    if (value === 'Ja') {
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.returnStep = null;
      this.scrollToStep(this.currentStep);
    }
  }

  isQuestionComplete(questionPath: string): boolean {
    const group = this.mainForm.get(questionPath) as FormGroup;
    if (!group) return false;

    const choiceControl = group.get('choice');
    const checkboxControl = group.get('checkbox');

    if (choiceControl?.value === 'Nein') {
      return choiceControl.valid;
    }

    if (checkboxControl?.value === true) {
      return true;
    }

    const teethPaths = [
      'missingUnReplacedTeeth',
      'decayedTeeth',
      'rootCanalTreatedTeeth',
      'accidentDamagedTeeth'
    ];

    if (teethPaths.includes(questionPath) && choiceControl?.value === 'Ja') {
      const teethControls = [
        'markTeeth', 'markTeeth2', 'markTeeth3',
        'markTeeth4', 'markTeeth5', 'markTeeth6'
      ];
      return teethControls.some(name => group.get(name)?.value?.length > 0);
    }

    if (questionPath === 'drugs') {
      const doYouTakeDrugs = group.get('doYouTakeDrugs')?.value;
      if (doYouTakeDrugs === 'Nein') {
        const otherValid = Object.entries(group.controls)
          .filter(([key]) => key !== 'ifTakingDrugs')
          .every(([, ctrl]) => ctrl.valid);
        return otherValid;
      }
      if (doYouTakeDrugs !== 'Ja') {
        return false;
      }
    }
    return group.valid;
  }

  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
      this.imagePreview[index] = file.name;
    }
  }

  removeNullJSON(obj: any): any {
    if (obj === null || obj === undefined) {
      return undefined;
    }

    if (Array.isArray(obj)) {
      const cleanedArray = obj
        .map(item => this.removeNullJSON(item))
        .filter(item => item !== undefined);
      return cleanedArray.length ? cleanedArray : undefined;
    }

    if (typeof obj === 'object') {
      const cleanedObj: any = {};
      for (const [key, value] of Object.entries(obj)) {
        const cleanedValue = this.removeNullJSON(value);
        if (cleanedValue !== undefined) {
          cleanedObj[key] = cleanedValue;
        }
      }
      return Object.keys(cleanedObj).length ? cleanedObj : undefined;
    }

    return obj;
  }


  finishedForm() {
    const stepKeys = Object.keys(this.mainForm.controls);
    const finalStep = stepKeys[stepKeys.length - 1];
    const finalGroup = this.mainForm.get(finalStep);

    if (this.isQuestionComplete(finalStep) && this.arePreviousStepsValid() && this.invalidSteps.size === 0) {
      const rawValue = this.mainForm.getRawValue();

      const cleanedValue = this.removeNullJSON(rawValue);

      console.log('Submitting cleaned form data:', cleanedValue);

      this.router.navigate(['/success']).then(success => {
        if (success) {
          console.log('Navigation succeded!');
        } else {
          console.log('Navigation failed');
        }
      });
      this.mainForm.reset();
      this.currentStep = 0;
      this.maxReachedStep = 0;
      this.returnStep = null;
    } else {
      finalGroup?.markAllAsTouched();
      this.handleInvalidSteps();
      this.scrollToStep(this.currentStep);
    }
  }


}
