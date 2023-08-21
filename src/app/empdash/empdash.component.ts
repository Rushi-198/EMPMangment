import { Component, OnInit } from '@angular/core';
import { AddeditempComponent } from '../addeditemp/addeditemp.component';
import { MatDialog } from '@angular/material/dialog';
import { EmpService } from '../emp.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Iemp } from '../module/emp';
import { SnackbarService } from '../snackbar.service';



@Component({
  selector: 'app-empdash',
  templateUrl: './empdash.component.html',
  styleUrls: [ './empdash.component.scss' ]
})
export class EmpdashComponent implements OnInit {

  displayedColumns: string[] = [

    // "id",
    "Fname",
    "Lname",
    "Contact",
    "Email",
    "dob",
    "Gender",
    "Experience",
    "Education",
    "Company",
    "Actions"

  ];


  dataSource!: MatTableDataSource<Iemp>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //snackbarservice: any;

  constructor(private dialog: MatDialog,
    private empservice: EmpService,
    private _snackbar: SnackbarService) { }


  ngOnInit(): void {

    this.getemplist()


  }


  openAddEditEmpForm() {
    const dialogRef = this.dialog.open(AddeditempComponent)
    dialogRef.afterClosed()
      .subscribe((res) => {
        //  console.log(res)
        if (res) {
          this.getemplist();   //save kala ki refresh hota
        }
      })
  }



  editEmp(data: Iemp) {
    const dialogRef = this.dialog.open(AddeditempComponent, {
      data,
    }); dialogRef.afterClosed()
      .subscribe((res) => {
        // console.log(res)
        if (res) {
          this.getemplist();   //save kala ki refresh hota
        }
      })
  }




  // getall
  getemplist() {
    this.empservice.getAllEmployees()
      .subscribe((res) => {
        console.log(res)
        // this.arr = res
        console.log(res, 'get data')

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator

        console.log(this.dataSource);

      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  deleteEmp(id: Iemp) {
    this.empservice.deleteEmployees(id)
      .subscribe(res => {
        alert("Employee deleted!")
        // this._snackbarservice.openSnackbar('post updated successfully....!!!')
        // console.log(res)
        // console.log(id)
        this.getemplist()  // for auto refresh data
      })
  }

}
