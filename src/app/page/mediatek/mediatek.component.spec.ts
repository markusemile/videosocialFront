import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediatekComponent } from './mediatek.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MovielistModule } from 'src/app/component/movieList/movielist.module';

describe('MediatekComponent', () => {
  let component: MediatekComponent;
  let fixture: ComponentFixture<MediatekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ToastModule, MovielistModule],
      declarations: [MediatekComponent],
      providers: [MessageService]
    });
    fixture = TestBed.createComponent(MediatekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
