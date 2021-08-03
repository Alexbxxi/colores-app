import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ColoresService } from '../../services/colores.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { colores } from 'src/app/interfaces/conf-colores.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel-colores',
  templateUrl: './panel-colores.component.html',
  styleUrls: ['./panel-colores.component.css'],
})
export class PanelColoresComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  colores: colores[] = [];
  formColores: FormGroup;
  formColoresEdit: FormGroup;
  dataC = [];
  data: any;

  constructor(private coloresService: ColoresService, private fb: FormBuilder, private router: Router) {
    this.crearFormColores();
    this.crearFormEdit();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      processing: true,
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, 'Todos'],
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json',
      },
    };

    this.coloresService
      .getColores()
      .then((res: any) => {
        this.colores = res.data;
        this.dtTrigger.next();
      })
      .catch();
  }

  crearFormColores() {
    this.formColores = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      pantone: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  get id() {
    return this.formColores.get('id');
  }

  get name() {
    return (
      this.formColores.get('name').invalid &&
      this.formColores.get('name').touched
    );
  }

  get color() {
    return (
      this.formColores.get('color').invalid &&
      this.formColores.get('color').touched
    );
  }

  get pantone() {
    return (
      this.formColores.get('pantone').invalid &&
      this.formColores.get('pantone').touched
    );
  }

  get year() {
    return (
      this.formColores.get('year').invalid &&
      this.formColores.get('year').touched
    );
  }

  crearFormEdit() {
    this.formColoresEdit = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      color: ['', Validators.required],
      pantone: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  get idE() {
    return this.formColoresEdit.get('id');
  }

  get nameE() {
    return (
      this.formColoresEdit.get('name').invalid &&
      this.formColoresEdit.get('name').touched
    );
  }

  get colorE() {
    return (
      this.formColoresEdit.get('color').invalid &&
      this.formColoresEdit.get('color').touched
    );
  }

  get pantoneE() {
    return (
      this.formColoresEdit.get('pantone').invalid &&
      this.formColoresEdit.get('pantone').touched
    );
  }

  get yearE() {
    return (
      this.formColoresEdit.get('year').invalid &&
      this.formColoresEdit.get('year').touched
    );
  }

  getColorById(color: any) {
    console.log(color);
    this.coloresService
      .getColorById(color)
      .then((res: any) => {
        this.dataC = res.data;
        this.formColoresEdit.patchValue({
          id: this.dataC[0].id,
          name: this.dataC[0].name,
          color: this.dataC[0].color,
          pantone: this.dataC[0].pantone,
          year: this.dataC[0].year,
        });
      })
      .catch();
  }

  saveColor() {
    Swal.fire({
      title: '¿Desea guardar el registro?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Guardar`,
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.coloresService
          .saveColor(this.formColores.value)
          .then((res: any) => {
            this.data = res;
            this.rerender();
            if (this.data.response == true) {
              Swal.fire('Guardado!', '', 'success');
              this.formColores.reset();
            } else {
              Swal.fire('Datos incorrectos', '', 'info');
            }
          });
      }
      if (result.isDenied) {
        Swal.fire('Proceso cancelado', '', 'info');
      }
    });
  }

  saveEdit() {
    Swal.fire({
      title: '¿Desea guardar los cambios?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Guardar cambios`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.coloresService
          .saveEdit(this.formColoresEdit.value)
          .then((res: any) => {
            this.data = res;
            this.rerender();
            if (this.data.response == true) {
              Swal.fire('Cambios guardados satisfactoriamente', '', 'success');
            } else {
              Swal.fire('Datos incorrectos', '', 'info');
            }
          });
      }
      if (result.isDenied) {
        Swal.fire('Proceso cancelado', '', 'info');
      }
    });
  }

  delColor(id: any) {
    console.log(id);
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.coloresService.delColor(id).then((res: any) => {
          this.data = res;
          if (this.data.response == true) {
            Swal.fire('Registro eliminado satisfactoriamente', '', 'success');
            this.rerender();
          } else {
            Swal.fire('El registro no se puede eliminar', '', 'info');
          }
        });
      }
      if (result.isDenied) {
        Swal.fire('Proceso cancelado', '', 'info');
      }
    });
  }

  // Renderiza nuevamente la tabla, es recomendable su uso en el datatable
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destruye la tabla primero
      dtInstance.destroy();
      // Llama a dtTrigger para renderizar de nuevo
      this.coloresService
        .getColores()
        .then((res: any) => {
          this.colores = res.data;
          this.dtTrigger.next();
        })
        .catch();
    });
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  limpiarFormulario() {
    this.formColores.reset();
  }
}
