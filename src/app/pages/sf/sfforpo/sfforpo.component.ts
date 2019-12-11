import { Component, OnInit, ViewChild } from '@angular/core';
import { SfForpo } from 'src/classes/sf/sfforpo';
import { SfFovis } from 'src/classes/sf/sffovis';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { GnempreService } from 'src/app/services/gn/gnempre.service';
import { ActivatedRoute } from '@angular/router';
import { SfForpoService } from 'src/app/services/sf/sfforpo.service';
import { AlertMessageComponent } from 'src/app/components/dialogs/alert-message/alert-message.component';
import { ModalComponent } from 'src/app/components/dialogs/modal/modal.component';
import { TableSearchGenericComponent } from 'src/app/components/tools/table-search-generic/table-search-generic.component';

@Component({
  selector: 'app-sfforpo',
  templateUrl: './sfforpo.component.html',
  styleUrls: ['./sfforpo.component.css']
})
export class SfforpoComponent implements OnInit {

  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;
  @ViewChild(ModalComponent) modal: ModalComponent;

  @ViewChild('modalModalidad') _tableModalidad: TableSearchGenericComponent;

  forpo: SfForpo = new SfForpo();
  fovis: SfFovis = new SfFovis();

  emp_codi = 0;
  msg = '';

  constructor(private spinner: NgxSpinnerService, private sanitizer: DomSanitizer, private titleService: Title,
    private _gnempre: GnempreService, private route: ActivatedRoute, private _service: SfForpoService ) {
   }

   async ngOnInit() {

    try {
      this.setTitle('FOVIS');
      this.load();
     } catch ( err ) {
      this.showAlertMesssage(err);
     }
  }

  async load() {
    this.spinner.show();
    this._service.loadInfoInitFovis(this.emp_codi).subscribe(resp => {
      if (resp.retorno === 0)
       this.fovis = resp.objTransaction;

      if (this.fovis.par_feab !== 'S')
        this.showAlertMesssage('No existe una convocatoria en estado activo');
    });

    this.spinner.hide();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  showAlertMesssage(msg: string) {
    this.msg = msg;
    this.alert.show();
  }

  setModalidad(rowSelected: any) {
    this.forpo.mod_cont = rowSelected.MOD_CONT;
    this.forpo.mod_nomb = rowSelected.MOD_NOMB;
  }
}
