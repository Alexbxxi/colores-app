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
  constructor(public loginService: LoginService, private fb: FormBuilder, private router:Router) {
    this.crearFormLogin();
  }

  ngOnInit(): void {}

  crearFormLogin() {
    this.formLogin = this.fb.group({
      // id: [''],
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
    // console.log(this.formLogin.value);
    this.loginService
      .getUsuario(this.formLogin.value)
      .then((res: any) => {
        this.data = res;
        console.log(this.dataLogin);
        if (this.data.rol == "login") {
          this.router.navigate(['panel-colores']);
        }
        // console.log(this.dataLogin);
        })
      .catch();
  }
}
