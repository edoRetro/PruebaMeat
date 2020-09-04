import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  public getAll(category: string): Observable<Article[]> {
    var params = new HttpParams().set('filter', category);
    var result = this.http.get<Article[]>("https://5eed24da4cbc340016330f0d.mockapi.io/api/articles", { params: params });
    return result;
  }
}
