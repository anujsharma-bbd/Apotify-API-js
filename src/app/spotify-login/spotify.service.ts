import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  CLIENT_ID = environment.spotify_client_id;
  REDIRECT_URI = environment.spotify_redirect_url;

  constructor(protected http: HttpClient) { }

  openLogin() {
    var url = this.getLoginURL([
      "user-read-private",
      "playlist-read-private",
      "playlist-modify-public",
      "playlist-modify-private",
      "user-library-read",
      "user-library-modify",
      "user-follow-read",
      "user-follow-modify",
    ]);

    var width = 450,
      height = 730,
      left = screen.width / 2 - width / 2,
      top = screen.height / 2 - height / 2;

    var w = window.open(
      url,
      "Spotify",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
      width +
      ", height=" +
      height +
      ", top=" +
      top +
      ", left=" +
      left
    );
  }
  getAccessToken() {
    var expires = 0 + +(localStorage.getItem("an_expires") || 0);
    if (new Date().getTime() > expires) {
      return "";
    }
    var token = localStorage.getItem("an_token");
    return token;
  }

  setAccessToken(token: string, expires_in: string) {
    localStorage.setItem("an_token", token);
    localStorage.setItem("an_expires", (new Date().getTime() + expires_in).toString());
  }
  getTracks(text: string): Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/search?type=track,playlist&q=${text}&market=from_token`, {
      headers: {
        'authorization': 'Bearer ' + this.getAccessToken()
      }
    })
  }
  getUsername() {
    var username = localStorage.getItem("an_username");
    return username;
  }
  setUsername(username: string) {
    localStorage.setItem("an_username", username);
  }
  getUserCountry() {
    var userCountry = localStorage.getItem("an_usercountry") || 'US';
    return userCountry;
  }
  setUserCountry(userCountry: string) {
    localStorage.setItem("an_usercountry", userCountry);
  }
  private getLoginURL(scopes: any) {
    return (
      "https://accounts.spotify.com/authorize?client_id=" + this.CLIENT_ID + "&redirect_uri=" + encodeURIComponent(this.REDIRECT_URI) + "&scope=" +
      encodeURIComponent(scopes.join(" ")) + "&response_type=token");
  }
}
