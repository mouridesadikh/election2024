import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartographieComponent } from './cartographie/cartographie.component';
import { DiaspraComponent } from './diaspra/diaspra.component';
import { EvolutionComponent } from './evolution/evolution.component';

const routes: Routes = [
    {path : '', redirectTo: '/home', pathMatch:'full'},
    {path : 'cartographie', component: HomeComponent},
    {path : 'home', component : CartographieComponent},
    {path : 'diaspora', component : DiaspraComponent},
    {path : 'evolution', component : EvolutionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
