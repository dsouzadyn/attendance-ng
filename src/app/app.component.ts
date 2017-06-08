import { Component, ViewEncapsulation } from '@angular/core';
import { SemSelectorComponent } from './sem-selector/sem-selector.component';
import { RecordsComponent } from './records/records.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [require('bulma')],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  isMenuOpen = false;
  loggedIn = false;
  title = 'app works!';
  isLoggedIn() {
    return this.loggedIn;
  }
}
