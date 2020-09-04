import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient) { }

  public subscribe(firstName: string, lastName: string, email: string, phone: string): Observable<any[]> {
    let bodyData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      phone: phone
    };
    let headers = new HttpHeaders({ "content-type": "application/json" });
    var result = this.http.post<any>("https://5eed24da4cbc340016330f0d.mockapi.io/api/subscribe", bodyData, { headers: headers });
    return result;
  }
}
