import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { MoneyService } from '../../services/money-service';
import { RockService } from '../../services/rock-service';
import { WoodService } from '../../services/wood-service';
import { WheatService } from '../../services/wheat-service';
import {
  BuildingType,
  BUILDINGS,
  BuildingData,
  Building,
} from '../../app/models/building-data';

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
  @Input() mapData: Tile[] = this.generateMap(9, 9);

  private context!: CanvasRenderingContext2D | null;
  private tileWidth = 64;
  private tileHeight = 32;
  private constructedTiles: Tile[] = [];
  activeTile: Tile = {} as Tile;
  actionMenu = { visible: false, x: 0, y: 0 };
  maxViewLimit: number = 9;
  private canvasWidth = this.maxViewLimit * this.tileWidth;
  private canvasHeight = this.maxViewLimit * this.tileHeight + this.tileHeight;
  Buildings = BUILDINGS;
  private buildingImages: Map<BuildingType, HTMLImageElement> = new Map();

  constructor(
    private _moneyService: MoneyService,
    private _rockService: RockService,
    private _woodService: WoodService,
    private _wheatService: WheatService
  ) {}

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.canvas.nativeElement.width = this.canvasWidth;
      this.canvas.nativeElement.height = this.canvasHeight;
      this.context = this.canvas.nativeElement.getContext('2d');
      this.constructedTiles = [...this.mapData];
      this.loadBuildingImages().then(() => {
        this.drawIsometricGrid();
      });
    }
  }

  private async loadBuildingImages() {
    const buildingTypes: BuildingType[] = this.buildingKeys();

    await Promise.all(
      buildingTypes.map((type) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = `assets/images/${type.toLowerCase()}.png`;
          img.onload = () => {
            this.buildingImages.set(type, img);
            resolve();
          };
        });
      })
    );
  }

  private generateMap(rows: number, cols: number): Tile[] {
    let map: Tile[] = [];
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        map.push({ x, y, building: null });
      }
    }
    return map;
  }

  private drawIsometricGrid(): void {
    if (!this.context) return;
    this.context.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    const offsetX = this.canvas.nativeElement.width / 2;
    const offsetY = this.tileHeight;

    this.constructedTiles.forEach((tile) => {
      const { x, y, building } = tile;
      const isoX = (x - y) * (this.tileWidth / 2) + offsetX;
      const isoY = (x + y) * (this.tileHeight / 2) + offsetY;

      if (!this.context) return;

      this.context.fillStyle = '#FFFFFF';
      this.context.beginPath();
      this.context.moveTo(isoX, isoY);
      this.context.lineTo(
        isoX + this.tileWidth / 2,
        isoY + this.tileHeight / 2
      );
      this.context.lineTo(isoX, isoY + this.tileHeight);
      this.context.lineTo(
        isoX - this.tileWidth / 2,
        isoY + this.tileHeight / 2
      );
      this.context.closePath();
      this.context.fill();
      this.context.strokeStyle = '#aaa';
      this.context.stroke();

      // Dessiner le bâtiment si la tuile en contient un
      if (building && this.buildingImages.has(building.type)) {
        const img = this.buildingImages.get(building.type);
        if (img) {
          this.context.drawImage(
            img,
            isoX - this.tileWidth / 2,
            isoY - this.tileHeight,
            this.tileWidth,
            this.tileHeight * 2
          );
        }
      }
    });
  }

  private getBuildingColor(type: BuildingType): string {
    switch (type) {
      case 'Field':
        return 'yellow';
      case 'Lumberjack':
        return 'brown';
      case 'Mine':
        return 'grey';
      case 'Farm':
        return '#757120';
      case 'House':
        return '#4c38a6';
      case 'Barrack':
        return '#becbcc';
      default:
        return '#FFFFFF';
    }
  }

  onCanvasClick(event: MouseEvent): void {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    let selectedTile: Tile | null = null;

    for (const tile of this.constructedTiles) {
      const isoX =
        (tile.x - tile.y) * (this.tileWidth / 2) +
        this.canvas.nativeElement.width / 2;
      const isoY = (tile.x + tile.y) * (this.tileHeight / 2) + this.tileHeight;

      if (
        clickX > isoX - this.tileWidth / 2 &&
        clickX < isoX + this.tileWidth / 2 &&
        clickY > isoY &&
        clickY < isoY + this.tileHeight
      ) {
        selectedTile = tile;
        break;
      }
    }

    if (selectedTile) {
      this.activeTile = selectedTile;
      this.actionMenu = {
        visible: true,
        x: event.clientX,
        y: event.clientY,
      };
    }
  }

  isBuilded(): boolean {
    if (this.activeTile.building !== null) return true;
    return false;
  }

  buildOnTile(building: BuildingType): void {
    if (this.activeTile && this.canSpend(building)) {
      this.activeTile.building = { type: building, level: 1, image: '' };
      this._moneyService.removeMoney(this.Buildings[building].goldCost);
      this._rockService.removeRock(this.Buildings[building].rockCost);
      this._woodService.removeWood(this.Buildings[building].woodCost);
      this.closeMenu();
      this.drawIsometricGrid();
    }
  }

  removeTile(): void {
    if (this.activeTile && this.activeTile.building) {
      this._moneyService.addMoney(
        this.Buildings[this.activeTile.building.type].soldGoldValue
      );
      this.activeTile.building = null;
      this.closeMenu();
      this.drawIsometricGrid();
    }
  }

  buildingKeys(): BuildingType[] {
    return Object.keys(this.Buildings) as BuildingType[];
  }

  buildingValue(key: BuildingType): BuildingData {
    return this.Buildings[key];
  }

  closeMenu(): void {
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

  canSpend(building: BuildingType): boolean {
    return (
      this._moneyService.getMoney() >= this.Buildings[building].goldCost &&
      this._rockService.getRock() >= this.Buildings[building].rockCost &&
      this._woodService.getWood() >= this.Buildings[building].woodCost
    );
  }
}
