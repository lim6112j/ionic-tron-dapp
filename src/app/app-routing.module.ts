import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'goods',
    loadChildren: () => import('./pages/goods/goods.module').then( m => m.GoodsPageModule)
  },
  {
    path: 'multi',
    loadChildren: () => import('./pages/multi/multi.module').then( m => m.MultiPageModule)
  },
  {
    path: 'gold',
    loadChildren: () => import('./pages/gold/gold.module').then( m => m.GoldPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
