import { Component } from '@angular/core';
import { Employee } from '../interface/employee';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { mockEmployee } from '../mock-employee';

@Component({
  selector: 'app-company-contact-table',
  templateUrl: './company-contact-table.component.html',
  styleUrls: ['./company-contact-table.component.css'],
})
export class CompanyContactTableComponent {

  employees: Employee[] = [];
  emptyEmployee: Employee = {
    id: "",
    employeeName: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
  };
  selectedEmployee: Employee = this.emptyEmployee;
  employeeForm!: FormGroup;
  actionType: string = "";

  constructor(private modalService: NgbModal, private employeeService: EmployeeService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.employeeService.setData(mockEmployee);
    this.getEmployees();
    this.employeeForm = this.formBuilder.group({
      employeeName: "",
      email: "",
      phoneNumber: "",
      jobTitle: "",
    })
  }

  getEmployees(): void {
    this.employeeService.displayData().subscribe(data => this.employees = data);
  }

  open(content: any, actionType: string, id: string) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.actionType = actionType;
    if (actionType === "edit") {
      this.selectedEmployee = this.employees[this.employees.findIndex(el => el.id === id)];
    }
	}

  delete(id: string) {
    this.employees.splice(this.employees.findIndex(el => el.id === id), 1);
    this.employeeService.setData(this.employees);
  }
  
}
