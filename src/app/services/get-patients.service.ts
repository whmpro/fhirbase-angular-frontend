import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetPatientsService {

  constructor(
    private http: HttpClient
  ) { }

  getPatients(){
    return this.http.get('http://localhost:8080/fhir/Patient');
  }

  savePatient(data:any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/fhir+json',
      }); 
    let options = {headers: headers};
    return this.http.post<any>('http://localhost:8080/fhir/Patient',data, options);
  }

   
}
