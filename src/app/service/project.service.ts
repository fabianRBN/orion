import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../class/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  header: any;

  constructor(private httpClient: HttpClient) { }

  public getlistMyProjects(){

    this.header = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  sg7KIH0zlSi6pBJMpUgRAvAMwSrDmWvdhDCcfzo22tLGZtJWwGImnAPAK0xIFbL0fstz3OcJktUfMcTviEkT79iC3GXOHF48JvDkz86KWaT4ziSeox1YMhiWPSWRQ81J'
    })
   return this.httpClient.get(
      `/api/json/v2/projects/listMyProjects?minLevel=90&includeArchived=true`,{headers:this.header}
     );
 }

}
