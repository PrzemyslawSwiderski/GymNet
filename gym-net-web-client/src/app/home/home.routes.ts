import {Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {AuthGuard} from "../_guards/auth.guard";
import {UsersComponent} from "../users/users.component";
import {WelcomeComponent} from "../welcome/welcome.component";
import {ProfileRoutes} from "../profile/profile.routes";
import {PassesComponent} from "../passes/passes.component";
import {ReservationsComponent} from "../reservations/reservations.component";
import {ClientsComponent} from "../clients/clients.component";

export const HomeRoutes: Routes = [
	{
		path: "",
		component: HomeComponent,
		canActivate: [AuthGuard],
		children: [
			...ProfileRoutes,
			{
				path: "users", component: UsersComponent
			},
			{
				path: "clients", component: ClientsComponent
			},
			{
				path: "passes", component: PassesComponent
			},
			{
				path: "reservations", component: ReservationsComponent
			},
			{
				path: "welcome", component: WelcomeComponent
			}
		]
	}
];
