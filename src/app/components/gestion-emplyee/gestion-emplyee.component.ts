import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeServiceService} from "../../services/employe-service.service";
import {DepartementServiceService} from "../../services/departement-service.service";
import {ExelService} from "../../services/exel.service"
import {first} from "rxjs/operators";
import {UtilisateurServiceService} from "../../services/utilisateur-service.service";

@Component({
  selector: 'app-gestion-emplyee',
  templateUrl: './gestion-emplyee.component.html',
  styleUrls: ['./gestion-emplyee.component.css']
})
export class GestionEmplyeeComponent implements OnInit {

  constructor(private excelService:ExelService,private employeService: EmployeServiceService, private fb: FormBuilder, private fb1 :FormBuilder,private departementService: DepartementServiceService,private userService: UtilisateurServiceService) {

    this.selectRemp();
  }

  public employe = [];
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
  function=this.userService.function;
  Access(): boolean{
    if(this.function.toUpperCase()==='ADMIN'){
      return true;
    }else{
      return false;
    }
  }
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
    console.log(this.formular.value)
    this.getData();
    this.cols = [
      {field: 'idEmploye', header: 'id Employe'},
      {field: 'nomEmploye', header: 'nom Employe'},
      {field: 'prenomEmploye', header: 'prenom Employe'},
      {field: 'ville', header: 'ville'},

    ];
  }
  exportAsXLSX():void {

    this.excelService.exportAsExcelFile(this.employe, 'Employe-Info');
  }

  getData() {
    this.employeService.getEmploye().subscribe((data: any[]) => {
      this.employe = Array.from(Object.keys(data), k => data[k]);
    });
  }
  handleOk1(): void {
    if (!this.selectedDep1) {

      console.log(this.formular1.value)
      console.log('Departement add');
      this.departementService.addDepartement(this.formular1.value).subscribe(res => {
        this.getData();
      });
    }
    this.deptVisible = false;
    this.formular1.reset();
  }

  handleOk(): void {
    if (!this.selectedDep) {

      console.log(this.formular.value)
      console.log('Employe add');
      this.employeService.addEmploye(this.formular.value).subscribe(res => {
        this.getData();
      });
      this.formular.reset();
    } else {
      this.buttonInvisible=false;
      console.log(this.formular.value);
      this.selectedDep.nomEmploye = this.formular.value.nomEmploye;
      this.selectedDep.prenomEmploye = this.formular.value.prenomEmploye;
      this.selectedDep.ville = this.formular.value.ville;
      this.selectedDep.departement = this.listDepart.valueOf();
      console.log(this.selectedDep);
      this.employeService.updateEmploye(this.selectedDep).subscribe(res => {
        this.formular.reset();
        this.selectedDep=null;
        this.getData();

      });
    }
    this.isVisible = false;
    this.formular.reset();
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
  showModal(): void {
    this.isVisible = true;
  }
  showDepartModal():void{
    this.isVisible=false;
    this.deptVisible=true;
  }
  delete(idEmploye) {
    this.employeService.deleteEmploye(idEmploye).subscribe(res => {
      this.getData();
    });
  }

  update(rowData):void{
    console.log(rowData);
    this.formular.reset({
      nomEmploye: rowData.nomEmploye,
      prenomEmploye: rowData.prenomEmploye,
      ville: rowData.ville,
      departement: rowData.departement,
    })
    this.selectedDep = rowData;
    this.showModal();
  }

  search() {
    if (this.searchword)
      this.employeService.searchEmploye(this.searchword).subscribe((data: any[]) => {
        this.employe = Array.from(Object.keys(data), k => data[k]);
      })
    else {
      this.getData()
    }
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
