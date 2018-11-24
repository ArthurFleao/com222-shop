import { Component, OnInit } from '@angular/core';
import { Descricao } from '../models/descricao';
import { LivrosService } from '../livros-service.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.scss']
})
export class ListaLivrosComponent implements OnInit {

  descricoes: Descricao[];

  constructor(
    private livrosService: LivrosService,
  ) { this.getDescricoes(); }



  ngOnInit() {

  }

  getDescricoes() {
    return this.livrosService.getDescricoes()
      .subscribe(
        descricoes => {
          console.log(descricoes);
          this.descricoes = descricoes
        }
      );
  }

}
