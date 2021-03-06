import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LivrosInfoComponent } from './livros-info/livros-info.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { ListaLivrosComponent } from './lista-livros/lista-livros.component';

import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuscaLivrosComponent } from './busca-livros/busca-livros.component';
import { CookieService } from 'ngx-cookie-service';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HistoricoComprasComponent } from './historico-compras/historico-compras.component';

@NgModule({
  declarations: [
    AppComponent,
    LivrosInfoComponent,
    MenuLateralComponent,
    ListaLivrosComponent,
    HeaderComponent,
    BuscaLivrosComponent,
    CarrinhoComponent,
    CheckoutComponent,
    HistoricoComprasComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
