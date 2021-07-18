import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpatientsComponent } from './addpatients/addpatients.component';
import { TestComponent } from './test/test.component';



const routes: Routes = [
  {
    path: '', component: TestComponent
  },
  {
    path: 'addpatient', component: AddpatientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

 
}
