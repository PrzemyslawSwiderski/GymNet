import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";
import {ClientsComponent} from "./clients/clients.component";
import {ClientsService} from "./clients.service";

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ClientsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
