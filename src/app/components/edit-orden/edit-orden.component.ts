import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/form';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-edit-orden',
  templateUrl: './edit-orden.component.html',
  styleUrls: ['./edit-orden.component.css']
})
export class EditOrdenComponent implements OnInit, OnDestroy {
  public canvasWidth = 150; // 150
  public needleValue = 50;
  public centralLabel = '';
  public name = '';
  public bottomLabel = '';
  public options = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['red', 'yellow', 'green'],
    arcDelimiters: [33, 67],
    rangeLabel: ['E', 'F'],
    needleStartValue: 60,
  };

  totalRef = 0;
  obra = 0;
  otros = 0;
  cargos = 0;
  seguro = 0;
  subtotal = 0;
  iva = 0;
  total = 0;
  anticipo = 0;
  saldo = 0;
  myformValuesChanges$;
  uploadedImage: Blob;
  public filePathI1 = '';
  public filePathI2 = '';
  public filePathI3 = '';
  public filePathI4 = '';
  public filePathf1 = '';
  public filePathf2 = '';
  public filePathf3 = '';
  public filePathf4 = '';
  public filePathf5 = '';
  public filePathf6 = '';
  public filePathf7 = '';
  public filePathf8 = '';
  public filePathf9 = '';
  public filePathf10 = '';
  public filePathf11 = '';
  public filePathf12 = '';
  public filePathf13 = '';
  public filePathf14 = '';
  public filePathf15 = '';
  public filePathf16 = '';
  fecha: string;
  combust: number;
  @ViewChild('sig1') signaturePad: SignaturePad;
  @ViewChild('sig2') signaturePad2: SignaturePad;
  @ViewChild('sig3') signaturePad3: SignaturePad;
  @ViewChild('sig4') signaturePad4: SignaturePad;
  public signaturePadOptions: object = {
    minWidth: 0.7,
    maxWidth: 0.8,
    penColor: 'rgb(255,0,0)',
    canvasWidth: 189,
    canvasHeight: 125
  };
  save = 2;
  myForm: FormGroup;
  key = '';
  public subh: any;

  public thoj = '00 - 00:00';
  public tpre = '00 - 00:00';
  public tpin = '00 - 00:00';
  public tpul = '00 - 00:00';
  public tarm = '00 - 00:00';
  public tlim = '00 - 00:00';

  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    public formApi: FormService,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    private actRouter: ActivatedRoute,
    private storage: AngularFireStorage,
    private currencyPipe: CurrencyPipe
  ) { }

  ngOnInit() {
    this.sForm();
    this.generRow();
    this.myformValuesChanges$ = this.myForm.controls['units'].valueChanges;
    this.myformValuesChanges$.subscribe(units => {
      this.updateTotalUnitPrice(units);
    });
    if (this.subh) {
      this.subh.unsubscribe();
    }
    const timerh = timer(0, 60000);
    this.key = this.actRouter.snapshot.paramMap.get('key');
    this.formApi.GetForm(this.key).valueChanges().subscribe(data => {
      this.myForm.patchValue(data);
      // this.form_ = data;
        this.signaturePad.fromData(this.myForm.get('dere').value);
        this.signaturePad2.fromData(this.myForm.get('frente').value);
        this.signaturePad3.fromData(this.myForm.get('detras').value);
        this.signaturePad4.fromData(this.myForm.get('izq').value);
      this.needleValue = this.myForm.get('gas').value;


      if (!this.myForm.get('proceso').value.te && !this.myForm.get('proceso').value.sb) {
         if (this.myForm.get('tiempoh1').value && !this.myForm.get('tiempoh2').value) {
           this.subh = timerh.subscribe(t => {
             this.thoj = this.calcTiempo(Date.now(), this.myForm.get('tiempoh1').value.tiempoh1);
           });
         }
         if (this.myForm.get('tiempopr1').value && !this.myForm.get('tiempopr2').value) {
           this.subh = timerh.subscribe(t => {
             this.tpre = this.calcTiempo(Date.now(), this.myForm.get('tiempopr1').value);
           });
         }
         if (this.myForm.get('tiempopi1').value && !this.myForm.get('tiempopi2').value) {
           this.subh = timerh.subscribe(t => {
             this.tpin = this.calcTiempo(Date.now(), this.myForm.get('tiempopi1').value);
           });
         }
         if (this.myForm.get('tiempopu1').value && !this.myForm.get('tiempopu2').value) {
           this.subh = timerh.subscribe(t => {
             this.tpul = this.calcTiempo(Date.now(), this.myForm.get('tiempopu1').value);
           });
         }
         if (this.myForm.get('tiempoa1').value && !this.myForm.get('tiempoa2').value) {
           this.subh = timerh.subscribe(t => {
             this.tarm = this.calcTiempo(Date.now(), this.myForm.get('tiempoa1').value);
           });
         }
         if (this.myForm.get('tiempol1').value && !this.myForm.get('tiempol2').value) {
           this.subh = timerh.subscribe(t => {
             this.tlim = this.calcTiempo(Date.now(), this.myForm.get('tiempol1').value);
           });
         }
       }

      if (this.myForm.get('tiempoh1').value && this.myForm.get('tiempoh2').value) {
        this.thoj = this.calcTiempo(this.myForm.get('tiempoh2').value, this.myForm.get('tiempoh1').value);
      }
      if (this.myForm.get('tiempopr1').value && this.myForm.get('tiempopr2').value) {
        this.tpre = this.calcTiempo(this.myForm.get('tiempopr2').value, this.myForm.get('tiempopr1').value);
      }
      if (this.myForm.get('tiempopi1').value && this.myForm.get('tiempopi2').value) {
        this.tpin = this.calcTiempo(this.myForm.get('tiempopi2').value, this.myForm.get('tiempopi1').value);
      }
      if (this.myForm.get('tiempopu1').value && this.myForm.get('tiempopu2').value) {
        this.tpul = this.calcTiempo(this.myForm.get('tiempopu2').value, this.myForm.get('tiempopu1').value);
      }
      if (this.myForm.get('tiempoa1').value && this.myForm.get('tiempoa2').value) {
        this.tarm = this.calcTiempo(this.myForm.get('tiempoa2').value, this.myForm.get('tiempoa1').value);
      }
      if (this.myForm.get('tiempol1').value && this.myForm.get('tiempol2').value) {
        this.tlim = this.calcTiempo(this.myForm.get('tiempol2').value, this.myForm.get('tiempol1').value);
      }
    });
    // this.sForm();
  }

  ngOnDestroy() {
    if (this.subh) {
      this.subh.unsubscribe();
    }
  }

  private generRow() {
    for (let i = 1; i < 9; i++) {
      this.addUnit();
    }
  }
  private addUnit() {
    const control = this.myForm.controls['units'] as FormArray;
    control.push(this.getUnit());
  }
  getControls(frmGrp: FormGroup, key: string) {
    return (frmGrp.controls[key] as FormArray).controls;
  }

  private updateTotalUnitPrice(units: any) {
    const control = this.myForm.controls['units'] as FormArray;
    this.totalRef = 0;
    // tslint:disable-next-line: forin
    for (let i in units) {
      let totalRefUnitPrice = 0;
      totalRefUnitPrice = ((units[i].cantidad > 0 && units[i].precio > 0) ? units[i].cantidad * units[i].precio : 0);
      // let totalRefUnitPrice = (units[i].cantidad * units[i].precio);
      const totalUnitPriceFormatted = this.currencyPipe.transform(totalRefUnitPrice, 'USD', 'symbol-narrow', '1.2-2');

      if (totalRefUnitPrice !== 0) {
        control.at(+i).get('importe').setValue(totalUnitPriceFormatted, { onlySelf: true, emitEvent: false });
      } else {
        control.at(+i).get('importe').setValue('', { onlySelf: true, emitEvent: false });
      }
      /* if (totalRefUnitPrice != 0)
        control.at(+i).get('importe').setValue(totalRefUnitPrice, { onlySelf: true, emitEvent: false }); */
      this.totalRef += totalRefUnitPrice;
    }
    this.subtotal = this.totalRef + this.myForm.get('manoo').value + this.myForm.get('cargos').value + this.myForm.get('otrosm').value + this.myForm.get('seguro').value;
    this.iva = Math.round(this.subtotal * 0.16);
    this.total = this.subtotal + this.iva;
    this.saldo = this.total - this.anticipo;
  }

  calcTiempo(f: number, fi: number) {
    let t = (f - fi);
    const ms = t % 1000;
    t = (t - ms) / 1000;
    const sg = t % 60;
    t = (t - sg) / 60;
    const mi = t % 60;
    t = (t - mi) / 60;
    const hr = t % 24;
    /* t = (t - hr) / 24; */
    const dd = (t - hr) / 24;
    return this.addZero(dd) + '-' + this.addZero(hr) + ':' + this.addZero(mi);
  }

  addZero(n) {
    return (n < 10 ? '0' : '') + n;
  }

  submitSurveyData = () => {
    this.formApi.UpdateForm(this.myForm.value, this.key);
    this.toastr.success('Actualizado!');
    if (this.subh) {
      this.subh.unsubscribe();
    }
  }

  sForm() {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required]],
      orden: ['', [Validators.required]],
      fecha: [''],
      lugar: [''],
      domi: [''],
      rfc: [''],
      garan: [''],
      ciudad: [''],
      cp: [''],
      correo: [''],
      tel: [''],
      marca: [''],
      modelo: [''],
      color: [''],
      placas: [''],
      anio: [''],
      km: [''],
      serie: [''],
      tipo: [''],
      nomotor: [''],
      ingreso: [''],
      ihora: [''],
      entrega: [''],
      ehora: [''],
      asesor: [''],
      dere: [[]],
      frente: [[]],
      detras: [[]],
      izq: [[]],
      uluces: [true],
      qluces: [true],
      antena: [true],
      espejol: [true],
      crista: [true],
      emblem: [true],
      llantas: [true],
      taponr: [true],
      bocinac: [true],
      limpia: [true],
      instru: [true],
      calef: [true],
      radio: [true],
      bocinas: [true],
      encend: [true],
      espejor: [true],
      cenic: [true],
      cintu: [true],
      botoni: [true],
      maniji: [true],
      tapet: [true],
      gato: [true],
      manerg: [true],
      llaver: [true],
      estuch: [true],
      triang: [true],
      llantar: [true],
      exting: [true],
      filtro: [true],
      taponv: [true],
      tradia: [true],
      acumul: [true],
      descri: [''],
      plazo: [''],
      diagn: [''],
      riesg: [''],
      firmae: [''],
      firmac: [''],
      costo: [''],
      refac: [''],
      manoo: [0],
      cargos: [0],
      seguro: [0],
      otrosm: [0],
      antici: [0],
      desc1: [''],
      desc2: [''],
      desc3: [''],
      desc4: [''],
      img1: [''],
      img2: [''],
      img3: [''],
      img4: [''],
      ctel: [''],
      ccorreo: [''],
      chora1: [''],
      chora2: [''],
      ccalle: [''],
      cnum: [''],
      ccolon: [''],
      cdeleg: [''],
      cseguro: [''],
      cpoliz: [''],
      ccompa: [''],
      caviso: [''],
      ctribu: [''],
      cciudad: [''],
      cdias: [''],
      cmes: [''],
      canio: [''],
      cfirmap: [''],
      cfirmac: [''],
      cfirmac2: [''],
      cacept1: [''],
      cacept2: [''],
      tcar: ['sedan'],
      siem: [''],
      presu: [''],
      vigen: [''],
      gas: [50],
      units: this.fb.array([
        this.getUnit()
      ]),
      hinicio: [''],
      hfin: [''],
      htiempo: [false],
      hnombre: [''],
      hfirma1: [''],
      hfirma2: [''],
      pinicio: [''],
      pfin: [''],
      ptiempo: [false],
      pnombre: [''],
      pfirma1: [''],
      pfirma2: [''],
      piinicio: [''],
      pifin: [''],
      pitiempo: [false],
      pinombre: [''],
      pifirma1: [''],
      pifirma2: [''],
      puinicio: [''],
      pufin: [''],
      putiempo: [false],
      punombre: [''],
      pufirma1: [''],
      pufirma2: [''],
      ainicio: [''],
      afin: [''],
      atiempo: [false],
      anombre: [''],
      afirma1: [''],
      afirma2: [''],
      linicio: [''],
      lfin: [''],
      ltiempo: [false],
      lnombre: [''],
      lfirma1: [''],
      lfirma2: [''],
      proceso: {
        re: [false],
        ho: [false],
        pr: [false],
        pi: [false],
        pu: [false],
        ar: [false],
        li: [false],
        te: [false],
        sb: [false]
      },
      tiempoh1: [null],
      tiempoh2: [null],
      tiempopr1: [null],
      tiempopr2: [null],
      tiempopi1: [null],
      tiempopi2: [null],
      tiempopu1: [null],
      tiempopu2: [null],
      tiempoa1: [null],
      tiempoa2: [null],
      tiempol1: [null],
      tiempol2: [null],
      estado: 'RECEPCIÓN'
    });
  }

  private getUnit() {
    return this.fb.group({
      cantidad: [''],
      precio: [''],
      parte: [''],
      importe: [''],
      desc: ['']
    });
  }
  updt() {
    /* this.subtotal = this.totalRef + this.obra + this.otros; */
    // tslint:disable-next-line: max-line-length
    this.subtotal = this.totalRef + this.myForm.get('manoo').value + this.myForm.get('cargos').value + this.myForm.get('otrosm').value + this.myForm.get('seguro').value;
    this.iva = Math.round(this.subtotal * 0.16);
    this.total = this.subtotal + this.iva;
    this.saldo = this.total - this.myForm.get('antici').value;
  }

  hacept1() {
    const now = Date.now();
    const inicio = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = inicio.getDate() + '/' + inicio.getMonth() + '/' + inicio.getFullYear() + ' - ' + this.addZero(inicio.getHours()) + ':' + this.addZero(inicio.getMinutes());
    // tslint:disable-next-line: max-line-length
    this.formApi.UpdateH1({ hnombre: this.myForm.get('hnombre').value, hfirma1: this.myForm.get('hfirma1').value, hinicio: fe, tiempoh1: now }, this.key);
    this.toastr.info('Ha iniciado la Hojalatería!');
  }
  hacept2() {
    const now = Date.now();
    const fin = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = fin.getDate() + '/' + fin.getMonth() + '/' + fin.getFullYear() + ' - ' + this.addZero(fin.getHours()) + ':' + this.addZero(fin.getMinutes());
    // tslint:disable-next-line: max-line-length
    this.formApi.UpdateH2({ img1: this.myForm.get('img1').value, hfirma2: this.myForm.get('hfirma2').value, hfin: fe, tiempoh2: now }, this.key);
    this.thoj = this.calcTiempo(now, this.myForm.get('tiempoh1').value);
    if (this.subh) { this.subh.unsubscribe(); }
    this.toastr.success('Ha finalizado la Hojalatería!');
  }
  /* pracept1() {
    const now = Date.now();
    const inicio = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = inicio.getDate() + '/' + inicio.getMonth() + '/' + inicio.getFullYear() + ' - ' + this.addZero(inicio.getHours()) + ':' + this.addZero(inicio.getMinutes());
    this.formApi.UpdatePr1({ pnombre: this.form_.pnombre, pfirma1: this.form_.pfirma1, pinicio: fe, tiempopr1: now }, this.key);
    this.toastr.info('Ha iniciado la Preparación!');
  }
  pracept2() {
    const now = Date.now();
    const fin = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = fin.getDate() + '/' + fin.getMonth() + '/' + fin.getFullYear() + ' - ' + this.addZero(fin.getHours()) + ':' + this.addZero(fin.getMinutes());
    this.formApi.UpdatePr2({ img2: this.form_.img2, pfirma2: this.form_.pfirma2, pfin: fe, tiempopr2: now }, this.key);
    this.tpre = this.calcTiempo(now, this.form_.tiempopr1);
    if (this.subh) { this.subh.unsubscribe(); }
    this.toastr.success('Ha finalizado la Preparación!');
  } */
  piacept1() {
    const now = Date.now();
    const inicio = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = inicio.getDate() + '/' + inicio.getMonth() + '/' + inicio.getFullYear() + ' - ' + this.addZero(inicio.getHours()) + ':' + this.addZero(inicio.getMinutes());
    // tslint:disable-next-line: max-line-length
    this.formApi.UpdatePi1({ pinombre: this.myForm.get('pinombre').value, pifirma1: this.myForm.get('pifirma1').value, piinicio: fe, tiempopi1: now }, this.key);
    this.toastr.info('Ha iniciado la Pintura!');
  }
  piacept2() {
    const now = Date.now();
    const fin = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = fin.getDate() + '/' + fin.getMonth() + '/' + fin.getFullYear() + ' - ' + this.addZero(fin.getHours()) + ':' + this.addZero(fin.getMinutes());
    // tslint:disable-next-line: max-line-length
    this.formApi.UpdatePi2({ img2: this.myForm.get('img2').value, pifirma2: this.myForm.get('pifirma2').value, pifin: fe, tiempopi2: now }, this.key);
    this.tpin = this.calcTiempo(now, this.myForm.get('tiempopi1').value);
    if (this.subh) { this.subh.unsubscribe(); }
    this.toastr.success('Ha finalizado la Pintura!');
  }
  puacept1() {
    const now = Date.now();
    const inicio = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = inicio.getDate() + '/' + inicio.getMonth() + '/' + inicio.getFullYear() + ' - ' + this.addZero(inicio.getHours()) + ':' + this.addZero(inicio.getMinutes());
    // tslint:disable-next-line: max-line-length
    this.formApi.UpdatePu1({ punombre: this.myForm.get('punombre').value, pufirma1: this.myForm.get('pufirma1').value, puinicio: fe, tiempopu1: now }, this.key);
    this.toastr.info('Ha iniciado el Pulido!');
  }
  puacept2() {
    const now = Date.now();
    const fin = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = fin.getDate() + '/' + fin.getMonth() + '/' + fin.getFullYear() + ' - ' + this.addZero(fin.getHours()) + ':' + this.addZero(fin.getMinutes());
    // tslint:disable-next-line: max-line-length
    this.formApi.UpdatePu2({ img3: this.myForm.get('img3').value, pufirma2: this.myForm.get('pufirma2').value, pufin: fe, tiempopu2: now }, this.key);
    this.tpul = this.calcTiempo(now, this.myForm.get('tiempopu1').value);
    if (this.subh) { this.subh.unsubscribe(); }
    this.toastr.success('Ha finalizado el Pulido!');
  }
  aacept1() {
    const now = Date.now();
    const inicio = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = inicio.getDate() + '/' + inicio.getMonth() + '/' + inicio.getFullYear() + ' - ' + this.addZero(inicio.getHours()) + ':' + this.addZero(inicio.getMinutes());
    // tslint:disable-next-line: max-line-length
    this.formApi.UpdateA1({ anombre: this.myForm.get('anombre').value, afirma1: this.myForm.get('afirma1').value, ainicio: fe, tiempoa1: now }, this.key);
    this.toastr.info('Ha iniciado el Armado!');
  }
  aacept2() {
    const now = Date.now();
    const fin = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = fin.getDate() + '/' + fin.getMonth() + '/' + fin.getFullYear() + ' - ' + this.addZero(fin.getHours()) + ':' + this.addZero(fin.getMinutes());
    // tslint:disable-next-line: max-line-length
    this.formApi.UpdateA2({ img4: this.myForm.get('img4').value, afirma2: this.myForm.get('afirma2').value, afin: fe, tiempoa2: now }, this.key);
    this.tarm = this.calcTiempo(now, this.myForm.get('tiempoa1').value);
    if (this.subh) { this.subh.unsubscribe(); }
    this.toastr.success('Ha finalizado el Armado!');
  }
  /* lacept1() {
    const now = Date.now();
    const inicio = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = inicio.getDate() + '/' + inicio.getMonth() + '/' + inicio.getFullYear() + ' - ' + this.addZero(inicio.getHours()) + ':' + this.addZero(inicio.getMinutes());
    this.formApi.UpdateL1({ lnombre: this.form_.lnombre, lfirma1: this.form_.lfirma1, linicio: fe, tiempol1: now }, this.key);
    this.toastr.info('Ha iniciado la Limpieza!');
  }
  lacept2() {
    const now = Date.now();
    const fin = new Date(now);
    // tslint:disable-next-line: max-line-length
    const fe = fin.getDate() + '/' + fin.getMonth() + '/' + fin.getFullYear() + ' - ' + this.addZero(fin.getHours()) + ':' + this.addZero(fin.getMinutes());
    this.formApi.UpdateL2({ img6: this.form_.img6, lfirma2: this.form_.lfirma2, lfin: fe, tiempol2: now }, this.key);
    this.tlim = this.calcTiempo(now, this.form_.tiempol1);
    if (this.subh) { this.subh.unsubscribe(); }
    this.toastr.success('Ha finalizado la Limpieza!');
  } */

  imgChanged($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      if (imgURL.startsWith('data:image')) {
        const block = imgURL.split(';');
        const contentType = block[0].split(':')[1];
        const realData = block[1].split(',')[1];
        const blob = this.b64toBlob(realData, contentType);
        this.filePathf1 = `signs_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathf1);
        this.storage.upload(this.filePathf1, blob).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ firmac: url });
              this.toastr.success('Firma Actualizada!');
            });
          })
        ).subscribe();
      }
    }
  }
  imgChanged2($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      if (imgURL.startsWith('data:image')) {
        const block = imgURL.split(';');
        const contentType = block[0].split(':')[1];
        const realData = block[1].split(',')[1];
        const blob = this.b64toBlob(realData, contentType);
        this.filePathf2 = `signs_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathf2);
        this.storage.upload(this.filePathf2, blob).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ firmae: url });
              this.toastr.success('Firma Actualizada!');
            });
          })
        ).subscribe();
      }
    }
  }
  imgChanged3($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      if (imgURL.startsWith('data:image')) {
        const block = imgURL.split(';');
        const contentType = block[0].split(':')[1];
        const realData = block[1].split(',')[1];
        const blob = this.b64toBlob(realData, contentType);
        this.filePathf3 = `signs_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathf3);
        this.storage.upload(this.filePathf3, blob).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ cfirmap: url });
              this.toastr.success('Firma Actualizada!');
            });
          })
        ).subscribe();
      }
    }
  }
  imgChanged4($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      if (imgURL.startsWith('data:image')) {
        const block = imgURL.split(';');
        const contentType = block[0].split(':')[1];
        const realData = block[1].split(',')[1];
        const blob = this.b64toBlob(realData, contentType);
        this.filePathf4 = `signs_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathf4);
        this.storage.upload(this.filePathf4, blob).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ cfirmac: url });
              this.toastr.success('Firma Actualizada!');
            });
          })
        ).subscribe();
      }
    }
  }
  imgChanged5($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      if (imgURL.startsWith('data:image')) {
        const block = imgURL.split(';');
        const contentType = block[0].split(':')[1];
        const realData = block[1].split(',')[1];
        const blob = this.b64toBlob(realData, contentType);
        this.filePathf5 = `signs_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathf5);
        this.storage.upload(this.filePathf5, blob).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ hfirma1: url });
              this.toastr.success('Firma Actualizada!');
            });
          })
        ).subscribe();
      }
    }
  }
  imgChanged6($event) {
    if (this.myForm.get('estado').value === 'HOJALATERÍA') {
      if ($event.target.src) {
        const imgURL = $event.target.src;
        if (imgURL.startsWith('data:image')) {
          const block = imgURL.split(';');
          const contentType = block[0].split(':')[1];
          const realData = block[1].split(',')[1];
          const blob = this.b64toBlob(realData, contentType);
          this.filePathf6 = `signs_gutmar/image_${Date.now()}`;
          const fileRef = this.storage.ref(this.filePathf6);
          this.storage.upload(this.filePathf6, blob).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                this.myForm.patchValue({ hfirma2: url });
                this.toastr.success('Firma Actualizada!');
              });
            })
          ).subscribe();
        }
      }
    }
  }
  imgChanged7($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      if (imgURL.startsWith('data:image')) {
        const block = imgURL.split(';');
        const contentType = block[0].split(':')[1];
        const realData = block[1].split(',')[1];
        const blob = this.b64toBlob(realData, contentType);
        this.filePathf7 = `signs_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathf7);
        this.storage.upload(this.filePathf7, blob).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ cfirmac2: url });
              this.toastr.success('Firma Actualizada!');
            });
          })
        ).subscribe();
      }
    }
  }
  imgChanged9($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      if (imgURL.startsWith('data:image')) {
        const block = imgURL.split(';');
        const contentType = block[0].split(':')[1];
        const realData = block[1].split(',')[1];
        const blob = this.b64toBlob(realData, contentType);
        this.filePathf9 = `signs_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathf9);
        this.storage.upload(this.filePathf9, blob).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ pifirma1: url });
              this.toastr.success('Firma Actualizada!');
            });
          })
        ).subscribe();
      }
    }
  }
  imgChanged10($event) {
    if (this.myForm.get('estado').value === 'PINTURA') {
      if ($event.target.src) {
        const imgURL = $event.target.src;
        if (imgURL.startsWith('data:image')) {
          const block = imgURL.split(';');
          const contentType = block[0].split(':')[1];
          const realData = block[1].split(',')[1];
          const blob = this.b64toBlob(realData, contentType);
          this.filePathf10 = `signs_gutmar/image_${Date.now()}`;
          const fileRef = this.storage.ref(this.filePathf10);
          this.storage.upload(this.filePathf10, blob).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                this.myForm.patchValue({ pifirma2: url });
                this.toastr.success('Firma Actualizada!');
              });
            })
          ).subscribe();
        }
      }
    }
  }
  imgChanged11($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      if (imgURL.startsWith('data:image')) {
        const block = imgURL.split(';');
        const contentType = block[0].split(':')[1];
        const realData = block[1].split(',')[1];
        const blob = this.b64toBlob(realData, contentType);
        this.filePathf11 = `signs_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathf11);
        this.storage.upload(this.filePathf11, blob).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ pufirma1: url });
              this.toastr.success('Firma Actualizada!');
            });
          })
        ).subscribe();
      }
    }
  }
  imgChanged12($event) {
    if (this.myForm.get('estado').value === 'PULIDO') {
      if ($event.target.src) {
        const imgURL = $event.target.src;
        if (imgURL.startsWith('data:image')) {
          const block = imgURL.split(';');
          const contentType = block[0].split(':')[1];
          const realData = block[1].split(',')[1];
          const blob = this.b64toBlob(realData, contentType);
          this.filePathf12 = `signs_gutmar/image_${Date.now()}`;
          const fileRef = this.storage.ref(this.filePathf12);
          this.storage.upload(this.filePathf12, blob).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                this.myForm.patchValue({ pufirma2: url });
                this.toastr.success('Firma Actualizada!');
              });
            })
          ).subscribe();
        }
      }
    }
  }
  imgChanged13($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      if (imgURL.startsWith('data:image')) {
        const block = imgURL.split(';');
        const contentType = block[0].split(':')[1];
        const realData = block[1].split(',')[1];
        const blob = this.b64toBlob(realData, contentType);
        this.filePathf13 = `signs_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathf13);
        this.storage.upload(this.filePathf13, blob).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ afirma1: url });
              this.toastr.success('Firma Actualizada!');
            });
          })
        ).subscribe();
      }
    }
  }
  imgChanged14($event) {
    if (this.myForm.get('estado').value === 'ARMADO') {
      if ($event.target.src) {
        const imgURL = $event.target.src;
        if (imgURL.startsWith('data:image')) {
          const block = imgURL.split(';');
          const contentType = block[0].split(':')[1];
          const realData = block[1].split(',')[1];
          const blob = this.b64toBlob(realData, contentType);
          this.filePathf14 = `signs_gutmar/image_${Date.now()}`;
          const fileRef = this.storage.ref(this.filePathf14);
          this.storage.upload(this.filePathf14, blob).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                this.myForm.patchValue({ afirma2: url });
                this.toastr.success('Firma Actualizada!');
              });
            })
          ).subscribe();
        }
      }
    }
  }

  b64toBlob(b64Data, contentType, sliceSize?) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const ima = inputValue.files[0];
    const reader = new FileReader();
    if (ima) {
      reader.readAsDataURL(ima);
    }

    reader.onloadend = () => {
      const imgURL = reader.result as string;
      const block = imgURL.split(';');
      const contentType = block[0].split(':')[1];
      const realData = block[1].split(',')[1];
      this.uploadedImage = this.b64toBlob(realData, contentType);
      if (inputValue.name === 'img1') {
        if (this.filePathI1 !== '') {
          const ref = this.storage.ref(this.filePathI1);
          ref.delete();
        }
        this.filePathI1 = `images_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI1);
        this.storage.upload(this.filePathI1, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ img1: url });
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img2') {
        if (this.filePathI2 !== '') {
          const ref = this.storage.ref(this.filePathI2);
          ref.delete();
        }
        this.filePathI2 = `images_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI2);
        this.storage.upload(this.filePathI2, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ img2: url });
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img3') {
        if (this.filePathI3 !== '') {
          const ref = this.storage.ref(this.filePathI3);
          ref.delete();
        }
        this.filePathI3 = `images_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI3);
        this.storage.upload(this.filePathI3, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ img3: url });
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img4') {
        if (this.filePathI4 !== '') {
          const ref = this.storage.ref(this.filePathI4);
          ref.delete();
        }
        this.filePathI4 = `images_gutmar/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI4);
        this.storage.upload(this.filePathI4, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({ img4: url });
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
    };
  }

  drawComplete() {
    this.myForm.patchValue({ dere: this.signaturePad.toData() });
  }
  drawComplete2() {
    this.myForm.patchValue({ frente: this.signaturePad2.toData() });
  }
  drawComplete3() {
    this.myForm.patchValue({ detraa: this.signaturePad3.toData() });
  }
  drawComplete4() {
    this.myForm.patchValue({ izq: this.signaturePad4.toData() });
  }
  clear1() {
    this.signaturePad.clear();
    this.myForm.patchValue({ dere: [] });
  }

  clear2() {
    this.signaturePad2.clear();
    this.myForm.patchValue({ frente: [] });
  }

  clear3() {
    this.signaturePad3.clear();
    this.myForm.patchValue({ detras: [] });
  }

  clear4() {
    this.signaturePad4.clear();
    this.myForm.patchValue({ izq: [] });
  }
  combus(ev) {
    // console.log(ev.srcElement.value);
    this.needleValue = ev.srcElement.value;
  }
}
