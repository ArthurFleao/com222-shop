import { Component, OnInit } from '@angular/core';
import { LivroInfo } from '../models/livro-info';
import { LivrosService } from '../livros-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-livros-info',
  templateUrl: './livros-info.component.html',
  styleUrls: ['./livros-info.component.scss']
})
export class LivrosInfoComponent implements OnInit {
  livro: LivroInfo;
  livroISBN: number;
  constructor(
    private livrosService: LivrosService,
    private route: ActivatedRoute,
  ) {  this.livro = new LivroInfo();}

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.livroISBN = params['livroISBN'];
      this.getLivroInfo();
    });
  }

  getLivroInfo() {
    return this.livrosService.getLivroInfoByISBN(this.livroISBN)
      .subscribe(
        livro => {
          this.livro = livro;
        }
      );
  }

}
