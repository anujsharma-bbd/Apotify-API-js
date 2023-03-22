import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-spotify-callback',
  templateUrl: './spotify-callback.component.html',
  styleUrls: ['./spotify-callback.component.scss']
})
export class SpotifyCallbackComponent implements OnInit, OnDestroy {

  private sub = new Subscription();
  constructor(protected router: Router, protected spotifyService: SpotifyService) { }

  ngOnInit(): void {
    const url = window.location.href;
    if (url.includes('access_token')) {
      const arr = url?.split('#')[1].replace(/access_token=/, '').replace(/\&token_type=/, 'anuj').replace(/\&expires_in=/, 'anuj').split('anuj');
      this.spotifyService.setAccessToken(arr[0], arr[2]);
      window.close();
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
