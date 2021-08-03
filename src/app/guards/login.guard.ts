import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Template guards parameters 
// route: ActivatedRouteSnapshot,
// state: RouterStateSnapshot
export class LoginGuard implements CanActivate {
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      return true
    } else {
      return false;
    }
  }
}
