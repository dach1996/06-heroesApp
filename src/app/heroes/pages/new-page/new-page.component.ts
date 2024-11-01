import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesServices } from '../../services/herores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  constructor(
    private readonly herosService: HeroesServices,
    private readonly route: Router,
    private readonly activateRoute: ActivatedRoute,

  ) {

  }
  ngOnInit(): void {
    if (!this.route.url.includes('edit')) return;
    this.activateRoute.params.pipe(
      switchMap(({ id }) => this.herosService.getHeroById(id))
    ).subscribe(res => {
      console.log({res});
      if (!res) return this.route.navigateByUrl('/');
      this.heroForm.reset(res);
      return;
    })
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
