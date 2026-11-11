import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectFilterService {
  private readonly _selectedTech = signal<string | null>(null);

  readonly selectedTech: Signal<string | null> = this._selectedTech.asReadonly();

  select(tech: string): void {
    this._selectedTech.set(tech);
  }

  clear(): void {
    this._selectedTech.set(null);
  }
}
