import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { UsersModule } from './pages/users/users.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { MatListModule } from '@angular/material/list';
import { UserDetailComponent } from './pages/users/pages/user-detail/user-detail.component';
import { CoursesModule } from './pages/courses/courses.module';
import { CoursesComponent } from './pages/courses/courses.component';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    CoursesModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    UsersModule,
   
    
    MatListModule,
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'courses',
        // loadChildren: () =>
        //   import('./pages/courses/courses.module').then((m) => m.CoursesModule),
        component: CoursesComponent,
      },
      {
        path: 'users/:id',
        component: UserDetailComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ]),
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
