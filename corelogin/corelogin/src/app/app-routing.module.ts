import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileComponent } from './file/file.component';
import { AdminGuard } from './gaurds/admin.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RegisterComponent } from './register/register.component';
import { GuardService } from './shared/guard.service';
import { 
  GuardService as AuthGuard 
} from './shared/guard.service';


const routes: Routes = [
  {path:'', redirectTo:'register',pathMatch:'full'},
  {path:'register', component:RegisterComponent},
  {path:'Login', component:LoginComponent},
  {path: 'home',
  component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard, AdminGuard] }, 
  { path: 'file', component: FileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
