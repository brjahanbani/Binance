import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./layout/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./layout/pages/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: 'trades', loadChildren: () => import('./layout/pages/trades/trades.module').then(m => m.TradesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
