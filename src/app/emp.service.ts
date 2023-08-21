import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iemp } from './module/emp';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  constructor(private _http: HttpClient) { }


  // create data
  // addEmployees(obj: any): Observable<Iemp[]> {
  //   return this._http.post<Iemp[]>(environment.baseUrl, obj)
  // }

  // firebase
  addEmployees(obj: any): Observable<Iemp[]> {
    return this._http.post<Iemp[]>(environment.FirebaseDB + "post.json", obj)
  }


  //////////////////////////////////////////////////////////

  // fetch data = getapi
  // getAllEmployees(): Observable<Iemp[]> {
  //   return this._http.get<Iemp[]>(environment.baseUrl)
  // }

  //firebase 
  getAllEmployees(): Observable<Iemp[]> {
    return this._http.get<Iemp[]>(environment.FirebaseDB + "post.json")
      .pipe(
        map(res => {
          let arr = []

          for (let key in res) {

            let obj: Iemp = {

              id: key,
              Fname: res[ key ].Fname,
              Lname: res[ key ].Lname,
              Contact: res[ key ].Contact,
              Email: res[ key ].Email,
              Gender: res[ key ].Gender,
              dob: res[ key ].dob,
              Experience: res[ key ].Experience,
              Education: res[ key ].Education,
              Company: res[ key ].Company,
            }
            arr.unshift(obj)
          }
          return arr
        })
      )
  }


  /////////////////////////////////////////////////////////////



  // delete data

  deleteEmployees(id: Iemp): Observable<Iemp> {
    return this._http.delete<Iemp>(`${environment.FirebaseDB}post/${id}/.json`)
  }



  /////////////////////////////////////////////////////////////

  //updatedata
  UpdateEmployees(id: Iemp, obj: Iemp): Observable<Iemp> {
    return this._http.patch<Iemp>(`${environment.FirebaseDB}post/${id}/.json`, obj)
  }



}
