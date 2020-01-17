import {Injectable, Optional} from "@angular/core";

import {Actions,Effect,ofType} from "@ngrx/effects";
import {Action} from "@ngrx/store";

import {Observable,of} from "rxjs";
import {map, mergeMap, catchError, switchMap} from "rxjs/operators";

import * as EmployeeActions from "../actions/employee.actions";
import {Employee} from "../../employee.module";
import {EmployeServiceService} from 'src/app/services/employe-service.service';
@Injectable()
export class EmployeeEffect {
  constructor(
    private actions$:Actions,
    private employeeService:EmployeServiceService

  ) {}


  @Effect()
  LoadEmployee$=this.actions$.pipe(ofType(
    EmployeeActions.EmployeeActionType.LOAD_EMPLOYEE
  )).pipe(
    switchMap(({payload}:any)=>
      this.employeeService.getEmploye().pipe(
        mergeMap((content)=>of (new EmployeeActions.LoadEmployeeSucess(content))),
        catchError(error =>of(new EmployeeActions.LoadEmployeeFail(error)))
      )
    )
  );
  @Effect()
  createEmployee$=this.actions$.pipe(ofType(
    EmployeeActions.EmployeeActionType.CREATE_EMPLOYEE
  )).pipe(
    switchMap(({payload}:any)=>
      this.employeeService.addEmploye(payload).pipe(
        mergeMap((content)=>of (new EmployeeActions.CreateEmployeeSucess(content))),
        catchError(error =>of(new EmployeeActions.CreateEmployeeFail(error)))
      )
    )
  );
  // @Effect()
  // createDepartement$: Observable<Action> = this.actions$.pipe(
  //   ofType<DepartementActions.CreateDepartement>(
  //     DepartementActions.DepartementActionType.CREATE_DEPARTEMENT
  //   ),
  //   map((action: DepartementActions.CreateDepartement) => action.payload),
  //   mergeMap((departement: Departement) =>
  //     this.departementService.addDepartement(departement).pipe(
  //       map(
  //         newDepartement =>
  //           new DepartementActions.CreateDepartementSucess(newDepartement)
  //       ),
  //       catchError(err => of(new DepartementActions.CreateDepartementFail(err)))
  //     )
  //   )
  // );



  @Effect()
  updateEmployee$ = this.actions$.pipe(
    ofType<EmployeeActions.UpdateEmployee>(
      EmployeeActions.EmployeeActionType.UPDATE_EMPLOYEE
    ),
    map((action: EmployeeActions.UpdateEmployee) => action.payload),
    mergeMap((employee: Employee) =>
      this.employeeService.updateEmploye(employee).pipe(
        map(
          (updatedEmployee: Employee) =>
            new EmployeeActions.UpdateEmployeeSucess({
              id: updatedEmployee.idEmploye,
              changes: updatedEmployee
            })
        ),

        catchError(err => of(new EmployeeActions.UpdateEmployeeFail(err)))
      )
    )
  );




  @Effect()
  deleteEmployee$ = this.actions$.pipe(
    ofType(EmployeeActions.EmployeeActionType.DELETE_EMPLOYEE),
    map((action: EmployeeActions.DeleteEmployee) => action.payload),
    mergeMap((id: number) =>
      this.employeeService.deleteEmploye(id).pipe(
        map(() => new EmployeeActions.DeleteEmployeeSucess(id)),
        catchError(err => of(new EmployeeActions.DeleteEmployeeFail(err)))
      )
    )
  );

  // @Effect()
  // createDepartement$ = this.actions$.pipe(ofType(
  //   DepartementActions.DepartementActionType.CREATE_DEPARTEMENT
  // )).pipe(
  //   switchMap(({payload}: any) =>
  //     // of({})
  //     this.departementService.addDepartement({payload})
  //       .pipe(
  //         mergeMap((content)=>of (new DepartementActions.CreateDepartementSucess(content))),
  //           catchError(error =>of(new DepartementActions.CreateDepartementFail(error))))
  //       )
  //   );
}
// mergeMap((actions:DepartementActions.LoadDepartement)=>
//   this.departementService.getDepartements())).pipe(
//   map(
//     (departement:Departement[])=>
//       new DepartementActions.LoadDepartementSucess(departement)
//   ),
//   catchError(err => of(new DepartementActions.LoadDepartementFail(err)))
// );
