import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesServices } from '../../services/herores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent {

  constructor(
    private readonly herosService: HeroesServices,
    private readonly route: Router

  ) {

  }

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_image: new FormControl(''),
  });

  public publishers = [
    {
      id: 'DC Comics', desc: 'DC - Comics'
    },
    {
      id: 'Marvel Commi', desc: 'DC - Comics'
    }
  ]
  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }
  onSubmit(): void {
    if (this.heroForm.invalid) return;
    if (this.currentHero.id) {
      this.herosService.updateHero(this.currentHero).subscribe();
    } else {
      console.log({ a: this.currentHero })
      this.herosService.addHero(this.currentHero).subscribe(() =>
        this.route.navigate(['/heroes/edit', this.currentHero.id]));
    }
  }
}
