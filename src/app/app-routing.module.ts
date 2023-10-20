import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattlerComponent } from './battler/battler.component';

const routes: Routes = [
  { path: '', component: BattlerComponent },
  { path: '**', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
