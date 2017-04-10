import {Component, OnInit} from '@angular/core';

import {User} from '../_models/index';
import {UserService} from '../_services/index';

@Component({
	moduleId: module.id.toString(),
	templateUrl: 'clients.component.html'
})

export class ClientsComponent implements OnInit {
	clients: User[] = [];
	currentUser: User;

	constructor(private userService: UserService) {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}

	ngOnInit() {
		this.loadAllClients();
	}

	deleteUser(id: number) {
		this.userService.delete(id).subscribe(() => {
			this.loadAllClients()
		});
	}

	private loadAllClients() {
		this.userService.getBy({role: {$in: ['CLIENT']}}).subscribe(clients => {
			this.clients = clients;
		});
	}
}