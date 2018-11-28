import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { Descricao } from '../models/descricao';
import { LivroInfo } from '../models/livro-info';
import { Author } from '../models/author';



@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  private categoriesUrl = 'http://localhost:8080/api/bookcategories';  // URL de categorias
  private descriptionsUrl = 'http://localhost:8080/api/bookdescriptions';  // URL de descrições
  private livroinfoUrl = 'http://localhost:8080/api/bookinfo';  // URL de inforamções detalhadas de livros
  private authorUrl = 'http://localhost:8080/api/bookauthor';  // URL de inforamções de autores
  constructor(
    private http: HttpClient
  ) { }



  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriesUrl)
  }

  getDescricoes(): Observable<Descricao[]> {
    return this.http.get<Descricao[]>(this.descriptionsUrl)
  }

  getLivroInfo(): Observable<LivroInfo[]> {
    return this.http.get<LivroInfo[]>(this.livroinfoUrl)
  }

  getLivroInfoByISBN(id: string): Observable<LivroInfo> {
    const url = `${this.livroinfoUrl}/${id}`;
    return this.http.get<LivroInfo>(url);
  }

  getLivroInfoByBusca(termosBusca: string): Observable<LivroInfo[]> {
    const url = `${this.livroinfoUrl}/busca/${termosBusca}`;
    return this.http.get<LivroInfo[]>(url);
  }
  getAuthorByISBN(ISBN: string): Observable<Author[]> {
    const url = `${this.authorUrl}/${ISBN}`;
    return this.http.get<Author[]>(url);
  }


}
