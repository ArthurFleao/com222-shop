import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrosInfoComponent } from './livros-info.component';

describe('LivrosInfoComponent', () => {
  let component: LivrosInfoComponent;
  let fixture: ComponentFixture<LivrosInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivrosInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivrosInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
