import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesServices } from '../../services/herores.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];
  constructor(private readonly heroesServices: HeroesServices) {

  }
  ngOnInit(): void {
    this.heroesServices.getHeroes().subscribe(
      res => {
        this.heroes = res;
      }
    )
  }
}
