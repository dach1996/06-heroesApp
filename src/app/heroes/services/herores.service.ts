import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { enviroments } from '../../../environments/enviroments';
import { Hero } from '../interfaces/hero.interface';

@Injectable({ providedIn: 'root' })
export class HeroesServices {

  private readonly baseUrl: string = enviroments.baseUrl;

  constructor(private readonly httpClient: HttpClient) {
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(_ => of(undefined))
      )
  }

  addHero(hero: Hero): Observable<Hero> {
    const newhero = { ...hero, id: undefined };
    return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`, newhero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id)
      throw Error('Id del Heroe es requerido')
    return this.httpClient.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHeroById(heroId: string): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/heroes/${heroId}`)
      .pipe(
        catchError(_ => of(false)),
        map(_ => true)
      );
  }
}