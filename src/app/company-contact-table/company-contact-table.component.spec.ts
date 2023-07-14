import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactTableComponent } from './company-contact-table.component';

describe('CompanyContactTableComponent', () => {
  let component: CompanyContactTableComponent;
  let fixture: ComponentFixture<CompanyContactTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyContactTableComponent]
    });
    fixture = TestBed.createComponent(CompanyContactTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
