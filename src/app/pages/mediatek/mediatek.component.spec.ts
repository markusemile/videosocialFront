import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediatekComponent } from './mediatek.component';

describe('MediatekComponent', () => {
  let component: MediatekComponent;
  let fixture: ComponentFixture<MediatekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediatekComponent]
    });
    fixture = TestBed.createComponent(MediatekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
