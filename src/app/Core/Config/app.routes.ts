import { Routes } from '@angular/router';
import {AuthGuard} from '../Guards/AuthGuard';

export const routes: Routes = [
  {
    path: "auth",
    children: [
      {
        path: "login",
        loadComponent: () =>
          import("../../features/authentication/pages/login/login").then(m => m.Login),
      }
    ],
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("../../features/dashboard/dashboard").then(m => m.Dashboard),
    canActivate: [AuthGuard]
  },
  {
    path: "welcome",
    loadComponent: () =>
      import("../../features/welcome/welcome").then(m => m.Welcome),
    canActivate: [AuthGuard]
  },

];
