import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {MatTableModule} from '@angular/material/table';
import { UserFormComponent } from './components/user-form/user-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { SharedModule } from '../../../../shared/shared.module';
import { UsersService } from '../../../../core/services/users.service';
import { UsersMockServices } from '../../../../core/services/users-mock.services';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { RouterModule } from '@angular/router';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent,
    UserDetailComponent,
    UserDialogComponent
  ],
  imports: [
    CommonModule,MatTableModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule,ReactiveFormsModule,MatIconModule,MatExpansionModule,SharedModule,RouterModule
  ],
  exports: [
    UsersComponent
  ],
  providers: [
  {
    provide: UsersService,
    useClass: UsersMockServices
  }
  ]
})
export class UsersModule { }
