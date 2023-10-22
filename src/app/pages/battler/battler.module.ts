import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattlerPageComponent } from './battler-page/battler-page.component';
import { RouterModule, Routes } from '@angular/router';
import { BattlerGameModule } from 'src/app/components';

const routes: Routes = [{ path: '', component: BattlerPageComponent }];

@NgModule({
  declarations: [BattlerPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes), BattlerGameModule],
})
export class BattlerModule {}
