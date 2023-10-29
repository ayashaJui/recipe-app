import { Component, EventEmitter, Output } from '@angular/core';
import { DatabaseStorage } from '../shared/database-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // @Output() featureSelected = new EventEmitter<string>();
  // onSelect(feature: string){
  //   this.featureSelected.emit(feature);
  // }

  constructor(private dataStorageService: DatabaseStorage) {}

  saveData() {
    this.dataStorageService.storeRecipes();
  }

  fetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
