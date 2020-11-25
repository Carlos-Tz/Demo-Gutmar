import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/form';
import { Pieza } from 'src/app/models/pieza';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  Part: Pieza[];
  save = 1;
  user_u = true;
  data_ = false;
  myForm: FormGroup;
  edit: boolean = false;
  key = '';
  public dtOptions = {};

  constructor(
    private fb: FormBuilder,
    public formApi: FormService,
    public authApi: AuthService,
    private location: Location,
    public toastr: ToastrService,
    public router: Router
  ) { }

  ngOnInit() {
    if (!this.authApi.isLoggedInAdmin) {
      this.router.navigate(['panel']);
    }
    this.formApi.GetPartsList().snapshotChanges().subscribe(data => {
      this.Part = [];
      data.forEach(item => {
        let part_ = item.payload.toJSON();
        part_['$key'] = item.key;
        this.Part.push(part_ as Pieza);
      //  this.l1.push(form_);
      });
      this.data_ = true;
    });
    this.sForm();

    this.dtOptions = {
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
      ],
      language: {
        paginate: {
            first:    '«',
            previous: '‹',
            next:     '›',
            last:     '»'
        },
        aria: {
            paginate: {
                first:    'Primero',
                previous: 'Anterior',
                next:     'Siguiente',
                last:     'Último'
            }
        },
        info: 'Mostrando _START_ a _END_ de _TOTAL_ entradas',
        search: 'Buscar',
        emptyTable: ' '
      },
      info: false
    };
  }

  submitSurveyData = () => {
    this.myForm.patchValue({clave: this.myForm.get('clave').value.toUpperCase()});
    this.formApi.AddPart(this.myForm.value);
    this.toastr.success('Guardado!');
    this.ResetForm();
  }
  submitEditData = () => {
    this.myForm.patchValue({clave: this.myForm.get('clave').value.toUpperCase()});
    this.formApi.UpdatePart(this.myForm.value, this.key);
    this.toastr.success('Actualizado!');
    this.ResetForm();
    this.edit = false;
    this.key = '';
  }
  ResetForm() {
    this.myForm.reset();
    // this.myForm2.reset();
  }

  sForm() {
    this.myForm = this.fb.group({
      clave: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      stock: ['', [Validators.required]]
    });
  }
  goBack = () => {
    this.location.back();
  }

  editPieza(part: any) {
    /* console.log(key); */
    this.myForm.patchValue({clave: part.clave, desc: part.desc, precio: part.precio, stock: part.stock});
    this.edit = true;
    this.key = part.$key;
  }
}
