import { Component, OnInit } from '@angular/core';
import { IUsers } from './models/users.interface';
import { UsersService } from '../../../../core/services/users.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  panelOpenState = false;
  displayedColumns: string[] = [
    'id',
    'fullName',
    'email',
    'phone',
    'role',
    'nivel',
    'curso',
    'actions',
  ];
  dataSource: IUsers[] = [];
  roles: string[] = [];
  loading = false;

  constructor(
    private usersService: UsersService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.getPageData();
  }

  getPageData() {
    this.loadingService.setLoading(true);

    forkJoin([
      this.usersService.getRoles(),
      this.usersService.getUsers(),
    ]).subscribe({
      next: (value) => {
        this.roles = value[0];
        this.dataSource = value[1];
      },
      complete: () => {
        this.loadingService.setLoading(false);
      },
    });
  }

  onDeleteUser(ev: IUsers): void {
    this.loadingService.setLoading(true);
    this.usersService.deleteUser(ev.id).subscribe({
      next: (users) => {
        this.dataSource = [...users];
      },
      complete: () => {
        this.loadingService.setLoading(false);
      },
    });
  }

  showModalDeleted(ev: IUsers): void {
    Swal.fire({
      title: 'Estas seguro que deseas eliminar este usuario?',
      text: 'Los cambios no se podran revertirse!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDeleteUser(ev);
      }
    });
  }

  onUserSubmitted(user: IUsers): void {
    this.loadingService.setLoading(true);
    this.usersService
      .createUser({ ...user, id: this.dataSource.length + 1 })
      .subscribe({
        next: (users) => {
          this.dataSource = [...users];
        },
        complete: () => {
          this.loadingService.setLoading(false);
        },
      });
  }

  onUpdatedUser(user: IUsers): void {
    this.dataSource = this.dataSource.map((u) => {
      if (u.id === user.id) {
        return user;
      }
      return u;
    });
  }
}
