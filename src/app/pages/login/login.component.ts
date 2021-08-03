import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { usuarios } from '../../interfaces/conf-usuarios.interface';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  dataLogin: usuarios[] = [];
  data: any;
  loginSubscribe: any;
  constructor(
    public loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.crearFormLogin();
  }

  ngOnInit(): void {}

  crearFormLogin() {
    this.formLogin = this.fb.group({
      // id: [''],
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.formLogin.controls['usuario'].valueChanges.subscribe((data) => {
      console.log(data);
    });
    this.formLogin.controls['password'].valueChanges.subscribe((data) => {
      console.log(data);
    });
  }

  // login() {
  // console.log(this.formLogin.value);
  // this.loginService
  //   .getUsuario(this.formLogin.value)
  //   .then((res: any) => {
  //     this.data = res;
  //     console.log(this.data);
  //     if (this.data.error !== true) {
  //       console.log('DATA ', this.data);
  //       localStorage.setItem('usuario', JSON.stringify(this.data.data));
  //       this.router.navigate(['panel-colores']);
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: 'Something went wrong!',
  //         footer: '<a href="">Why do I have this issue?</a>',
  //       });
  //     }
  // console.log(this.dataLogin);
  //     })
  //     .catch();
  // }

  login2() {
    this.loginSubscribe = this.loginService
      .getUsuario(this.formLogin.value)
      .subscribe((res: any) => {
        this.data = res;
        console.log('respuestaComponent: ', res);
        try {
          if (this.data.error !== true) {
            localStorage.setItem('usuario', JSON.stringify(this.data.data));
            this.router.navigate(['panel-colores']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuario no encontrado',
            });
          }
        } catch (error) {
          console.log(error);
        }
        return res;
      });
  }
}
