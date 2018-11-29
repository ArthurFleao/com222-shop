import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TSMap } from "typescript-map"
import { Observable } from 'rxjs';
import { ItemCarrinho } from '../models/item-carrinho';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  carrinho: ItemCarrinho[];
  lista: TSMap<string, number>;
  constructor(
    private cookieService: CookieService,
  ) { this.lista = new TSMap<string, number>(); this.get(); }


  add(ISBN: string) {
    this.get();
    
    if (this.lista.has(ISBN)) { // se o livro ja existir na lista, aumenta a qtd em 1
      this.lista.set(ISBN, this.lista.get(ISBN) + 1);
    }
    else { // se o livro ainda não existir na lista, seta a qtd em 1
      this.lista.set(ISBN, 1);
    }

    this.save();
    console.log("Livro adicionado:", ISBN);
  }

  remove(ISBN: string) { 
    this.get();

    if (this.lista.has(ISBN)) { // se o livro ja estiver na lista 
      let numeroLivros = this.lista.get(ISBN);
      numeroLivros--;
      if (numeroLivros > 0) // se ainda houver pelo menos 1 livro, diminui a quantidade em 1
        this.lista.set(ISBN, numeroLivros);
      else if (numeroLivros <= 0) // se a quantidade de livros zerar, tira o livro do mapa
        this.lista.delete(ISBN);
    }

    this.save();

  }

  get() {
    let string = this.cookieService.get('lista'); // pega o cookie com o JSON em string
    if (string != '') {
      this.lista = new TSMap<string, number>().fromJSON(JSON.parse(string)); // passa a string guardada no cookie para JSON, e o JSON para mapa, e atribui ao mapa local
    }
  }

  save() {
    this.cookieService.set("lista", JSON.stringify(this.lista.toJSON())); // converte o mapa local em JSON, e o JSON em string, e salva no cookie.
  }


  limparCarrinho() {
    this.lista = new TSMap<string, number>(); // reseta a variavel local
    this.cookieService.delete('lista'); // deleta o cookie
  }


  getLista():TSMap<string,number>{
    return  this.lista;
  }
  setCarrinho(newCarrinho: ItemCarrinho[]){
    this.carrinho = newCarrinho;
  }
  getCarrinho(): ItemCarrinho[]{
    return this.carrinho;
  }


}
