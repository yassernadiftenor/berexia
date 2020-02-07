import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExelService} from "../../services/exel.service";
import {UtilisateurServiceService} from "../../services/utilisateur-service.service";
import {DepartementServiceService} from "../../services/departement-service.service";
import {Store} from "@ngrx/store";
import {Actions} from "@ngrx/effects";
import {Departement} from "../../models/departement.module";
import * as departementActions from "../../state/actions/departement.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-departements',
  templateUrl: './add-departements.component.html',
  styleUrls: ['./add-departements.component.css']
})
export class AddDepartementsComponent implements OnInit {
  formular: FormGroup;
  selectedDep: any = null;
  constructor(private excelService:ExelService,private userService:UtilisateurServiceService, private departementService: DepartementServiceService, private store: Store<any>, private fb: FormBuilder, private action$ :Actions,private  route:Router) { }

  ngOnInit() {
    this.formular = this.fb.group({
      nomDepart: ['', Validators.required],
      capacite: [0, Validators.required]
    })
  }
  handleOk(): void {
    const newDepartement: Departement = {
      idDepart:null,
      nomDepart: this.formular.get("nomDepart").value,
      capacite: this.formular.get("capacite").value,
    };
    console.log(this.formular.value)
    console.log('Departement add');
    this.store.dispatch(new departementActions.CreateDepartement(newDepartement));
      this.selectedDep=null;
      this.formular.reset();
      this.route.navigate(['/departement']);
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.formular.reset();
    this.route.navigate(['/departement']);
  }


}
