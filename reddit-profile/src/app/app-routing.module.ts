import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  },
  {
    path: 'all',
    loadChildren: () => import('./all-posts/all-posts.module').then(m => m.AllPostsPageModule)
  },
  {
    path: 'starred',
    loadChildren: () => import('./starred/starred.module').then(m => m.StarredPageModule)
  },
  {
    path: 'deleted',
    loadChildren: () => import('./deleted/deleted.module').then(m => m.DeletedPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
