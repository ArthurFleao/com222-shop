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

  truncarTextos(){
    this.descricoes.forEach(function (descricao){
      
    let palavras = descricao.description.split(" ");
    console.log("Palavras", palavras);

    let novaDescricao = "";

    for (let i = 0; i < 25; i++) {
      if (palavras[i] != undefined)
      novaDescricao+= palavras[i] + " ";
    }
    
    
    descricao.description = novaDescricao;
    
    });
  }

  getDescricoes() {
    return this.livrosService.getDescricoes()
      .subscribe(
        descricoes => {
          this.descricoes = descricoes
          this.truncarTextos();
        }
      );
  }

}
