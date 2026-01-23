import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEmployeesComponent } from './project-employees.component';

describe('ProjectEmployeesComponent', () => {
  let component: ProjectEmployeesComponent;
  let fixture: ComponentFixture<ProjectEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectEmployeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectEmployeesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
