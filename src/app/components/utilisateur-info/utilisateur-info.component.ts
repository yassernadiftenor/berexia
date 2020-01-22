import { Component, OnInit } from '@angular/core';
import { UtilisateurServiceService} from 'src/app/services/utilisateur-service.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeServiceService} from "../../services/employe-service.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-utilisateur-info',
  templateUrl: './utilisateur-info.component.html',
  styleUrls: ['./utilisateur-info.component.css']
})
export class UtilisateurInfoComponent implements OnInit {

  constructor(private router:Router,private utilisateurServiceService:UtilisateurServiceService, private fb: FormBuilder) { }
  formular: FormGroup;
  selectedDep:any;
  routerUser:any='';
  ngOnInit() {
    this.formular = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      function: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

 addUser(){
   this.utilisateurServiceService.addUtilisateur(this.formular.value).subscribe(res => {
     console.log(this.formular.value);
     alert("user add succefuly");
     this.router.navigate(['/Login']);
     console.log('Employe add');
   });
 }
}
