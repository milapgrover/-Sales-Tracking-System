import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Notification } from '../models/notification.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private http = inject(HttpClient)
  getNotifications()
  {
      return this.http.get<Notification[]>
      (
        `${environment.apiUrl}/notifications`
      )
  }
}