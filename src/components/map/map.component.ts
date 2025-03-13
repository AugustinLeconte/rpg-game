import { Component } from '@angular/core';
import { MapService } from '../../services/map-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  mapData: string[][] = [];

  constructor(private _mapService: MapService) {}

  ngOnInit() {
    this._mapService.fetchMap().subscribe((data) => {
      this.mapData = data;
    });
  }
}
