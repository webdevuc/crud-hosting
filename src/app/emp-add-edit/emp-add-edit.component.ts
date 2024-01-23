import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';
import { Country } from '../Model/country';
import { State } from '../Model/state';
import { City } from '../Model/city';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  listcountry!: Country[];
  countrySelected!: string;
  listState!: State[];
  selectedState!: string;
  listCity!: City[];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      // company: '',
      // experience: '',
      // package: '',
      Mobile: '',
      Address: '',
      Pincode: '',
      countrySelected: '',
      selectedState: '',
      selectedCity: '',
    });
  }

  fetchCountry() {
    this._coreService.getCountry().subscribe((data) => {
      this.listcountry = data;
      console.log('Countries fetched', this.listcountry);
    });
  }

  onCountrySelected(countryIso: any) {
    console.log(countryIso, 'countryIso');
    this.countrySelected = countryIso;
    this._coreService
      .getStateOfSelectedCountry(countryIso)
      .subscribe((data) => {
        this.listState = data;
        console.log('States Retrieved', this.listState);
      });
  }

  onStateSelected(event: any,) {
    console.log(event, '<================ event');
    this.selectedState = event;
    this._coreService
      .getCitiesOfSelectedState(this.countrySelected, this.selectedState)
      .subscribe((data) => {
        this.listCity = data;
        console.log('Cities retrieved', this.listCity);
      });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.fetchCountry();
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
