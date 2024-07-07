import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private _http: HttpClient) {}

  private baseTaskUrl = 'http://localhost:5000/api/tasks';

  addTask(data: any): Observable<any> {
    return this._http.post(`${this.baseTaskUrl}/create`, data);
  }

  getTasks(): Observable<any> {
    return this._http.get(`${this.baseTaskUrl}/get`);
  }

  updateTask(id: number, data: any): Observable<any> {
    console.log(data);
    return this._http.put(`${this.baseTaskUrl}/update/${id}`, data);
  }

  deleteTask(id: number): Observable<any> {
    return this._http.delete(`${this.baseTaskUrl}/delete/${id}`);
  }
}
