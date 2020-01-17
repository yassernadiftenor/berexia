export * from "src/app/state/effects/departement.effects"
export * from "src/app/state/effects/employee.effects"
import {DepartementEffect} from "src/app/state/effects/departement.effects"
import {EmployeeEffect} from "src/app/state/effects/employee.effects"
export const effects: any[] = [DepartementEffect]
