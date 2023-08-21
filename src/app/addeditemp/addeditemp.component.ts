import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpService } from '../emp.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../snackbar.service';
import { Iemp } from '../module/emp';

@Component({
  selector: 'app-addeditemp',
  templateUrl: './addeditemp.component.html',
  styleUrls: [ './addeditemp.component.scss' ]
})
export class AddeditempComponent implements OnInit {

  EmpForm !: FormGroup;

  constructor(private empservice: EmpService,
    private dialogRef: MatDialogRef<AddeditempComponent>, private _snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public obj: any) { }



  ngOnInit(): void {
    this.EmpForm = new FormGroup({
      Fname: new FormControl(null, Validators.required),
      Lname: new FormControl(null, Validators.required),
      Contact: new FormControl(null, Validators.required),
      Email: new FormControl(null, Validators.required),
      Gender: new FormControl(null, Validators.required),
      Experience: new FormControl(null, Validators.required),
      Education: new FormControl(null, Validators.required),
      Company: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required)
    })

    this.EmpForm.patchValue(this.obj)
  }



  education: string[] = [
    "matric", "Diploma", "Graduate", "PostGraduate"
  ]



  OnFormSubmit() {
    if (this.EmpForm.valid) {
      console.log(this.EmpForm.value)
      if (this.obj) {
        this.empservice.UpdateEmployees(this.obj.id, this.EmpForm.value)
          .subscribe((res) => {
            // console.log(res)
            // this.arr = res
            //  console.log(this.arr)
            // this.arr.unshift(res)
            alert("data successfully Updated");
            this.dialogRef.close(true)
            // console.log(this.EmpForm.value)
          },
            (err) => {
              console.log(err)
              alert("data is wrong")
            })
      } else {
        this.empservice.addEmployees(this.EmpForm.value)
          .subscribe((res) => {
            console.log(res)
            // this.arr = res
            //  console.log(this.arr)
            // this.arr.unshift(res)

            alert("data successfully added");
            this.dialogRef.close(true)
            // console.log(this.EmpForm.value)
          },
            (err) => {
              console.log(err)
              alert("data is wrong")
            })
      }
    }
  }


  //   this.empservice.addEmployees(this.EmpForm.value)
  //     .subscribe((res) => {
  //       console.log(res)
  //       // this.arr = res
  //       //  console.log(this.arr)
  //       // this.arr.unshift(res)

  //       alert("data successfully added");
  //       this.dialogRef.close(true)
  //       // console.log(this.EmpForm.value)

  //     },
  //       (err) => {
  //         console.log(err)
  //         alert("data is wrong")
  //       })

  //   console.log(this.obj);
  // }

  get f() {
    return this.EmpForm.controls
  }




}
