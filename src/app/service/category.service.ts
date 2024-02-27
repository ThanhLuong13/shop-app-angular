import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private getCategoriesApi = `${environment.apiBaseUrl}/categories`;

  constructor(private http: HttpClient) { }
  //getter/setter
  getCategories(page: number, limit: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());
    return this.http.get<Product[]>(this.getCategoriesApi, { params });
  }
}
