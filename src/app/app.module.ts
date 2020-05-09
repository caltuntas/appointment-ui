import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DefaultModule } from './layouts/default/default.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DefaultModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
