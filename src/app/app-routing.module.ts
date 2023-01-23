import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";


const appRoutes: Routes = [
  {
    path: 'convert',
    loadChildren: () => import('./convert/convert.module').then(m => m.ConvertModule)
  },
  {
    path: '',
    redirectTo: 'convert',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
