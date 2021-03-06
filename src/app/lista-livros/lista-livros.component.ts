import { Component, OnInit } from '@angular/core';
import { Descricao } from '../models/descricao';
import { LivrosService } from '../services/livros-service.service';
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
  ) {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.termosBusca = params['termosBusca'];

      if (this.termosBusca != undefined)
        this.getLivroInfoByBusca();
      else
        this.getLivroInfo();
    });
  }

  ngOnInit() {

  }

  categorizarLivros() {

    if (this.categoryId != "random") {
      let categoryIdNumber = +this.categoryId;

      this.livros = this.livros.filter((livros) => {
        return livros.CategoryID === categoryIdNumber;
      })
    }
    else {
      let newLivroInfo = new Array<LivroInfo>();

      for (let i = 0; i < 4; i++) {
        let random = Math.floor(Math.random() * this.livros.length) + 0;
        newLivroInfo.push(this.livros[random]);
        this.livros.splice(random, 1);
        
      }


      this.livros = newLivroInfo;
    }

  }


  getLivroInfoByBusca() {
    return this.livrosService.getLivroInfoByBusca(this.termosBusca)
      .subscribe(
        livros => {
          this.livros = livros
          this.truncarTextos();
        }

      );
  }



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
    return this.livrosService.getLivroInfo()
      .subscribe(
        livros => {
          this.livros = livros
          this.truncarTextos();
          this.categorizarLivros();
        }
      );
  }

}
