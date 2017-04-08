import {Component, OnInit} from '@angular/core';

import {User} from '../_models/index';
import {UserService} from '../_services/index';

@Component({
	moduleId: module.id.toString(),
	templateUrl: 'clients.component.html'
})

export class ClientsComponent implements OnInit {
	clients: User[] = [];

	constructor(private userService: UserService) {
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
		this.userService.getBy({role: "CLIENT"}).subscribe(clients => {
			this.clients = clients;
		});
	}
}