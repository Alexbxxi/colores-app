import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { usuarios } from '../interfaces/conf-usuarios.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  urlapi = 'http://127.0.0.1/api/v1/';
  body = {};

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

  getUsuario(usuario) {
    var url = this.urlapi + 'login/' + usuario;
    return new Promise((resolve, reject) => {
      this.http.get(url, this.header).subscribe(
        (data: usuarios) => {
          // console.log(data);
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
