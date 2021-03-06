import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';



import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';

import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { MatDialogModule } from '@angular/material/dialog';

/*HTTP ANGULAR*/
import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';



/*TEMPLATE MODULE*/
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

/*REACTIVE FORM MODEL*/
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';

/*SPINNER*/
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { HighlightDirective } from './directives/highlight.directive';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
      MatGridListModule,
      MatCardModule,
      MatButtonModule,
      MatSliderModule,
      MatListModule,
      AppRoutingModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatCheckboxModule,
      FormsModule,
      MatSelectModule,
      MatSlideToggleModule,
      ReactiveFormsModule,
      MatProgressSpinnerModule,
      HttpClientModule
  ],
  entryComponents: [
      LoginComponent
  ],
  providers: [DishService,PromotionService,LeaderService,{provide: 'BaseURL', useValue: baseURL},ProcessHTTPMsgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
