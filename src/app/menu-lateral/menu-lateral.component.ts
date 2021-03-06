import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria';
import { LivrosService } from '../services/livros-service.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {
  categorias: Categoria[];
  termosBusca: string;
  constructor(
    private livrosService: LivrosService,
  ) {
    this.getCategorias();
  }

  ngOnInit() {
  }

  getCategorias() {
    return this.livrosService.getCategorias()
      .subscribe(
        categorias => {
          this.categorias = categorias
        }
      );
  }


}
