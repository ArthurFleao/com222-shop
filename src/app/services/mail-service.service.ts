import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { Email } from '../models/email';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private customersUrl = 'http://localhost:8080/mail';  // URL to web api
  constructor( 
    private http: HttpClient
  ) { }

  sendMail (email: Email){
    return this.http.post<Email>(this.customersUrl, email, httpOptions);
  }
}