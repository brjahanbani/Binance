import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/layout/services/auth.service';
import { MatchPasswordsService } from 'src/app/layout/validators/match-passwords.service';
import { UniqueUsernameService } from 'src/app/layout/validators/unique-username.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form = new FormGroup<any>(
    {
      username: new FormControl<string>(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
        [this.uniqueUsername.validate.bind(this.uniqueUsername)]
      ),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
    },
    {
      validators: [this.matchPasswords.validate],
    }
  );
  constructor(
    private matchPasswords: MatchPasswordsService,
    private uniqueUsername: UniqueUsernameService,
    private authService: AuthService,
    private router: Router
  ) {}

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.authService.signup(this.form.value).subscribe(
      (response) => {
        this.router.navigate(['/trades']);
      },
      (error) => {
        if (!error.status) {
          this.form.setErrors({ noConnection: true });
        } else {
          this.form.setErrors({ unknownError: true });
        }
      }
    );
  }

  showErrorPasswordDontMatch() {
    return (
      this.form.controls['password'].dirty &&
      this.form.controls['password'].touched &&
      this.form.controls['passwordConfirmation'].dirty &&
      this.form.controls['passwordConfirmation'].touched
    );
  }

  ngOnInit(): void {}
}
