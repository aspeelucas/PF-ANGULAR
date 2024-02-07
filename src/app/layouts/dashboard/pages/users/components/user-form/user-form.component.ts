import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';



@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  userForm: FormGroup;
  @Output() userSubmitted = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: this.fb.control('',[Validators.required,Validators.minLength(3)]),
      lastName: this.fb.control('',[Validators.required,Validators.minLength(3)]),
      email: this.fb.control('',[Validators.required,Validators.email]),
      phone: this.fb.control('',[Validators.required]),
      role: this.fb.control('',Validators.required),
    });
  }
  


  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.userSubmitted.emit(this.userForm.value);
      // this.showModal();
      this.userForm.reset();
    }
  }

  getErrorMessage(field: string):ValidationErrors | null {

    return this.userForm.get(field)?.errors||null;

  }
    

}
