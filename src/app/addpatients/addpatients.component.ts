import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { GetPatientsService } from '../services/get-patients.service';

@Component({
  selector: 'app-addpatients',
  templateUrl: './addpatients.component.html',
  styleUrls: ['./addpatients.component.css']
})
export class AddpatientsComponent implements OnInit {
  
  genders: Gender[] = [
    {
      value: 'male',
      viewValue: 'Male'
    },
    {
      value: 'female',
      viewValue: 'Female'
    },
    {
      value: 'other',
      viewValue: 'Other'
    }
  ];

  loading:boolean = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  
  constructor(private fb: FormBuilder, private gpService: GetPatientsService, private router: Router) { }

  ngOnInit(): void {
    this.form.statusChanges.subscribe(
      console.log
    );
  }

  form = this.fb.group({
    firstName: ['Waseem', Validators.required],
    lastName: ['Hussain', Validators.required],
    familyName: ['Mughal', Validators.required],
    gender: ['male', Validators.required],
    birthDate: ['', Validators.required],

  });

  submit(){
    //this.loading = true;
    //console.log(this.form.get('birthDate')?.value);
    
    //console.log(fdate);
    var data = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      familyName: this.form.get('familyName')?.value,
      gender: this.form.get('gender')?.value,
      birthDate: this.formatDate(this.form.get('birthDate')?.value)
    };
    console.log(data);
   // console.log(this.modelFhirResource(data));
    this.gpService.savePatient(this.modelFhirResource(data)).subscribe((data)=>{
      //console.log(data)
      this.router.navigateByUrl('/');
    });


  }


  formatDate (date:any) {
   // var bdate = new Date( this.form.get('birthDate')?.value); 
    var bdate = new Date(date); 
    var fmonth;
    if((bdate.getMonth()+1).toString().length > 1){
      fmonth =   (bdate.getMonth()+1).toString();
    }else{
      fmonth =   '0' + (bdate.getMonth()+1).toString();
    }
    var fdate = bdate.getFullYear()+'-'+fmonth+'-'+this.fixDateZero(bdate.getDate());
    return fdate;
  }

  fixDateZero(date:any){
    var nDate;
    if(date.toString().length > 1){
      nDate  = date.toString();
    } else{
      nDate = '0' + date.toString();
    }
    return nDate;
  } 


  modelFhirResource(data:any){
    var date = new Date(data.birthDate);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var div = `
      <div xmlns=\"http://www.w3.org/1999/xhtml\">
        <div class=\"hapiHeaderText\">
          `+data.firstName +' '+data.lastName+` <b>`+data.familyName+` </b>
        </div>
        <table class=\"hapiPropertyTable\">
          <tbody>
            <tr>
              <td>Date of birth</td>
              <td><span>`+ this.fixDateZero(date.getDate())+' '+monthNames[date.getMonth()]+' '+ date.getFullYear()+ `</span></td>
            </tr>
          </tbody>
        </table>
      </div>`;
    var patient = {
      "resourceType": "Patient",
      "id": "1",
      "meta": {
        "versionId": "1",
        "lastUpdated": "2021-06-14T05:02:59.611+00:00",
        "source": "#ylvkCWOdtIyeJNfX"
      },
      "text": {
        "status": "generated",
        "div": div
      },
      "active": true,
      "name": [ {
        "use": "official",
        "family": data.familyName,
        "given": [ data.firstName,  data.lastName]
      }, {
        "use": "usual",
        "given": [  data.firstName ]
      } ],
      "gender": data.gender,
      "birthDate": data.birthDate
    };    
    return patient; 
  }
}

export interface Gender {
  value: string;
  viewValue: string;
}


 