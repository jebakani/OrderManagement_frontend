import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HTTPServiceService {

  constructor(
    private http: HttpClient
  ) { }

  post(url:string, data :any=null, isHeaderRequired :any=false, headers:any=null)
  {
     return this.http.post(environment.baseurl + url,data,isHeaderRequired && headers)
  }
  put(url:string, data :any=null, isHeaderRequired :any=false, headers:any =null)
  {
     return this.http.put(environment.baseurl + url,data,isHeaderRequired && headers)
  }
  get(url:string, isHeaderRequired :any=false, headers:any =null)
  {
     return this.http.get(environment.baseurl + url,isHeaderRequired && headers)
  }
  delete(url:string, isHeaderRequired :any=false, headers:any =null)
  {
     return this.http.delete(environment.baseurl + url,isHeaderRequired && headers)
  }

}
