import { Component, OnInit } from '@angular/core';
import { LivroInfo } from '../models/livro-info';
import { LivrosService } from '../services/livros-service.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Author } from '../models/author';
import { CartService } from '../services/cart-service.service';

@Component({
  selector: 'app-livros-info',
  templateUrl: './livros-info.component.html',
  styleUrls: ['./livros-info.component.scss']
})
export class LivrosInfoComponent implements OnInit {
  livro: LivroInfo;
  livroISBN: string;
  autores: Author[];
  constructor(
    private livrosService: LivrosService,
    private route: ActivatedRoute,
    private cart: CartService
  ) { this.livro = new LivroInfo(); }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.livroISBN = params['livroISBN'];
      this.getLivroInfo();
    });
  }


  getAuthorInfo() {
    return this.livrosService.getAuthorByISBN(this.livroISBN)
      .subscribe(
        autor => {
          this.autores = autor;
        }
      );
  }

  getLivroInfo() {
    return this.livrosService.getLivroInfoByISBN(this.livroISBN)
      .subscribe(
        livro => {
          this.livro = livro;
          this.getAuthorInfo();
        }
      );
  }

  addToCart() {
    this.cart.add(this.livro.ISBN);
  }

}
