import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DrAppComponent } from './dr-app/dr-app.component';
import { DrFacingComponent } from './dr-app/dr-facing/dr-facing.component';
import { PatientFacingComponent } from './dr-app/patient-facing/patient-facing.component';
import { TrainingComponent } from './training/training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'patient',
    pathMatch: 'full',
  },
  {
    path: 'doctor',
    component: DrFacingComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'patient',
    component: PatientFacingComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'training',
  //   component: TrainingComponent,
  //   canActivate: [AuthGuardGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardGuard]
})
export class AppRoutingModule { }
