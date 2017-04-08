import {NgModule} from "@angular/core";
import {ProfileEditComponent} from "./profile_edit.component";
import {ProfileShowComponent} from "./profile_show.component";
import {ProfileComponent} from "./profile.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {appRoutingProviders, routing} from "../app.routing";

@NgModule({
  imports: [
    routing,
    BrowserModule,
    FormsModule],
  declarations: [
    ProfileComponent,
    ProfileShowComponent,
    ProfileEditComponent
  ],
  providers: [
    appRoutingProviders
  ]
})
export class ProfileModule {
}
