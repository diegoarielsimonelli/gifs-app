import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGiftResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private api_key = 'Gi6tAVkz7RCjhfQc5fnlbtlw6oqyoBVR';
  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  //TODO: cambiar any por su tipo correspondiente.
  public resultados: Gif[] = [];
  get historial() {
    return [...this._historial];
  }
  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGiftResponse>(`${this.servicioUrl}/search?`, { params })
      .subscribe((res) => {
        this.resultados = res.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }

  constructor(private http: HttpClient) {
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
}
