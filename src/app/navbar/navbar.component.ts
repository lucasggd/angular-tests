import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  expand(el: HTMLElement): void {
    el.classList.toggle(`expanded`);
  }

  expandSide(el: HTMLElement): void {
    el.classList.toggle(`opened`);
  }
}
