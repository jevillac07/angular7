import { HeroeModel } from './../models/heroe.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url = 'https://angular7-886cb.firebaseio.com';

  constructor(private http: HttpClient) {}

  guardarHeroe(heroe: HeroeModel) {
    return this.http.post(this.url + '/heroes.json', heroe).pipe(
      map((data: any) => {
        heroe.id = data.name;
        return heroe;
      })
    );
  }

  editarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe,
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  obtenerHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  obtenerHeroes() {
    return this.http
      .get(`${this.url}/heroes.json`)
      .pipe(map(this.arregloHeroes), delay(1500));
  }

  eliminarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  private arregloHeroes(heroesObj: object): HeroeModel[] {
    const heroesArray: HeroeModel[] = [];

    if (heroesObj) {
      Object.keys(heroesObj).forEach((key) => {
        const heroe: HeroeModel = heroesObj[key];
        heroe.id = key;
        heroesArray.push(heroe);
      });
    }

    return heroesArray;
  }
}
