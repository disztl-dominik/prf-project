
import { ChooseDoctorComponent } from './choose-doctor.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ChooseDoctorComponent', () => {
  let component: ChooseDoctorComponent;
  let fixture: ComponentFixture<ChooseDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});