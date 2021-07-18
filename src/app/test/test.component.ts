import { Component, OnInit } from '@angular/core';
import { GetPatientsService } from '../services/get-patients.service';
import { map } from 'rxjs/operators'
import { pipe } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'familyName',
    'birthDate',
    'gender', 
  ];

  dataSource = [] as any;
  constructor(
    private gpService: GetPatientsService
  ) { }

  data:Patient[] = [
    {
      firstName: 'Waseem',
      lastName: 'Hussain',
      familyName: 'Mughal',
      gender: 'Male',
      birthDate: '20/02/2020'
    }
  ];

  ngOnInit(): void {
    this.dataSource = [];
   this.gpService.getPatients()
     
   .subscribe((data) =>{
     //console.log(JSON.parse(JSON.stringify(data)).entry);
     this.createData(JSON.parse(JSON.stringify(data)).entry);
   });
 
  }


  createData(data: []){
    let newData:Patient[] = [];
    data.forEach(awd => {
      let resource = JSON.parse(JSON.stringify(awd));
      console.log(resource.resource);
      newData.push({
        firstName: resource.resource.name[0].given[0],
        lastName: resource.resource.name[0].given[1],
        familyName: resource.resource.name[0].family,
        gender: resource.resource.gender,
        birthDate: resource.resource.birthDate
      })
    });
    this.dataSource = newData;
  }

}
export interface Patient{
  firstName: String;
  lastName: String;
  familyName: String;
  birthDate: String;
  gender: String;
}