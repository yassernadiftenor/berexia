import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilisateurServiceService} from "../../services/utilisateur-service.service";
@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

  constructor(private fb: FormBuilder,private UserService:UtilisateurServiceService) { }
  public utilisateur = [];
  cols: any[];
  formular: FormGroup;
  isVisible = false;
  selectedDep: any = null;
  searchword: string = '';
  buttonInvisible:boolean=false;
  ngOnInit() {
    this.cols = [
      {field: 'id', header: 'Id Utilisateur'},
      {field: 'nom', header: 'Nom Utilisateur'},
      {field: 'prenom', header: 'Prenom Utilisateur'},
      {field: 'function', header: 'Function'},
      {field: 'login', header: 'Login'},
      {field: 'password', header: 'Password'},
    ];
    this.formular = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      function: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.getData();
  }
  getData() {
    this.UserService.getUtilisateur().subscribe((data: any[]) => {
      this.utilisateur = Array.from(Object.keys(data), k => data[k]);
    });
  }
  handleOk(): void {
    if (!this.selectedDep) {
      console.log(this.formular.value)
      console.log('Employe add');
      this.UserService.addUtilisateur(this.formular.value).subscribe(res => {
        this.getData();
      });
      this.formular.reset();
    } else {
      this.buttonInvisible=false;
      console.log(this.formular.value);
      this.selectedDep.nom = this.formular.value.nom;
      this.selectedDep.prenom = this.formular.value.prenom;
      this.selectedDep.function = this.formular.value.function;
      this.selectedDep.login = this.formular.value.login;
      this.selectedDep.password = this.formular.value.password;
      console.log(this.selectedDep);
      this.UserService.updateUtilisateur(this.selectedDep).subscribe(res => {
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
  delete(idUser) {
    this.UserService.deleteUtilisateur(idUser).subscribe(res => {
      this.getData();
    });
  }
  update(rowData):void{
    console.log(rowData);
    this.formular.reset({
      nom:rowData.nom,
      prenom:rowData.prenom,
      function :rowData.function,
      login:rowData.login,
      password :rowData.password,
    })
    this.selectedDep = rowData;
    this.showModal();
  }
  showModal(): void {
    this.isVisible = true;
  }
}
