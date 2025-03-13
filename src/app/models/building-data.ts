import { ProductionType, RessourceProductedData } from './ressources-data';

export interface BuildingData {
  name: string;
  woodCost: number;
  rockCost: number;
  goldCost: number;
  soldGoldValue: number;
  production?: RessourceProductedData;
}

export enum BuildingType {
  Field = 'Field',
  Farm = 'Farm',
  Lumberjack = 'Lumberjack',
  Mine = 'Mine',
  House = 'House',
  Barrack = 'Barrack',
}

export interface Building {
  type: BuildingType;
  level: number;
  image: string;
}

export const BUILDINGS: Record<BuildingType, BuildingData> = {
  [BuildingType.Lumberjack]: {
    name: 'Bucheron',
    woodCost: 6,
    rockCost: 0,
    goldCost: 5,
    soldGoldValue: 3,
    production: { type: ProductionType.Wood, production: 1 },
  },
  [BuildingType.Mine]: {
    name: 'Mine',
    woodCost: 5,
    rockCost: 5,
    goldCost: 5,
    soldGoldValue: 3,
    production: { type: ProductionType.Rock, production: 1 },
  },
  [BuildingType.Field]: {
    name: 'Champ de blé',
    woodCost: 5,
    rockCost: 0,
    goldCost: 2,
    soldGoldValue: 1,
    production: { type: ProductionType.Wheat, production: 1 },
  },
  [BuildingType.House]: {
    name: 'Maison',
    woodCost: 10,
    rockCost: 10,
    goldCost: 20,
    soldGoldValue: 10,
  },
  [BuildingType.Farm]: {
    name: 'Ferme',
    woodCost: 0,
    rockCost: 0,
    goldCost: 5,
    soldGoldValue: 3,
  },
  [BuildingType.Barrack]: {
    name: 'Caserne',
    woodCost: 10,
    rockCost: 10,
    goldCost: 10,
    soldGoldValue: 5,
  },
};
