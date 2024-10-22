import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './modules/shared/shared.module';
import { AuthInterceptorService } from './interceptors/authInterceptor.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule , // required for animations
    ToastrModule.forRoot({
      timeOut: 3000, // Adjust this to set the timeout duration
      positionClass: 'toast-bottom-left', // Positioning of the toast
      preventDuplicates: true, // Prevents duplicate toasts
    }), 
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    UserModule,
    HttpClientModule,
    SharedModule
  ],
   providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
