import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://157.245.36.128:4500/api/get_student_data'; // Replace this with your API endpoint URL

  constructor(private http: HttpClient) { }
   
  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/endpoint`, data);
  }
}
