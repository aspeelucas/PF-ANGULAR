import { Component } from '@angular/core';
import { IUsers } from './models/users.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  panelOpenState = false;
  displayedColumns: string[] = [
    'id',
    'fullName',
    'email',
    'phone',
    'role',
    'nivel',
    'curso',
    'actions'
  ];
  dataSource: IUsers[] = [
    {
      id: 1,
      firstName: 'Lucas',
      lastName: 'Garcia',
      email: 'lucasgarcia@gmail.com',
      phone: 123456789,
      role: 'Alumno',
      nivel: 'Inicial',
      curso: 'Basico',
    },
    {
      id: 2,
      firstName: 'Pedro',
      lastName: 'Tobalada',
      email: 'ptobalda@gmail.com',
      phone: 123456789,
      role: 'Alumno',
      nivel: 'Intermedio',
      curso: 'Bases del ingles',
    },
  ];

 showModal(id:number): void {
  Swal.fire({
    title: "Estas seguro que deseas eliminar este usuario?",
    text: "Los cambios no se podran revertirse!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, estoy seguro!"
  }).then((result) => {
    if (result.isConfirmed) {

      this.onDeletedUser(id);
      Swal.fire({
        title: "Eliminado!",
        text: "Usuario eliminado correctamente.",
        icon: "success"
      });
    }
  });
  }

  onUserSubmitted(user: IUsers): void {
    this.dataSource = [...this.dataSource, {...user, id: this.dataSource.length + 1}];
  }
 onDeletedUser(id: number): void {
   this.dataSource = this.dataSource.filter((user) => user.id !== id);
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



