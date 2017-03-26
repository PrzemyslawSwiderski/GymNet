import { Component, OnInit } from '@angular/core';
import {ClientsService} from "../clients.service";
import {Client} from "../client";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];

  constructor(private clientsService: ClientsService) { }

  ngOnInit() {
    this.getClients();
  }

  getClients(): void {
    this.clientsService
    .getClients()
    .then(clients => this.clients = clients);
  }
}
