import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { EditComponent } from './games/edit/edit.component';
import { GamesComponent } from './games/games.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'games', component: GamesComponent},
  {path: 'games/edit/:id', component: EditComponent},
  {path: 'games/edit', component: EditComponent},
  {path: '', redirectTo: 'games', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
