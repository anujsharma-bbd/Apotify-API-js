import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { SpotifyLoginModule } from './spotify-login/spotify-login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    FormsModule,
    SpotifyLoginModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/' + (window.location.pathname.split('/')[1] || '')
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
