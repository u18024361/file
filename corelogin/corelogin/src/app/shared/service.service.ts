import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { saveAs } from 'file-saver'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
url='https://localhost:44377/api/accounts';
urlll ='https://localhost:44393/api/Admin';
tests ='https://localhost:44393/api/Tutor';
name:string ="ddd";
  constructor(private http: HttpClient, private _jwtHelper: JwtHelperService) { }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
 
    return token && !this._jwtHelper.isTokenExpired(token);
  }

  //admingaurd
  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem("token");
    const decodedToken = this._jwtHelper.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return role === 'Administrator';
  }

  test(formdata): Observable<any>{
   
    return this.http.post(this.tests+'/CreateResource',formdata);
  }

  tester(): Observable<any>{
   
    return this.http.get(this.tests+'/GetResourcesall');
  }

  downloadPdf(id: number) {
    console.log(id);
    return this.http.get(this.tests+'/DownloadResource/' + id, { responseType:'blob' })
      .toPromise();

  }

  getPDF(id:number){
    
    
    const httpOptions = {
      'responseType'  : 'arraybuffer' as 'json'
       //'responseType'  : 'blob' as 'json'        //This also worked
    };
    
    return this.http.get<any>(this.tests+'/DownloadResource/'+id, httpOptions);
    
    }

  postfile(obj): Observable<any>{
   
    return this.http.post(this.urlll+'/CreatContent',obj,{responseType: 'text'});
  }

  postRegister(obj): Observable<any>{
    return this.http.post(this.url+'/register',obj,{responseType: 'text'});
  }

  LoginUser(obj): Observable<any>{
    return this.http.post(this.url+'/Login',obj);
  }

  getData(){
    return this.http.get(this.url+'/Privacy',{responseType: 'text'});
  }

  updateResource(formdata){
    return this.http.put(this.tests+'/EditResource',formdata);
  }

  Application(formdata){
    return this.http.post(this.tests+'/TutorApplication',formdata);
  }

  video(id){
    return this.http.get(this.urlll+'/Video/'+ id, { responseType:'blob' });
  }

}

