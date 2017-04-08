import {Component}            from "@angular/core";
import {Router}               from "@angular/router";
import "rxjs/add/operator/map";
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";

@Component({
	selector: "profile",
	templateUrl: "profile_edit.template.html"
})

export class ProfileEditComponent {
	userToEdit: User;

	constructor(private router: Router,private userService: UserService) {
		this.userToEdit = JSON.parse(localStorage.getItem('currentUser'));
	}

	onSubmit() {
		var data: any = JSON.stringify(this.userToEdit);

		this.userService.update(this.userToEdit).subscribe(
			response => {
				localStorage.setItem("currentUser", JSON.stringify(this.userToEdit));
				this.router.navigate(["/profile"]);
			},
			error => {
				console.log(error);
			}
		);
		//   this.authHttp
		//     .patch("https://" + myConfig.domain + "/api/v2/users/" + this.auth.userProfile.user_id, data, {headers: headers})
		//     .map(response => response.json())
		//     .subscribe(
		//       response => {
		//         this.auth.userProfile = response;
		//         localStorage.setItem("profile", JSON.stringify(response));
		//         this.router.navigate(["/profile"]);
		//       },
		//       error => {
		//         console.log(error);
		//       }
		//     );
		// }
	}
}
