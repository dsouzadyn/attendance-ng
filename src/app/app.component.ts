import { Component, ViewEncapsulation } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/css/bulma.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {

  isMenuOpen = false;
  title = 'app works!';

  constructor(private authService: LoginService) {}

  isLoggedIn() {
    return this.authService.token && true;
  }

}
