import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataService } from '../services/data.service';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';


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

  isValidFormSubmitted = false;
  name = new FormControl('');
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  dataSource: MatTableDataSource<String>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'Phone_Numbers'];

  ngOnInit() {
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
    this.url = this.url+'/'+this.name.value;
    console.log('URL:'+this.url+'/'+this.name.value);
     this.service.getPhoneNumberCombination(this.url).subscribe((data)=>{
     
      console.log(data.phoneLists);
     this.dataSource =new MatTableDataSource(data.phoneLists);
     this.dataSource.paginator = this.paginator;
   //  this.dataSource.sort = this.sort;
     

     });
    this.url="http://localhost:8080/v1/generatePhoneCombinations"; 
     this.isServiceCalled=true;    
   } 

 
}
