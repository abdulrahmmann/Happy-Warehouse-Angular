import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../authentication/services/auth-service';
import {AuthenticationResponse} from '../authentication/models/AuthenticationResponse .model';
import {Layout} from '../../shared/layout/layout';

@Component({
  selector: 'app-welcome',
  imports: [
    Layout
  ],
  templateUrl: './welcome.html',
})
export class Welcome implements OnInit {
  private authService = inject(AuthService);

  user: AuthenticationResponse | null = null;
  username: string | null = null;

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(res => {
      this.user = res;
      this.username = res.username;
    });
  }
}
