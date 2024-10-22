import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourselistingComponent } from './courselisting/courselisting.component';


const routes: Routes = [
  { path: 'courses', component: CourselistingComponent }, // Route for the register component
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
