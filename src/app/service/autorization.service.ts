import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class autorizationService {
  constructor() {}

  authorized() {
    localStorage.setItem('login', 'true');
    window.location.href = '/home';
  }

  logout() {
    localStorage.clear();
  }
}
