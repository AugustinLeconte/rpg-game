export interface RessourceProductedData {
  type: ProductionType;
  production: number;
}

export enum ProductionType {
  Gold = 'Gold',
  Rock = 'Rock',
  Wood = 'Wood',
  Wheat = 'Wheat',
}
