import {Injectable} from '@angular/core';
import {URLSearchParams} from "@angular/http";
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import {User} from '../_models/index';

@Injectable()
export class UserService {
	constructor(private http: Http) {
	}

	getAll() {
		return this.http.get('/api/user').map((response: Response) => {
			return response.json().result;
		});
	}

	getBy(parametersToAdd: any) {
		let params: URLSearchParams = new URLSearchParams();
		for(let key in parametersToAdd) {
			params.set(key, parametersToAdd[key]);
		}

		return this.http.get('/api/user', {search: params}).map((response: Response) => {
			return response.json().result;
		});
	}

	getById(id: number) {
		return this.http.get('/api/user/' + id).map((response: Response) => response.json().result);
	}

	create(user: User) {
		return this.http.post('/api/user', user).map((response: Response) => response.json().result);
	}

	update(user: User) {
		return this.http.put('/api/user/' + user._id, user).map((response: Response) => response.json().result);
	}

	delete(id: number) {
		return this.http.delete('/api/user/' + id).map((response: Response) => response.json().result);
	}

}