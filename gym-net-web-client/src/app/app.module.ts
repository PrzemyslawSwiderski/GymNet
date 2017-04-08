import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {HttpModule} from '@angular/http';

import {BaseRequestOptions} from '@angular/http';

import {AppComponent}  from './app.component';
import {routing}        from './app.routing';

import {AlertComponent} from './_directives/index';
import {AuthGuard} from './_guards/index';
import {AlertService, AuthenticationService, UserService} from './_services/index';
import {HomeComponent} from './home/index';
import {LoginComponent} from './login/index';
import {RegisterComponent} from './register/index';
import {WelcomeComponent} from "./welcome/welcome.component";
import {UsersComponent} from "./users/users.component";
import {ProfileModule} from "./profile/profile.module";
import {PassesComponent} from "./passes/passes.component";
import {ReservationsComponent} from "./reservations/reservations.component";
import {ClientsComponent} from "./clients/clients.component";

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ProfileModule,
		HttpModule,
		routing
	],
	declarations: [
		AppComponent,
		AlertComponent,
		ClientsComponent,
		HomeComponent,
		WelcomeComponent,
		UsersComponent,
		PassesComponent,
		ReservationsComponent,
		LoginComponent,
		RegisterComponent
	],
	providers: [
		AuthGuard,
		AlertService,
		AuthenticationService,
		UserService,
		BaseRequestOptions
	],
	bootstrap: [AppComponent]
})

export class AppModule {
}
