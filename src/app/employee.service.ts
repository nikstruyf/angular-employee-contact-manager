import { Injectable } from '@angular/core';
import { Employee } from './interface/employee';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  setData(data: Employee[]) {
    localStorage.setItem('employees', JSON.stringify(data))
  }

  displayData(): Observable<Employee[]> {
    const data = localStorage.getItem('employees');
    return data ? of(JSON.parse(data)) : of([]);
  }
}
