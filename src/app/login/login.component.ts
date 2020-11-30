import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+@[a-z]{2,6}.[a-z]{2,4}')]),
    password: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]{6,20}')])
  })

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+@[a-z]{2,6}.[a-z]{2,4}')]),
    password: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]{6,20}')])
  });

  // isSignUpActive = true;

  constructor(private auth: AuthService,
            ) { }

  ngOnInit(): void {
  }

  public signUp( formData: FormData ) {
    this.auth.signUp( formData['email'], formData['password']);
  };

  public login( formData: FormData ) {
    this.auth.login( formData['email'], formData['password']);
  };

  // public check() {
  //   this.isSignUpActive = !this.isSignUpActive
  // }

}
