import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  artistas: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {}

  buscar(termino: string): void {
    this.loading = true;
    if (termino !== '') {
      this.spotifyService.getSearchArtistas(termino).subscribe(
        (data: any) => {
          this.artistas = data;
          this.loading = false;
        },
        (errorServicio) => {
          this.loading = false;
          this.error = true;
          this.mensajeError = errorServicio.error.error.message;
        }
      );
    }
  }
}
