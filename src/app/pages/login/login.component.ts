import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  dataLogin: any;
  constructor(public loginService: LoginService, private fb: FormBuilder) {
    this.crearFormLogin();
  }

  ngOnInit(): void {}

  crearFormLogin() {
    this.formLogin = this.fb.group({
      id: [''],
      usuario: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });
    this.formLogin.controls['usuario'].valueChanges.subscribe((data) => {
      console.log(data);
    });
    this.formLogin.controls['pass'].valueChanges.subscribe((data) => {
      console.log(data);
    });
  }

  login() {
    console.log(this.formLogin.value);
    this.loginService
      .getUsuario(this.formLogin.value)
      .then((res: any) => {
        this.dataLogin = res.data;
        console.log(this.dataLogin);
        })
      .catch();
  }
}
