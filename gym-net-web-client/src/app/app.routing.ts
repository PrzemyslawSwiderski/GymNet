import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/index";
import {RegisterComponent} from "./register/index";
import {HomeRoutes} from "./home/home.routes";

const appRoutes: Routes = [
	...HomeRoutes,
	{path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterComponent},

	// otherwise redirect to home
	{path: '**', redirectTo: ''}
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);