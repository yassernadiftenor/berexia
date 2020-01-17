import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeServiceService {

  constructor(private http: HttpClient) { }
  getEmploye() {
    return this.http.get('http://localhost:4200/employees');
  }
  addEmploye(employe: any) {
    return this.http.post('http://localhost:4200/employees', employe);
  }
  updateEmploye(employe: any) {
    return this.http.put('http://localhost:4200/employees', employe);
  }
  deleteEmploye(id: any) {
    return this.http.delete('http://localhost:4200/employees/'+id);
  }
  searchEmploye(nomEmpl : any){
    return this.http.get('http://localhost:4200/employees/Search/'+nomEmpl);
  }
}
