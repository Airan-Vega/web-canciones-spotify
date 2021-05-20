import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  getQuery(query: string): Observable<any> {
    const url = `${environment.url_base}/${query}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.access_token}`,
    });

    return this.http.get(url, { headers });
  }

  getNewReleases(): Observable<any> {
    return this.getQuery(`browse/new-releases?limit=20`).pipe(
      map((data: any) => data.albums.items)
    );
  }

  getSearchArtistas(termino: string): Observable<any> {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map((data: any) => data.artists.items)
    );
  }

  getArtista(id: string): Observable<any> {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string): Observable<any> {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data: any) => data.tracks)
    );
  }
}
