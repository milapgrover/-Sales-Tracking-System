import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Notification } from '../../core/models/notification.model';
import { NotificationService } from '../../core/services/notification';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss'
})
export class Notifications implements OnInit {

  private notificationService =
    inject(NotificationService);

  notifications: Notification[] = [];

  ngOnInit(): void {

    this.notificationService
      .getNotifications()
      .subscribe({
        next: (data) => {
          this.notifications = data;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}