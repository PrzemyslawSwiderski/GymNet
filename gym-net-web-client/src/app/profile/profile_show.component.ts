import { Component }         from "@angular/core";
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";

@Component({
  selector: "profile_show",
  templateUrl: "profile_show.template.html"
})

export class ProfileShowComponent {
  currentUser: User;
  constructor(private userService: UserService) {
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  // constructor(private auth: Auth) {}
};
