import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PhoneDataTableItem } from '../phone-data-table/phone-data-table.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  public getPhoneNumberCombination(url): Observable<PhoneDataTableItem>{
    console.log('Service method call:'+url);
   return this.http.get<PhoneDataTableItem>(url);
    ;
  }
}
