import { Component } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { FormControl } from '@angular/forms';
import { HeroesServices } from '../../services/herores.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {
  onSelectedOption(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }
  public heroes: Hero[] = [];
  public searchInput: FormControl = new FormControl('');
  public selectedHero?: Hero;

  constructor(private readonly heroServices: HeroesServices) {

  }
  searchHero() {
    const value: string = this.searchInput.value || '';
    console.log(value)
    this.heroServices.getSuggestions(value).subscribe(
      res => {
        this.heroes = res;
      }
    )
  }


}
