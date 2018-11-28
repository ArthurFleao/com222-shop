import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLivrosComponent } from './lista-livros/lista-livros.component';
import { LivrosInfoComponent } from './livros-info/livros-info.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  { path: '', redirectTo: 'lista/todos', pathMatch: 'full' },
  { path: 'lista/todos/', component: ListaLivrosComponent },
  { path: 'lista/:categoryId', component: ListaLivrosComponent },
  { path: 'lista/busca/:termosBusca', component: ListaLivrosComponent },
  { path: 'info/:livroISBN', component: LivrosInfoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }