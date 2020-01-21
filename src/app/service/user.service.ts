import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USSER ='administrator%40orionecuador.com';
  private PASSWORD= 'orionecuador';
  private header: any;

  


  constructor(private httpClient: HttpClient) { }


  public getSingOn(){

     this.header = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  sg7KIH0zlSi6pBJMpUgRAvAMwSrDmWvdhDCcfzo22tLGZtJWwGImnAPAK0xIFbL0fstz3OcJktUfMcTviEkT79iC3GXOHF48JvDkz86KWaT4ziSeox1YMhiWPSWRQ81J'
    })
    return this.httpClient.get<User>(
       `/api/json/v2/users/signOn?login=${this.USSER}&password=${this.PASSWORD}&language=es_ES`,
       {headers:this.header, withCredentials:true}
      );
  }

  public getlistMyProjects(){

    this.header = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 39RJCAs2VB9LTIYjVNlDiikXo7JfRZ7eWWtCv2XRq8ynWxjKCABPN3fuRRLmrwHlkhzvoljiZs0Zh6fVg6Htu5MiyLat8UIEG3zLSTyS1tUyZXQFJpYqmUVcV6NagD08'
    })
   return this.httpClient.get(
      `/api/json/v2/projects/listMyProjects`,{headers:this.header, withCredentials:true}
     );
 }
}
