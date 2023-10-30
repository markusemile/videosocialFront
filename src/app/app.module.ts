import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageModule } from './page/page.module';
import { ServiceModule } from './service/service.module';
import { NavigationModule } from './shared/component/navigation/navigation.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderInterceptor } from './security/headerInterceptor';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './security/authGuard';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';





@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PageModule,
    NavigationModule,
    HttpClientModule,
    ToastModule
  ],
  providers: [
    ServiceModule,
    CookieService,
    AuthGuard,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
