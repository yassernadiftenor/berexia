import {Injectable, Optional} from "@angular/core";

import {Actions,Effect,ofType} from "@ngrx/effects";
import {Action} from "@ngrx/store";

import {Observable,of} from "rxjs";
import {map, mergeMap, catchError, switchMap, tap} from "rxjs/operators";

import * as DepartementActions from "../actions/departement.actions";
import {Departement} from "../../models/departement.module";
import {DepartementServiceService} from 'src/app/services/departement-service.service';
@Injectable()
export class DepartementEffect {
  constructor(
    private actions$:Actions,
    private departementService:DepartementServiceService

  ) {}


  @Effect()
  LoadDepartement$=this.actions$.pipe(ofType(
      DepartementActions.DepartementActionType.LOAD_DEPARTEMENTS
    )).pipe(
      switchMap(({payload}:any)=>
        this.departementService.getDepartements().pipe(
          mergeMap((content)=>of (new DepartementActions.LoadDepartementSucess(content))),
          catchError(error =>of(new DepartementActions.LoadDepartementFail(error)))
        )
      )
  );
  @Effect()
  SearchDepartement$=this.actions$.pipe(ofType(
    DepartementActions.DepartementActionType.SEARCH_DEPARTEMENT
  )).pipe(
    switchMap(({searchword}:any)=>
      this.departementService.searchDepartement(searchword).pipe(
        mergeMap((content)=>of (new DepartementActions.SearchDepartementSucess(content))),
        catchError(error =>of(new DepartementActions.SearchDepartementFail(error)))
      )
    )
  );
  @Effect()
  createDepartement$=this.actions$.pipe(ofType(
    DepartementActions.DepartementActionType.CREATE_DEPARTEMENT
  )).pipe(
    switchMap(({payload}:any)=>
      this.departementService.addDepartement(payload).pipe(
        mergeMap((content)=>of (new DepartementActions.CreateDepartementSucess(content))),
        catchError(error =>of(new DepartementActions.CreateDepartementFail(error)))
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
  updateDepartement$ = this.actions$.pipe(
    ofType<DepartementActions.UpdateDepartement>(
      DepartementActions.DepartementActionType.UPDATE_DEPARTEMENT
    ),
    map((action: DepartementActions.UpdateDepartement) => action.payload),
    mergeMap((departement: Departement) =>
      this.departementService.updateDepartement(departement).pipe(
        map(
          (updatedDepartement: Departement) =>
            new DepartementActions.UpdateDepartementSucess({
              id: updatedDepartement.idDepart,
              changes: updatedDepartement
            })
        ),

        catchError(err => of(new DepartementActions.DeleteDepartementFail(err)))
      )
    )
  );




  @Effect()
  deleteDepartement$ = this.actions$.pipe(
    ofType(DepartementActions.DepartementActionType.DELETE_DEPARTEMENT),
    map((action: DepartementActions.DeleteDepartement) => action.payload),
    mergeMap((id: number) =>
      this.departementService.deleteDepartement(id).pipe(
        map(() => new DepartementActions.DeleteDepartementSucess(id)),
        catchError(err => of(new DepartementActions.DeleteDepartementFail(err)))
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
