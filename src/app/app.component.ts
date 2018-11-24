import { Component } from '@angular/core';
import { Categoria } from './models/categoria';
import { LivrosService } from './livros-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  categorias: Categoria[];

  constructor(
    private livrosService: LivrosService,
  ) {
    this.getCategorias();
  }

  getCategorias() {
    return this.livrosService.getCategorias()
      .subscribe(
        categorias => {
          console.log(categorias);
          this.categorias = categorias
        }
      );
  }
}
