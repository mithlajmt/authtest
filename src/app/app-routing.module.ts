import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './modules/shared/notfound/notfound.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth-routing.module').then(m => m.AuthRoutingModule) },
  { path: '', redirectTo: 'auth/register', pathMatch: 'full' }, // Optional: Redirect to register or default route
  { path: '**', component: NotfoundComponent } // Wildcard route for handling 404 pages
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
