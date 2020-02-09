import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateMaterialComponent } from './donate-material.component';

describe('DonateMaterialComponent', () => {
  let component: DonateMaterialComponent;
  let fixture: ComponentFixture<DonateMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
