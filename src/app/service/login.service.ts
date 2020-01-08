import { Injectable } from '@angular/core';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isUserLoggedIn;
  public usserLogged:User;

  constructor() { 
  	this.isUserLoggedIn = false;
  }

  setUserLoggedIn(user:User) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('user', JSON.stringify(user));
    
  }

  getUserLoggedIn() {
  	return JSON.parse(localStorage.getItem('user'));
  }

}
