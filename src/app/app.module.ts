import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LivrosComponent } from './livros/livros.component';
import { LivrosInfoComponent } from './livros-info/livros-info.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { ListaLivrosComponent } from './lista-livros/lista-livros.component';

import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { BuscaLivrosComponent } from './busca-livros/busca-livros.component';

@NgModule({
  declarations: [
    AppComponent,
    LivrosComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
