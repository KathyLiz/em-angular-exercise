import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
// Highlight JS
import { SplashScreenModule } from './_metronic/partials/layout/splash-screen/splash-screen.module';
import { CurrencyModule } from './modules/currency/currency.module';


// function appInitializer() {
//   return () => {
//     return new Promise((resolve) => {
//       authService.getUserByToken().subscribe().add(resolve);
//     });
//   };
// }

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SplashScreenModule,
    HttpClientModule,
    AppRoutingModule,
    // NgbModule,
    CurrencyModule,
    NgbModule
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitializer,
    //   multi: true,
    //   deps: [],
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
