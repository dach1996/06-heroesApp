import { Component, OnInit } from '@angular/core';
import { HeroesServices } from '../../services/herores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {
  goBack() {
    this.router.navigateByUrl('heroes/list');
  }
  public hero?: Hero;
  constructor(
    private readonly heroesServices: HeroesServices,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {

  }
  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      delay(2000),
      switchMap(({ id }) => this.heroesServices.getHeroById(id))
    ).subscribe(hero => {
      if (!hero)
        this.router.navigate(['/heroes/list'])
      this.hero = hero;
      return;
    }
    )
  }

} 
