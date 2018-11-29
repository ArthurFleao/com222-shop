import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLivrosComponent } from './lista-livros/lista-livros.component';
import { LivrosInfoComponent } from './livros-info/livros-info.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HistoricoComprasComponent } from './historico-compras/historico-compras.component';


const routes: Routes = [
  { path: '', redirectTo: 'lista/random', pathMatch: 'full' },
  { path: 'lista/random/', component: ListaLivrosComponent },
  { path: 'lista/:categoryId', component: ListaLivrosComponent },
  { path: 'lista/busca/:termosBusca', component: ListaLivrosComponent },
  { path: 'info/:livroISBN', component: LivrosInfoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'historico', component: HistoricoComprasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }