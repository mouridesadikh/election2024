import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaspraComponent } from './diaspra.component';

describe('DiaspraComponent', () => {
  let component: DiaspraComponent;
  let fixture: ComponentFixture<DiaspraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaspraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaspraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
