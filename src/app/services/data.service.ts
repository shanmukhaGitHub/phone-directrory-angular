import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';

import { PhoneDataTableItem } from '../phone-data-table/phone-data-table.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  errorMessage:String[1];
  constructor(private http:HttpClient) { }

  public getPhoneNumberCombination(url): Observable<PhoneDataTableItem>{
    console.log('Service method call:'+url);
   return this.http.get<PhoneDataTableItem>(url)
   .pipe(
    catchError(this.handleError));
    
  }
  handleError(error: HttpErrorResponse){

    console.log(error.message);
    console.log(error);
    
    this.errorMessage = error.error.message;
    return throwError(error); 
    
    }
}
