import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module')
      .then((m) => m.HomePageModule), canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module')
      .then((m) => m.LoginPageModule), canActivate: [LoginGuard],
  },
  {
    path: 'medical-appointment',
    loadChildren: () => import('./pages/medical-appointment/medical-appointment.module')
      .then((m) => m.MedicalAppointmentPageModule), canActivate: [AuthGuard],
  },  
  {
    path: 'my-appointment',
    loadChildren: () => import('./pages/my-appointment/my-appointment.module')
      .then((m) => m.MyAppointmentPageModule), canActivate: [AuthGuard],
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./pages/my-profile/my-profile.module')
      .then( m => m.MyProfilePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'pills',
    loadChildren: () => import('./pages/pills/pills.module')
      .then( m => m.PillsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'sac',
    loadChildren: () => import('./pages/sac/sac.module')
      .then( m => m.SacPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'health-services',
    loadChildren: () => import('./pages/health-services/health-services.module')
      .then( m => m.HealthServicesPageModule), canActivate: [AuthGuard]
  }, 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
