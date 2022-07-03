import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/layout/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  form = new FormGroup<any>({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
    this.authService.signin(this.form.value).subscribe(
      (response) => {
        this.router.navigate(['/trades']);
      },
      (error: any) => {
        if (!error.status) {
          this.form.setErrors({ noConnection: true });
          return;
        }
        if (error.error.username || error.error.password) {
          this.form.setErrors({ credential: true });
        } else {
          this.form.setErrors({ unknownError: true });
          return;
        }
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {}

  showErrorPasswordDontMatch() {
    return (
      this.form.controls['password'].dirty &&
      this.form.controls['password'].touched &&
      this.form.controls['username'].dirty &&
      this.form.controls['username'].touched
    );
  }
}
