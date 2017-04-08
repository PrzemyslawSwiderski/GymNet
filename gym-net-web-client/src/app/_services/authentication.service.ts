import {Injectable} from '@angular/core';
import {URLSearchParams} from "@angular/http";
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
	constructor(private http: Http) {
	}

	login(email: string, password: string) {
		let params: URLSearchParams = new URLSearchParams();
		params.set("email", email);
		params.set("password", password);

		return this.http.get('/api/user/', {search: params}).map((response: Response) => {
			let user = response.json().result[0];
			if (user) {
				localStorage.setItem('currentUser', JSON.stringify(user));
			}else {
				throw new Error('No user with the given Email and Password');
			}
		});
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
	}
}