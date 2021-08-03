import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { usuarios } from '../interfaces/conf-usuarios.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // urlapi = 'http://127.0.0.1/apicolores/public/api/v1/';
  // urlapi = 'https://auditorias.sf.tabasco.gob.mx/api';
  urlapi = 'http://10.14.20.89:3050/api';
  body = {};
  usuarios: usuarios = {};

  // TOKEN no olvidar el Bearer
  header = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZWphbmRybyBCYXV0aXN0YSIsImlhdCI6MTUxNjIzOTAyMn0.YF3EAMCKfS2RJNe7nPQxgNLq9-6X58uCayxIvD96KKw`
    ),
  };

  options = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS, HEAD',
    },
  };

  constructor(private http: HttpClient) {}

  // getUsuario(usuario) {
  //   this.usuarios = usuario;
  //   this.body = this.usuarios;
  //   console.log(this.body);
  //   var url = this.urlapi + '/login';
  //   return new Promise((resolve, reject) => {
  //     this.http.post(url, this.body, this.header).subscribe(
  //       (data: usuarios) => {
  //         resolve(data);
  //         console.log('repuesta', data);
  //       },
  //       (err) => {
  //         reject(err);
  //       }
  //     );
  //   });
  // }

  getUsuario(usuario) {
    this.body = usuario;
    return this.http.post(`${this.urlapi}/login`, this.body).pipe(
      map((res: any) => {
        if (res !== undefined || res !== null) {
          return res;
        } else {
          return {};
        }
      })
    );
  }
}
