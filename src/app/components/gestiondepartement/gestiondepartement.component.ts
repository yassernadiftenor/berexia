import {Component, OnInit} from '@angular/core';
import {DepartementServiceService} from 'src/app/services/departement-service.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Action, Store} from '@ngrx/store'
import * as departementActions from "src/app/state/actions/departement.actions";
import {state} from "@angular/animations";
import * as fromState from "src/app/state";
import {Departement} from "../../models/departement.module";
import {selectAllDepartments} from "src/app/state";
import {Actions, ofType} from "@ngrx/effects";
import {DepartementActionType} from "src/app/state/actions/departement.actions";
import {UtilisateurServiceService} from "src/app/services/utilisateur-service.service"
import {ExelService} from "../../services/exel.service";
@Component({
  selector: 'app-gestiondepartement',
  templateUrl: './gestiondepartement.component.html',
  styleUrls: ['./gestiondepartement.component.css']
})
export class GestiondepartementComponent implements OnInit {

  constructor(private excelService:ExelService,private userService:UtilisateurServiceService, private departementService: DepartementServiceService, private store: Store<any>, private fb: FormBuilder, private action$ :Actions) {
  }

  ngOnInit() {
    // @ts-ignore
    this.store.select(selectAllDepartments).subscribe(data => this.departement=data);


    this.formular = this.fb.group({
      nomDepart: ['', Validators.required],
      capacite: [0, Validators.required]
    })
    console.log(this.formular.value)
    this.getData();
    console.log('res :' + this.departement);
    this.cols = [
      {field: 'idDepart', header: 'id'},
      {field: 'nomDepart', header: 'nom Depart'},
      {field: 'capacite', header: 'Capacite'},

    ];
    this.cols1 = [
      {field: 'idEmploye', header: 'idEmploye'},
      {field: 'nomEmploye', header: 'nomEmploye'},
      {field: 'prenomEmploye', header: 'prenomEmploye'},
      {field: 'ville', header: 'ville'},

    ];
    this.action$.pipe(ofType(DepartementActionType.CREATE_DEPARTEMENT_SUCESS,DepartementActionType.DELETE_DEPARTEMENT_SUCESS,DepartementActionType.UPDATE_DEPARTEMENT_SUCESS)).subscribe(() => {
      console.log("****On success Working !")
//this.employee = new Employee();
      this.getData();
    })

  }
  public username: any=this.userService.username;
  public employe = [];
  public departement = [];
  cols: any[];
  cols1: any[];
  displayDialog = false;
  formular: FormGroup;
  isVisible = false;
  selectedDep: any = null;
  searchword: string = '';
  function=this.userService.function;
  Access(): boolean{
    if(this.function.toUpperCase()==='ADMIN'){
      return true;
    }else{
      return false;
    }
  }
  showModal(): void {
    this.isVisible = true;
  }
  exportAsXLSX():void {
    //this.store.select(selectAllDepartments).subscribe(data => this.departement=Object.values(data));
    this.excelService.exportAsExcelFile(this.departement, 'departement');
  }
  // getData() {
  //   this.departementService.getDepartements().subscribe((data: any[]) => {
  //     this.departement = Array.from(Object.keys(data), k => data[k]);
  //   });
  // }
  getData() {
   // this.store.select(state => state.departementManag.AllDepartement).subscribe(data => console.log("---> :", data));
    this.store.dispatch(new fromState.LoadDepartement())
    this.store.select(selectAllDepartments).subscribe(data => this.departement=Object.values(data));
  };

  handleOk(): void {
    if (!this.selectedDep) {

      const newDepartement: Departement = {
        idDepart:null,
        nomDepart: this.formular.get("nomDepart").value,
        capacite: this.formular.get("capacite").value,
      };
      console.log(this.formular.value)
      console.log('Departement add');
      this.store.dispatch(new departementActions.CreateDepartement(newDepartement));
      this.getData();
    } else {
      console.log(this.formular.value);
      this.selectedDep.nomDepart = this.formular.value.nomDepart;
      this.selectedDep.capacite = this.formular.value.capacite;
      console.log(this.selectedDep);
      this.store.dispatch(new departementActions.UpdateDepartement(this.selectedDep));
      this.getData();
      this.selectedDep=null;
     this.formular.reset();
    }
    this.isVisible = false;
    this.formular.reset();
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.formular.reset();
  }

  handleCancel1(): void {
    console.log('Button cancel clicked!');
    this.displayDialog = false;
  }

  update(rowData) {
    console.log(rowData);
    this.formular.reset({
      nomDepart: rowData.nomDepart,
      capacite: rowData.capacite
    });
    this.selectedDep = rowData;
    this.showModal();
  }

  delete(idDepart) {
    this.store.dispatch(new departementActions.DeleteDepartement(idDepart));
   this.getData();
  }
  search1() {
    if (this.searchword) {
      this.store.dispatch(new fromState.SearchDepartementSucess(this.searchword));
      this.store.select(selectAllDepartments).subscribe(data => this.departement=Object.values(data));
    }
    else {
    this.getData()
   }
}
  search() {
    if (this.searchword)
      this.departementService.searchDepartement(this.searchword).subscribe((data: any[]) => {
        this.departement = Array.from(Object.keys(data), k => data[k]);
      })
    else {
      this.getData()
    }
  }

  moreDetail(idDepart) {
    this.displayDialog = true;
    this.departementService.searchEmployeByDepartement(idDepart).subscribe((data: any[]) => {
      this.employe = Array.from(Object.keys(data), k => data[k]);
    });
  }
}
