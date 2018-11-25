import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LivrosInfoComponent } from './livros-info/livros-info.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { ListaLivrosComponent } from './lista-livros/lista-livros.component';

import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { BuscaLivrosComponent } from './busca-livros/busca-livros.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    LivrosInfoComponent,
    MenuLateralComponent,
    ListaLivrosComponent,
    HeaderComponent,
    BuscaLivrosComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
