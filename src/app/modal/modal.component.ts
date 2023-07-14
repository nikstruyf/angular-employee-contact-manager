import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Employee } from '../interface/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  emptyEmployee: Employee = {
    id: "",
    employeeName: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
  };

  @Input() actionType!: string;
  @Input() selectedEmployee!: Employee;
  @Input() employees!: Employee[];

  employeeForm!: FormGroup;
  submitType: string = "";

	constructor(private modalService: NgbModal, private employeeService: EmployeeService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      employeeName: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl(),
      jobTitle: new FormControl(),
    })
    if (this.actionType === 'edit') {
      this.employeeForm.setValue({
        employeeName: this.selectedEmployee.employeeName,
        email: this.selectedEmployee.email,
        phoneNumber: this.selectedEmployee.phoneNumber,
        jobTitle: this.selectedEmployee.jobTitle,
      });
    } else {
      this.employeeForm.setValue({
        employeeName: "",
        email: "",
        phoneNumber: "",
        jobTitle: "",
      });
      this.selectedEmployee = this.emptyEmployee;
    }
  }

  createEmployeeId() {
    this.selectedEmployee.employeeName = this.employeeForm.value.employeeName;
    this.selectedEmployee.email = this.employeeForm.value.email;
    this.selectedEmployee.phoneNumber = this.employeeForm.value.phoneNumber;
    this.selectedEmployee.jobTitle = this.employeeForm.value.jobTitle;
    this.selectedEmployee.id = this.selectedEmployee.employeeName + this.selectedEmployee.email + this.selectedEmployee.phoneNumber;
  }

  save(id: string) {
    this.createEmployeeId();
    if (this.actionType === "edit") {
      this.employees[this.employees.findIndex(el => el.id === id)] = this.selectedEmployee;
    } else {
      this.employees.push(this.employeeForm.value);
    }
    console.log(this.employees);
    this.employeeService.setData(this.employees);
    this.selectedEmployee = this.emptyEmployee;
    this.employeeForm.reset();
    this.modalService.dismissAll();
  }
}
