import { HeroesService } from './../../services/heroes.service';
import { HeroeModel } from './../../models/heroe.model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  heroe: HeroeModel = new HeroeModel();

  constructor(
    private heroeServicio: HeroesService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'new') {
      this.heroeServicio.obtenerHeroe(id).subscribe((data: HeroeModel) => {
        this.heroe = data;
        this.heroe.id = id;
      });
    }
  }

  ngOnInit(): void {}

  guardar(form: any) {
    if (form.invalid) {
      console.log('Formulario no valido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroeServicio.editarHeroe(this.heroe);
    } else {
      peticion = this.heroeServicio.guardarHeroe(this.heroe);
    }

    peticion.subscribe((data) => {
      Swal.fire('Almacenado', 'Informacion guardada correctamente', 'success');
    });
  }
}
