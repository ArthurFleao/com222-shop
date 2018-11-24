import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLivrosComponent } from './lista-livros/lista-livros.component';


const routes: Routes = [
  { path: '', redirectTo: 'lista/todos', pathMatch: 'full' },
  { path: 'lista/todos/', component: ListaLivrosComponent },
  { path: 'lista/:categoryId', component: ListaLivrosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }