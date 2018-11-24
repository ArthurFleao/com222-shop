import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from './models/categoria';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  private customersUrl = 'http://localhost:8080/api/bookcategories';  // URL to web api
  constructor(
    private http: HttpClient
  ) { }



  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.customersUrl)
  }
}
