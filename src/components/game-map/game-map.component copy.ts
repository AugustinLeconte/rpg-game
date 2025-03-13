import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MoneyService } from '../../services/money-service';
import {
  BuildingType,
  BUILDINGS,
  BuildingData,
  Building,
} from '../../app/models/building-data';
import { RockService } from '../../services/rock-service';
import { WoodService } from '../../services/wood-service';
import { WheatService } from '../../services/wheat-service';

export interface Tile {
  x: number;
  y: number;
  building: Building | null;
}

@Component({
  selector: 'app-game-map',
  imports: [CommonModule],
  templateUrl: './game-map.component.html',
  styleUrl: './game-map.component.scss',
})
export class GameMapComponent implements AfterViewInit {
  @ViewChild('gameCanvas', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D | null;
  private tileSize = 32;
  constructedTiles: Tile[] = [];
  activeTile: Tile = {} as Tile;
  actionMenu = { visible: false, x: 0, y: 0 };
  Buildings = BUILDINGS;
  maxViewLimit: number = 9;

  constructor(
    private _moneyService: MoneyService,
    private _rockService: RockService,
    private _woodService: WoodService,
    private _wheatService: WheatService
  ) {}

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.context = this.canvas.nativeElement.getContext('2d');
      this.drawGrid();
    }
  }

  buildingKeys(): BuildingType[] {
    return Object.keys(this.Buildings) as BuildingType[];
  }

  buildingValue(key: BuildingType): BuildingData {
    return this.Buildings[key];
  }

  canSpend(building: BuildingType): boolean {
    if (
      this._moneyService.getMoney() >= this.Buildings[building].goldCost &&
      this._rockService.getRock() >= this.Buildings[building].rockCost &&
      this._woodService.getWood() >= this.Buildings[building].woodCost
    )
      return true;
    return false;
  }

  private drawGrid(): void {
    const cols = this.maxViewLimit;
    const rows = this.maxViewLimit;
    this.canvas.nativeElement.width = cols * this.tileSize;
    this.canvas.nativeElement.height = rows * this.tileSize;

    if (this.context)
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const isSelected = this.constructedTiles.find(
            (tile) => tile.x === x && tile.y === y
          );
          switch (isSelected?.building?.type) {
            case 'Field':
              this.context.fillStyle = 'yellow';
              break;
            case 'WoodMaker':
              this.context.fillStyle = 'brown';
              break;
            case 'Mine':
              this.context.fillStyle = 'grey';
              break;
            case 'Farm':
              this.context.fillStyle = '#757120';
              break;
            case 'House':
              this.context.fillStyle = '#4c38a6';
              break;
            case 'Casern':
              this.context.fillStyle = '#becbcc';
              break;
            default:
              this.context.fillStyle = '#FFFFFF';
              break;
          }
          this.context.fillRect(
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize,
            this.tileSize
          );
          this.context.strokeStyle = '#aaa';
          this.context.strokeRect(
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize,
            this.tileSize
          );
        }
      }
  }

  onCanvasClick(event: MouseEvent): void {
    const rect = this.canvas.nativeElement.getBoundingClientRect();

    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const tileX = Math.floor(clickX / this.tileSize);
    const tileY = Math.floor(clickY / this.tileSize);

    const tile = this.constructedTiles.find(
      (tile) => tile.x === tileX && tile.y === tileY
    );

    this.activeTile = {
      x: tileX,
      y: tileY,
      building: tile?.building ? tile.building : null,
    };

    this.actionMenu = {
      visible: true,
      x: event.clientX,
      y: event.clientY,
    };
  }

  buildOnTile(building: BuildingType): void {
    const index = this.findClickedTile();
    if (index === -1) {
      this.constructedTiles.push({
        x: this.activeTile.x,
        y: this.activeTile.y,
        building: { type: building, level: 1, image: '' },
      });
      this.activeTile.building = { type: building, level: 1, image: '' };
    }
    this._moneyService.removeMoney(this.Buildings[building].goldCost);
    this._rockService.removeRock(this.Buildings[building].rockCost);
    this._woodService.removeWood(this.Buildings[building].woodCost);
    this.closeMenu();
  }

  isBuilded(): boolean {
    const index = this.findClickedTile();
    if (index === -1) return false;
    return true;
  }

  removeTile(): void {
    const index = this.findClickedTile();
    let tile: Tile | undefined = this.constructedTiles.find(
      (tile) => tile.x == this.activeTile.x && tile.y === this.activeTile.y
    );
    if (tile == undefined) {
      this.closeMenu();
      return;
    }
    if (tile && tile.building)
      this._moneyService.addMoney(
        this.Buildings[tile.building.type].soldGoldValue
      );
    if (index !== -1) this.constructedTiles.splice(index, 1);
    this.closeMenu();
  }

  closeMenu(): void {
    this.drawGrid();
    this.actionMenu.visible = false;
  }

  tileAroundSelected(): Tile[] {
    let tiles: Tile[] = [];

    this.constructedTiles.forEach((tile) => {
      if (
        tile.x >= this.activeTile.x - 1 &&
        tile.x <= this.activeTile.x + 1 &&
        tile.y >= this.activeTile.y - 1 &&
        tile.y <= this.activeTile.y + 1 &&
        tile != this.activeTile
      )
        tiles.push(tile);
    });
    return tiles;
  }

  canBuildHere(building: BuildingType): boolean {
    let isBuildable: boolean = true;
    let tiles: Tile[] = this.tileAroundSelected();
    switch (building) {
      case BuildingType.Field:
        if (
          tiles.filter(
            (tile) =>
              tile.building?.type == 'Farm' || tile.building?.type == 'Field'
          ).length <= 0
        )
          isBuildable = false;
        break;
      default:
        break;
    }
    return isBuildable;
  }

  findClickedTile(): number {
    return this.constructedTiles.findIndex(
      (tile) => tile.x === this.activeTile.x && tile.y === this.activeTile.y
    );
  }
}
