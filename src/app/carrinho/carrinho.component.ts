import { Component, OnInit } from '@angular/core';
import { TSMap } from 'typescript-map';
import { CartService } from '../cart-service.service';
import { LivrosService } from '../livros-service.service';
import { LivroInfo } from '../models/livro-info';
import { ItemCarrinho } from '../models/item-carrinho';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  carrinho: ItemCarrinho[];
  lista: TSMap<string, number>;
  livros: LivroInfo[];
  subtotal: number;
  total: number;
  frete: number;
  constructor(
    private cartService: CartService,
    private livrosService: LivrosService,
  ) { this.init(); }

  init( ){
    this.carrinho = new Array<ItemCarrinho>(); this.total = this.frete = this.subtotal =  0;
  }

  ngOnInit() {
    this.getLivroInfo();

  }


  getLivroInfo() {
    return this.livrosService.getLivroInfo()
      .subscribe(
        livros => {
          this.livros = livros
          this.refresh();
        }
      );
  }

  limparCarrinho(){
    this.cartService.limparCarrinho();
    this.refresh();
  }
  add(ISBN: string) {
    this.cartService.add(ISBN);
    this.refresh();
  }


  remove(ISBN: string) {
    this.cartService.remove(ISBN);
    this.refresh();
  }

  refresh() {
    this.lista = this.cartService.getLista(); // pega a lista em cart-service
    this.init();
    console.log(this.lista);
    this.lista.forEach((qtd: number, ISBN: string) => {
      let novoItem = new ItemCarrinho();
      let livroCorrespondente = this.livros.filter((livros) => {
        return livros.ISBN === ISBN;
      });
      if (livroCorrespondente != undefined) {
        console.log("lvc", livroCorrespondente);
        novoItem.ISBN = ISBN;
        novoItem.qtd = qtd;
        novoItem.title = livroCorrespondente[0].title;
        novoItem.price = livroCorrespondente[0].price;
        this.carrinho.push(novoItem);
      }
    });

    this.carrinho.forEach(item => {
      this.subtotal += item.price * item.qtd;

      if (this.frete == 0)
      this.frete+=5;

      this.frete += 5*item.qtd;
      
    });

    this.total = this.subtotal + this.frete;
  }

  

}
