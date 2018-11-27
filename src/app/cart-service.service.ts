import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ListaCarrinho } from './models/lista';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  lista: ListaCarrinho[];
  constructor(
    private cookieService: CookieService,
  ) { this.lista = new Array<ListaCarrinho>(); this.get(); }


  add(ISBN: string) {
    this.get();
   let novoLivro = new ListaCarrinho();
   novoLivro.ISBN = ISBN;
   novoLivro.qtd = 1;

   this.lista.push(novoLivro);

   this.save();
  }

  get() {
    let string = this.cookieService.get('lista');

    if (string != '') {
      console.log("tem coisa");
      let lista = JSON.parse(string);
      console.log("lista COOKIE: ", lista);
    }
    else {
      console.log("Vazio");
    }

    
  }

  save(){
    this.cookieService.set("lista",JSON.stringify(this.lista));
  }


  limparCarrinho() {
    this.cookieService.delete('lista')
  }


}
