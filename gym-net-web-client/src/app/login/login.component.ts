import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AlertService, AuthenticationService} from '../_services/index';

@Component({
	moduleId: module.id.toString(),
	templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
	model: any = {};
	loading = false;
	returnUrl: string;

	constructor(private route: ActivatedRoute,
	            private router: Router,
	            private authenticationService: AuthenticationService,
	            private alertService: AlertService) {
	}

	ngOnInit() {
		// reset login status
		this.authenticationService.logout();

		// get return url from route parameters or default to '/welcome'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/welcome';
	}

	login() {
		this.loading = true;
		this.authenticationService.login(this.model.email, this.model.password).subscribe(
			users => {
				let user = users[0];
				if (user) {
					localStorage.setItem('currentUser', JSON.stringify(user));
				} else {
					throw new Error('No user with the given Email and Password');
				}
				this.router.navigate([this.returnUrl]);
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		);
	}
}
