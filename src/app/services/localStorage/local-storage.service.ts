import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  // Fonction pour enregistrer une valeur dans le localStorage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Fonction pour récupérer une valeur du localStorage
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Fonction pour supprimer une valeur du localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Fonction pour vider complètement le localStorage
  clear(): void {
    localStorage.clear();
  }
}
