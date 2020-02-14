import { Component, OnInit } from '@angular/core';
import {ExelService} from "../../services/exel.service";
import {EmployeServiceService} from "../../services/employe-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartementServiceService} from "../../services/departement-service.service";
import {UtilisateurServiceService} from "../../services/utilisateur-service.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as employesAction from "../../state/actions/employee.actions";
@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {

  constructor(private store :Store<any>,private excelService:ExelService,private employeService: EmployeServiceService, private fb: FormBuilder, private fb1 :FormBuilder,private departementService: DepartementServiceService,private userService: UtilisateurServiceService,private route:Router)
  {
    this.selectRemp();
  }
  cols: any[];
  formular: FormGroup;
  formular1: FormGroup;
  selectedDep1: any = null;
  isVisible = false;
  deptVisible=false;
  selectedDep: any = null;
  searchword: string = '';
  listOfDepartement = [];
  listDepart ;
  buttonInvisible:boolean=false;

  ngOnInit() {
    this.formular = this.fb.group({
      nomEmploye: ['', Validators.required],
      prenomEmploye: ['', Validators.required],
      ville: ['', Validators.required],
      departement:[Validators.required]
    })
    this.formular1 = this.fb1.group({
      nomDepart: ['', Validators.required],
      capacite: [0, Validators.required]
    })
  }
  handleOk(): void {

      console.log(this.formular.value);
      console.log('Employe add');
      this.store.dispatch(new employesAction.CreateEmployee(this.formular.value));
      this.formular.reset();
    this.route.navigate(['/employee']);
  }
  handleOk1(): void {
    if (!this.selectedDep1) {

      console.log(this.formular1.value)
      console.log('Departement add');
      this.departementService.addDepartement(this.formular1.value);
      this.route.navigate(['/addEmp']);
    }
    this.deptVisible = false;
    this.formular1.reset();
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.formular.reset();
  }
  handleCancel1():void{
    this.deptVisible = false;
    this.formular1.reset();
  }
  showDepartModal():void{
    this.isVisible=false;
    this.deptVisible=true;
  }
  selectRemp() {

    this.departementService.getDepartements().pipe(first()).subscribe((data:any) => {
      for (let i = 0 ; i < data.length ; i++) {
        this.listOfDepartement.push({
          label : data[i].nomDepart,
          value : data[i]
        })
      }

    })
    /*
        const children: Array<{ label: string; value: string }> = [];
        for (let i = 10; i < 36; i++) {
          children.push({label: i.toString(36) + i, value: i.toString(36) + i});
        }
        this.listOfOption = children;*/
  }
}
