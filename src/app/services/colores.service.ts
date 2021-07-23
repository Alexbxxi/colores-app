import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { colores } from '../interfaces/conf-colores.interface';

@Injectable({
  providedIn: 'root',
})
export class ColoresService {
  urlapi = 'http://127.0.0.1/apicolores/public/api/v1/';
  colores: colores = {};
  body = {};

  // TOKEN no olvidar el bearer
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

  constructor(private http: HttpClient) {
    this.getColores();
  }

  getColores() {
    var url = this.urlapi + 'colores';
    return new Promise((resolve, reject) => {
      this.http.get(url, this.header).subscribe(
        (data: colores) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getColorById(color) {
    var url = this.urlapi + 'colores/' + color;
    return new Promise((resolve, reject) => {
      this.http.get(url, this.header).subscribe(
        (data: colores) => {
          console.log('Respuesta', data);
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  saveColor(color) {
    var url = this.urlapi + 'colores';
    this.colores = color;
    this.body = this.colores;
    return new Promise((resolve, reject) => {
      this.http.post(url, this.body, this.header).subscribe(
        (data: colores) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  saveEdit(id) {
    var url = this.urlapi + 'colores/' + id;
    this.colores = id;
    this.body = this.colores;
    return new Promise((resolve, reject) => {
      this.http.put(url, this.body, this.header).subscribe(
        (data: colores) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  delColor(id) {
    var url = this.urlapi + 'colores/' + id;
    return new Promise((resolve, reject) => {
      this.http.delete(url, this.header).subscribe(
        (data: colores) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
