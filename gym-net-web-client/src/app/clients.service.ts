import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Client} from "./client";

@Injectable()
export class ClientsService {

  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  private baseUrl =  process.env.API_URL ||'api';  // URL to web api

  constructor(private http: Http) {
  }

  getClients(): Promise<Client[]> {
    return this.http.get(this.baseUrl+"/client/", {headers: this.headers}).toPromise().then((response) => {
      return response.json().result as Client[];
    }).catch(this.handleError);
  }


  getClient(id: number): Promise<Client> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url).toPromise().then(response => response.json().result as Client).catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers}).toPromise().then(() => null).catch(this.handleError);
  }

  create(name: string): Promise<Client> {
    return this.http.post(this.baseUrl, JSON.stringify({name: name}), {headers: this.headers}).toPromise().then(res => res.json().result as Client).catch(this.handleError);
  }

  update(hero: Client): Promise<Client> {
    const url = `${this.baseUrl}/${hero._id}`;
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers}).toPromise().then(() => hero).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
