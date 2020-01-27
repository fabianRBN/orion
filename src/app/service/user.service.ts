import {
    Injectable
}
from '@angular/core';
import {
    HttpClient, HttpHeaders
}
from '@angular/common/http';
import {
    User
}
from '../class/user';

@Injectable({ providedIn: 'root' }) export class UserService {

    private USSER ='administrator%40orionecuador.com';
    private PASSWORD= 'orionecuador';
    private header: any;
    private urlPath ="https://americas.onepoint-projects.com";


    constructor(private httpClient: HttpClient) {
        this.header = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer sg7KIH0zlSi6pBJMpUgRAvAMwSrDmWvdhDCcfzo22tLGZtJWwGImnAPAK0xIFbL0fstz3OcJktUfMcTviEkT79iC3GXOHF48JvDkz86KWaT4ziSeox1YMhiWPSWRQ81J' })
    }


    public getSingOn() {

      this.header = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer sg7KIH0zlSi6pBJMpUgRAvAMwSrDmWvdhDCcfzo22tLGZtJWwGImnAPAK0xIFbL0fstz3OcJktUfMcTviEkT79iC3GXOHF48JvDkz86KWaT4ziSeox1YMhiWPSWRQ81J' })
        return this.httpClient.get<User>(this.urlPath + `/api/json/v2/users/signOn?login=${this.USSER}&password=${this.PASSWORD}&language=es_ES`, {headers:this.header, withCredentials:true});
    }

    public getlistMyProjects() {

      this.header = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer sg7KIH0zlSi6pBJMpUgRAvAMwSrDmWvdhDCcfzo22tLGZtJWwGImnAPAK0xIFbL0fstz3OcJktUfMcTviEkT79iC3GXOHF48JvDkz86KWaT4ziSeox1YMhiWPSWRQ81J' })
        return this.httpClient.get(this.urlPath + `/api/json/v2/projects/listMyProjects`,{headers:this.header, withCredentials:true});
    }

    public getRecurso(id: string) {

      this.header = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer sg7KIH0zlSi6pBJMpUgRAvAMwSrDmWvdhDCcfzo22tLGZtJWwGImnAPAK0xIFbL0fstz3OcJktUfMcTviEkT79iC3GXOHF48JvDkz86KWaT4ziSeox1YMhiWPSWRQ81J' })
        return this.httpClient.get(this.urlPath + `/api/json/v2/resources/getResourceById/`+id,{headers:this.header, withCredentials:true});
    }
}
