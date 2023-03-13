import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { HttpService } from 'src/app/shared/http.service';
import { UiService } from 'src/app/shared/ui.service';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';


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
    private theUiService: UiService,
    private theHttpService: HttpService,
    private diaglog: MatDialog
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

  onGenderSelection(event: any) {
    this.patientForm.controls['gender'].setValue(event.value);
  }

  onSubmit() {
    this.getTokenNumberAndSavePatientData();
  }

  getTokenNumberAndSavePatientData() {
    this.theHttpService.get('https://doctor-appointmentapp-default-rtdb.asia-southeast1.firebasedatabase.app/patientsData.json')
    .subscribe(response => {
      let arr = [];
      for (let data in response) {
        arr.push(data);
      }
      this.savePatientData(arr.length+1);
    });
  }

  savePatientData(tokenNumber: number) {
    this.theHttpService.post('https://doctor-appointmentapp-default-rtdb.asia-southeast1.firebasedatabase.app/patientsData.json', {
      ...this.patientForm.value,
      'date': new Date(),
      'tokenNumber': tokenNumber,
    }).subscribe(response => {
      this.showSuccessModal(tokenNumber);
    });
  }

  showSuccessModal(tokenNumber: number) {
    const dialogRef = this.diaglog.open(ConfirmationModalComponent, {
      data: {
        confirmationHeader: 'Data saved successfully!',
        confirmationMessage: `Your token number is ${tokenNumber}!`,
        rightButtonText: '',
        leftButtonText: 'Okay'
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
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
