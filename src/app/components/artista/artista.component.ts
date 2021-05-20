import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
})
export class ArtistaComponent implements OnInit {
  artista: any = {};
  topTracks: any[] = [];
  loadingArtist: boolean;
  error: boolean;
  mensajeError: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    this.loadingArtist = true;
    this.activatedRoute.params.subscribe((param) => {
      this.getArtista(param['id']);
      this.getTopTracks(param['id']);
    });
  }

  getArtista(id: string): void {
    this.loadingArtist = true;
    this.spotifyService.getArtista(id).subscribe((artista) => {
      this.artista = artista;
      this.loadingArtist = false;
    });
  }

  getTopTracks(id: string): void {
    this.spotifyService.getTopTracks(id).subscribe(
      (topTracks) => {
        this.topTracks = topTracks;
        console.log(this.topTracks);
      },
      (errorServicio) => {
        this.loadingArtist = false;
        this.error = true;
        this.mensajeError = errorServicio.error.error.message;
      }
    );
  }
}
