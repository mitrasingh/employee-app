import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsComponents } from './departments.components';

describe('DepartmentsComponents', () => {
  let component: DepartmentsComponents;
  let fixture: ComponentFixture<DepartmentsComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentsComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
