import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-patient-facing',
  templateUrl: './patient-facing.component.html',
  styleUrls: ['./patient-facing.component.css']
})
export class PatientFacingComponent implements OnInit {
  maxDate = new Date();
  isLoading = false;
  selectedGender: any;

  patientForm = this.theFormBuilder.group({
    name: ['', [Validators.required]],
    contactNumber: ['', [Validators.required, Validators.minLength(10)]],
    age: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    illness: ['']
  });

  constructor(
    private theFormBuilder: FormBuilder,
    private theDateAdapter: DateAdapter<Date>,
    private theAuthService: AuthServiceService,
    private theUiService: UiService
  ) {
      this.theDateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.theUiService.loadingStateChanged.subscribe(loadingState => {
      this.isLoading = loadingState;
    })
  }

  onGenderSelection(i: any) {
    console.log('gender selected: ' + i);
  }

  onSignUp() {
    // this.theAuthService.registerUser(
    //   {
    //     contactNumber: this.patientForm.value.contactNumber,
    //     age: this.patientForm.value.age
    //   }
    // );
    this.patientForm.controls['gender'].setValue(this.selectedGender);
    console.log(this.patientForm.value);
  }

  get name() {
    return this.patientForm.get('name');
  }

  get contactNumber() {
    return this.patientForm.get('contactNumber');
  }

  get age() {
    return this.patientForm.get('age');
  }

  get gender() {
    return this.patientForm.get('gender');
  }

  get illness() {
    return this.patientForm.get('illness');
  }

}
