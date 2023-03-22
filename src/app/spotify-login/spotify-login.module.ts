import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SpotifyLoginComponent } from './spotify-login.component';
import { SpotifyService } from './spotify.service';
import { SpotifyCallbackComponent } from './spotify-callback/spotify-callback.component';
import { SpotifyPlaybackComponent } from './spotify-playback/spotify-playback.component';


const routes: Routes = [
  { path: '', redirectTo: 'spotify', pathMatch: 'full' },
  { path: 'spotify', component: SpotifyLoginComponent, pathMatch: 'full' },
  { path: 'spotify-callback', component: SpotifyCallbackComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    SpotifyLoginComponent,
    SpotifyCallbackComponent,
    SpotifyPlaybackComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [
    SpotifyLoginComponent,
  ],
  providers: [SpotifyService]
})
export class SpotifyLoginModule { }
