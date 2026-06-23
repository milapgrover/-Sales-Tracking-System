import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  @Input() title = 'Sales Tracking System';

  @Input() userName = '';

  @Input() notificationCount = 0;

}