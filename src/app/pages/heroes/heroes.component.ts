import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  public heroes: HeroeModel[] = [];
  public cargaHeroes = false;

  constructor(private heroeServicio: HeroesService) {
    this.cargaHeroes = true;

    this.heroeServicio.obtenerHeroes().subscribe((data) => {
      this.heroes = data;
      this.cargaHeroes = false;
    });
  }

  ngOnInit(): void {}

  eliminarHeroe(id: string, i: number) {
    Swal.fire({
      title: 'Eliminar registro',
      text: 'Estas seguro de eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero eliminarlo',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.heroeServicio.eliminarHeroe(id).subscribe((data) => {
          this.heroes.splice(i, 1);
        });
        Swal.fire('Eliminado!', 'El registro ha sido eliminado', 'success');
      }
    });
  }
}
