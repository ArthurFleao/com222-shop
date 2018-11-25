import { Component, OnInit } from '@angular/core';
import { Descricao } from '../models/descricao';
import { LivrosService } from '../livros-service.service';
import { LivroInfo } from '../models/livro-info';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.scss']
})
export class ListaLivrosComponent implements OnInit {
  livros: LivroInfo[];
  categoryId: string;
  termosBusca: string;

  constructor(
    private livrosService: LivrosService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.termosBusca = params['termosBusca'];
      this.getLivroInfo();
    });
  }

  categorizarLivros() {

    if (this.categoryId != "todos") {
      let categoryIdNumber = +this.categoryId;

      this.livros = this.livros.filter((livros) => {
        return livros.CategoryID === categoryIdNumber;
      })
    };

  }

  filtrarPorBusca() {
    
      this.livros = this.livros.filter((livro) => {
        return (livro.title.search(new RegExp(this.termosBusca, "i")) > -1);
      })
    };

  

  truncarTextos() {
    this.livros.forEach(function (descricao) {

      let palavras = descricao.description.split(" ");


      let novaDescricao = "";

      for (let i = 0; i < 25; i++) {
        if (palavras[i] != undefined)
          novaDescricao += palavras[i] + " ";
      }


      descricao.description = novaDescricao;

    });
  }

  getLivroInfo() {
    console.log("paramb", this.termosBusca);
    console.log("paramId", this.categoryId);

    return this.livrosService.getLivroInfo()
      .subscribe(
        livros => {
          this.livros = livros
          this.truncarTextos();
          if (this.categoryId != undefined)
          this.categorizarLivros();

          if (this.termosBusca != undefined)
          this.filtrarPorBusca();
        }
      );
  }

}
