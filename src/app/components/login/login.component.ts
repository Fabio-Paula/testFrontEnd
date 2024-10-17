import { Component } from '@angular/core';
import { autorizationService } from '../../service/autorization.service';
import axios from 'axios';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  revealPassword: boolean = false;

  constructor(private autorizationService: autorizationService) {}
  handleRevealPassword() {
    this.revealPassword = !this.revealPassword;
  }
  async sendDataLogin() {
    const response = await axios.get('http://localhost:3000/get-login', {});
    const loginData = await response.data;
    if (
      loginData[0].username == this.username &&
      loginData[0].password == this.password
    ) {
      this.autorizationService.authorized();
    }
  }
}
