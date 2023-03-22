import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-spotify-playback',
  templateUrl: './spotify-playback.component.html',
  styleUrls: ['./spotify-playback.component.scss']
})
export class SpotifyPlaybackComponent implements OnInit {

  songText = '';
  tracks: any[] = [];
  audioLength = 30000;
  currentTrack: any = null;
  currentIndex = -1;
  private sub = new Subscription();

  constructor(protected spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }
  public PlaySong() {
    this.getTracks(this.songText);
  }
  private getTracks(text: string) {
    this.sub.add(this.spotifyService.getTracks(text).subscribe((res: any) => {
      this.tracks = res?.tracks?.items || [];
      if (this.tracks?.length) {
        this.currentIndex++;
        this.currentTrack = this.tracks[this.currentIndex];
        this.playNext();
      }
    }));
  }
  private playNext() {
    setInterval(() => {
      if (this.currentIndex <= this.tracks.length) {
        this.currentIndex++;
        this.currentTrack = this.tracks[this.currentIndex];
      }
    }, this.audioLength);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
