import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataService } from '../services/data.service';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export interface PhoneDataTableItem{
  count:Number;
  phoneLists:String[];
}

@Component({
  selector: 'app-phone-data-table',
  templateUrl: './phone-data-table.component.html',
  styleUrls: ['./phone-data-table.component.css']
})


export class PhoneDataTableComponent implements  OnInit {
  errorMessage:String;
  isError = false;
  isValidFormSubmitted = false;
  name = new FormControl('');
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  dataSource: MatTableDataSource<String>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'Phone_Numbers'];

  ngOnInit() {
    this.dataSource =new MatTableDataSource(any);
    }

    onFormSubmit(form: NgForm) {
      this.isValidFormSubmitted = false;
      if (form.invalid) {
         return;
      }
      this.isValidFormSubmitted = true;
      this.name = form.value;
      this.getPhoneNumberCombination();
      form.resetForm();
   }

  
  url="http://localhost:8080/generatePhoneCombinations";
 
  isServiceCalled: boolean;
  
  constructor(private service:DataService) {
    this.isServiceCalled= false;
    
   }

   public getPhoneNumberCombination(){
    this.isServiceCalled=false;
    console.log(this.name.value);
    this.url =  this.url;
    this.url = this.url+'/'+this.name.value;
    errorMessage:String[1];
    console.log('URL:'+this.url);
     this.service.getPhoneNumberCombination(this.url)
     .pipe(
     catchError(this.handleError))
     .subscribe((data)=>{
     this.dataSource =new MatTableDataSource(data.phoneLists);
     this.dataSource.paginator = this.paginator;
     this.isError=false;
    
   //  this.dataSource.sort = this.sort;
       })
     
     
     ;
    this.url="http://localhost:8080/generatePhoneCombinations"; 
    this.isServiceCalled=true;    
     
   } 
   handleError(error: HttpErrorResponse){

    console.log(error.message);
    console.log(error);
    
    this.errorMessage = error.error.message;
    this.isError= true;
    this.isServiceCalled= false;
    return throwError( this.errorMessage); 
    
    }
 
}
