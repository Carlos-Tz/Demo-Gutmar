import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Form } from '../models/form';
import { Pieza } from '../models/pieza';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  formsList: AngularFireList<any>;
  partsList: AngularFireList<any>;
  SiniList: AngularFireList<any>;
  formObject: AngularFireObject<any>;
  partObject: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) { }

  AddForm(form: object) {
    this.formsList.push(form as Form);
  }
  AddPart(part: object) {
    this.partsList.push(part as Pieza);
  }

  GetFormsList() {
    this.formsList = this.db.list('gutmar/orden-list');
    return this.formsList;
  }
  GetPartsList() {
    this.partsList = this.db.list('gutmar/parts-list');
    return this.partsList;
  }

  GetSiniList(sini: string) {
    this.SiniList = this.db.list('gutmar/orden-list', ref =>
      ref.orderByChild('sini').equalTo(sini).limitToFirst(1)
    );
    return this.SiniList;
  }

  GetForm(key: string) {
    this.formObject = this.db.object('gutmar/orden-list/' + key);
    return this.formObject;
  }
  GetPart(key: string) {
    this.partObject = this.db.object('gutmar/parts-list/' + key);
    return this.partObject;
  }

  UpdateForm(form: Form, key: string) {
    this.db.object('gutmar/orden-list/' + key)
    .update(form);
  }
  UpdatePart(part: Pieza, key: string) {
    this.db.object('gutmar/parts-list/' + key)
    .update(part);
  }
  UpdateH1(f: any, key: string) {
    this.db.object('gutmar/orden-list/' + key)
    .update({ hnombre: f.hnombre, hfirma1: f.hfirma1, hinicio: f.hinicio, htiempo: true, estado: 'FASE1', tiempoh1: f.tiempoh1 });
    this.db.object('gutmar/orden-list/' + key + '/proceso/')
     .update({ ho: true, re: false});
  }
  UpdateH2(f: any, key: string) {
    this.db.object('gutmar/orden-list/' + key)
    .update({ img1: f.img1, hfirma2: f.hfirma2, hfin: f.hfin, estado: 'STAND BY', tiempoh2: f.tiempoh2 });
    this.db.object('gutmar/orden-list/' + key + '/proceso/')
     .update({ sb: true, ho: false});
  }
  /* UpdatePr1(f: any, key: string) {
    this.db.object('gutmar/orden-list/' + key)
    .update({ pnombre: f.pnombre, pfirma1: f.pfirma1, pinicio: f.pinicio, ptiempo: true, estado: 'PREPARACIÓN', tiempopr1: f.tiempopr1 });
    this.db.object('gutmar/orden-list/' + key + '/proceso/')
     .update({ pr: true, sb: false});
  }
  UpdatePr2(f: any, key: string) {
    this.db.object('gutmar/orden-list/' + key)
    .update({ img2: f.img2, pfirma2: f.pfirma2, pfin: f.pfin, estado: 'STAND BY', tiempopr2: f.tiempopr2 });
    this.db.object('gutmar/orden-list/' + key + '/proceso/')
     .update({ sb: true, pr: false});
  } */
  UpdatePi1(f: any, key: string) {
    this.db.object('gutmar/orden-list/' + key).update(
      { pinombre: f.pinombre, pifirma1: f.pifirma1, piinicio: f.piinicio, pitiempo: true, estado: 'FASE2', tiempopi1: f.tiempopi1 });
    this.db.object('gutmar/orden-list/' + key + '/proceso/')
     .update({ pi: true, sb: false});
  }
  UpdatePi2(f: any, key: string) {
    this.db.object('gutmar/orden-list/' + key)
    .update({ img2: f.img2, pifirma2: f.pifirma2, pifin: f.pifin, estado: 'STAND BY', tiempopi2: f.tiempopi2 });
    this.db.object('gutmar/orden-list/' + key + '/proceso/')
     .update({ sb: true, pi: false});
  }
  UpdatePu1(f: any, key: string) {
    this.db.object('gutmar/orden-list/' + key)
    .update({ punombre: f.punombre, pufirma1: f.pufirma1, puinicio: f.puinicio, putiempo: true, estado: 'FASE3', tiempopu1: f.tiempopu1 });
    this.db.object('gutmar/orden-list/' + key + '/proceso/')
     .update({ pu: true, sb: false});
  }
  UpdatePu2(f: any, key: string) {
    this.db.object('gutmar/orden-list/' + key)
    .update({ img3: f.img3, pufirma2: f.pufirma2, pufin: f.pufin, estado: 'STAND BY', tiempopu2: f.tiempopu2 });
    this.db.object('gutmar/orden-list/' + key + '/proceso/')
     .update({ sb: true, pu: false});
  }
  UpdateA1(f: any, key: string) {
    this.db.object('gutmar/orden-list/' + key)
    .update({ anombre: f.anombre, afirma1: f.afirma1, ainicio: f.ainicio, atiempo: true, estado: 'FASE4', tiempoa1: f.tiempoa1 });
    this.db.object('gutmar/orden-list/' + key + '/proceso/')
     .update({ ar: true, sb: false});
  }
  UpdateA2(f: any, key: string) {
    this.db.object('gutmar/orden-list/' + key)
    .update({ img4: f.img4, afirma2: f.afirma2, afin: f.afin, estado: 'STAND BY', tiempoa2: f.tiempoa2 });
    this.db.object('gutmar/orden-list/' + key + '/proceso/')
     .update({ ar: false, te: true});
  }
 /*  UpdateL1(f: any, key: string) {
    this.db.object('gutmar/orden-list/' + key)
    .update({ lnombre: f.lnombre, lfirma1: f.lfirma1, linicio: f.linicio, ltiempo: true, estado: 'LIMPIEZA', tiempol1: f.tiempol1 });
    this.db.object('gutmar/orden-list/' + key + '/proceso/')
     .update({ li: true, sb: false});
  }
  UpdateL2(f: any, key: string) {
    this.db.object('gutmar/orden-list/' + key)
    .update({ img6: f.img6, lfirma2: f.lfirma2, lfin: f.lfin, estado: 'TERMINADO', tiempol2: f.tiempol2 });
    this.db.object('gutmar/orden-list/' + key + '/proceso/')
     .update({ li: false, te: true});
  } */
}
