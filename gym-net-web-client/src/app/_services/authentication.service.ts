import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {UserService} from "./user.service";

@Injectable()
export class AuthenticationService {
	constructor(private http: Http, private usersService: UserService) {
	}

	login(email: string, password: string) {
		return this.usersService.getBy({email: email, password: password});
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
	}
}