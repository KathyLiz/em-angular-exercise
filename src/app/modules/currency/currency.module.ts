import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Routes } from '@angular/router';
// import {ErrorsRoutingModule} from './errors-routing.module';
import { RouterModule } from '@angular/router';
import { CurrencyFormat } from './currency-format/currency-format.component';
import { PricePreview } from './price-preview/price-preview.component';
import { CurrencyComponent } from './currency.component';
import { CurrencyApiService } from 'src/app/services/currency.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatButtonModule} from '@angular/material/button';
import { CurrencyFormComponent } from './currency-form/currency-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {MatRadioModule} from '@angular/material/radio';
import { MatSelectFilterModule } from 'mat-select-filter';
import { ResultMessageComponent } from './result-message/result-message.component';
import { IconDirective } from './directives/icon.directive';
const routes: Routes = [
    {
      path: '',
      component: CurrencyComponent,
      children: [
        // {
        //   path: 'your-path',
        //   component: YourComponent,
        // },
        // { path: '', redirectTo: 'accordion', pathMatch: 'full' },
        // { path: '**', redirectTo: 'accordion', pathMatch: 'full' },
      ],
    },
  ];

@NgModule({
  
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,  
    NgbModalModule,
    MatRadioModule,
    MatSelectFilterModule
  ],
  exports: [
    RouterModule,
    CurrencyComponent
  ],
  declarations: [
      CurrencyComponent,
      CurrencyFormat,
      PricePreview,
      CurrencyFormComponent,
      ResultMessageComponent,
      IconDirective
  ],
  providers: [
    CurrencyApiService
  ]
})
export class CurrencyModule {}
