import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

export interface NamedAPIResource {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class DexieStorage extends Dexie {
  constructor() {
    super('MyAppDatabase');
    this.version(1).stores({
      resources: 'name',
    });
  }

  get resources(): Table<NamedAPIResource, string> {
    return this.table('resources');
  }

  async addResources(resources: NamedAPIResource[]): Promise<void> {
    await this.resources.bulkPut(resources);
  }

  async getAllResources(): Promise<NamedAPIResource[]> {
    return this.resources.toArray();
  }

  async clearResources(): Promise<void> {
    await this.resources.clear();
  }
}
