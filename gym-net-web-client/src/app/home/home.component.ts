import {Component, OnInit} from "@angular/core";
import {User} from "../_models/user";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    ngOnInit(): void {
    }

    currentUser: User;

    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
}