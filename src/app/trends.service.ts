import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {


  url: string = "https://playground-trends-backend.herokuapp.com"

  constructor(private http:HttpClient) { }


  trending(data: string){
    var url=this.url + "/trending";
    var httpOptions={
      headers: new HttpHeaders({
      "Content-Type":"text/plain"}),
    };
    return this.http.post<any[]>(url,data, httpOptions);
  }
}
