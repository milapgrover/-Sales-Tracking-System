import { Component, OnInit, inject, signal } from '@angular/core';
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
export class NotificationsComponent implements OnInit {
  private notificationsService = inject(NotificationService)
  notifications = signal<Notification[]|null>(null)
  ngOnInit(): void {
    this.notificationsService.getNotifications().subscribe(data=>
    {
       this.notifications.set(data);
    }
    )
  }
}