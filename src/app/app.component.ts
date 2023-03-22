import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { delay, filter, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

declare var window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Apotify-API-js';
  songText = '';
  tracks: any[] = [];
  audioLength = 30000;
  currentTrack: any = null;
  currentIndex = -1;
  isLoggedIn = false;
  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, private http: HttpClient) {

  }
  ngOnInit(): void {
    this.checkSession();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        console.log(event);
        if (event.url.includes('access_token')) {
          const arr = event.url?.split('#')[1].replace(/access_token=/, '').replace(/\&token_type=/, 'anuj').replace(/\&expires_in=/, 'anuj').split('anuj');
          (new window.Auth()).setAccessToken(arr[0], arr[2]);
          window.close();
        }
      });
  }
  private checkSession() {
    const interval = setInterval(() => {
      const token = (new window.Auth()).getAccessToken();
      this.isLoggedIn = !!token;
      if (this.isLoggedIn) {
        clearInterval(interval);
      }
    }, 1000);
  }
  public PlaySong() {
    this.getTracks(this.songText);
  }
  private getTracks(text: string) {
    this.http.get(`https://api.spotify.com/v1/search?type=track,playlist&q=${text}&market=from_token`, {
      headers: {
        'authorization': 'Bearer ' + (new window.Auth()).getAccessToken()
      }
    }).subscribe((res: any) => {
      this.tracks = res?.tracks?.items || [];
      if (this.tracks?.length) { 
        this.currentIndex++;
        this.currentTrack = this.tracks[this.currentIndex];
        this.playNext();
      }
    })
  }
  private playNext() {
    setInterval(() => {
      if (this.currentIndex <= this.tracks.length) {
        this.currentIndex++;
        this.currentTrack = this.tracks[this.currentIndex];
      }
    }, this.audioLength);
  }
}
