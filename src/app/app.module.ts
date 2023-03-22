import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SpotifyLoginModule } from './spotify-login/spotify-login.module';
import { APP_BASE_HREF } from '@angular/common';

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
    { provide: APP_BASE_HREF, useValue: (window as any)['_app_base'] || '/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
