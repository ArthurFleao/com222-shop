import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from './models/categoria';
import { Descricao } from './models/descricao';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  private categoriesUrl = 'http://localhost:8080/api/bookcategories';  // URL de categorias
  private descriptionsUrl = 'http://localhost:8080/api/bookdescriptions';  // URL de descrições
  constructor(
    private http: HttpClient
  ) { }



  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriesUrl)
  }

  getDescricoes(): Observable<Descricao[]> {
    return this.http.get<Descricao[]>(this.descriptionsUrl)
  }


  
}
