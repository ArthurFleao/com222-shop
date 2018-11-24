import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLivrosCategoriasComponent } from './lista-livros-categorias.component';

describe('ListaLivrosCategoriasComponent', () => {
  let component: ListaLivrosCategoriasComponent;
  let fixture: ComponentFixture<ListaLivrosCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaLivrosCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaLivrosCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
