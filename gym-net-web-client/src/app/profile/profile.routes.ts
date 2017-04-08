import {Routes}     from "@angular/router";
import {ProfileEditComponent}      from "./profile_edit.component";
import {ProfileShowComponent}      from "./profile_show.component";
import {ProfileComponent} from "./profile.component";
import {AuthGuard} from "../_guards/auth.guard";

export const ProfileRoutes: Routes = [
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "edit", component: ProfileEditComponent
      },
      {
        path: "", component: ProfileShowComponent
      }
    ]
  }
];
