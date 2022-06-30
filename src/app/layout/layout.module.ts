import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { OrderingComponent } from './global/ordering/ordering.component';

@NgModule({
  declarations: [LayoutComponent, OrderingComponent],
  imports: [CommonModule, LayoutRoutingModule],
})
export class LayoutModule {}
