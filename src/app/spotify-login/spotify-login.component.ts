import { Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from './spotify.service';

@Component({
  selector: 'app-spotify-login',
  templateUrl: './spotify-login.component.html',
  styleUrls: ['./spotify-login.component.scss']
})
export class SpotifyLoginComponent implements OnInit {

  isLoggedIn = false;
  interval: any;
  constructor(protected spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.checkSession();
  }
  LoginClick() {
    this.spotifyService.openLogin();
  }
  private checkSession() {
    this.interval = setInterval(() => {
      const token = this.spotifyService.getAccessToken();
      this.isLoggedIn = !!token;
      if (this.isLoggedIn) {
        clearInterval(this.interval);
      }
    }, 1000);
  }
  ngOnDestroy(): void {
    if (this.interval)
      clearInterval(this.interval);
  }
}
