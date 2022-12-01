import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  get listado() {
    return this.gifsService.historial;
  }
  constructor(private gifsService: GifsService) {}

  ngOnInit(): void {}
  buscar(argumento: string) {
    return this.gifsService.buscarGifs(argumento);
  }
}
