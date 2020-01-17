import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http: HttpClient) {
  }

  getDepartements() {
    return this.http.get('http://localhost:4200/departements');
  }

  addDepartement(departement: any) {
    return this.http.post('http://localhost:4200/departements', departement);
  }
  updateDepartement(departement: any) {
    return this.http.put('http://localhost:4200/departements', departement);
  }
  deleteDepartement(id: any) {
    return this.http.delete('http://localhost:4200/departements/'+id);
  }
  searchDepartement(nomDept : any){
    return this.http.get('http://localhost:4200/departements/Search/'+nomDept);
  }
  searchEmployeByDepartement(idDepart :any){
    return this.http.get('http://localhost:4200/departements/SearchByDepartement/'+idDepart);
  }

}
