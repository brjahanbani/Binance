import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradesRoutingModule } from './trades-routing.module';
import { TradesComponent } from './trades.component';
import { OrderingComponent } from '../../global/ordering/ordering.component';

@NgModule({
  declarations: [TradesComponent, OrderingComponent],
  imports: [CommonModule, TradesRoutingModule],
})
export class TradesModule {}
