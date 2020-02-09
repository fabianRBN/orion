import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../class/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  header: any = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 39RJCAs2VB9LTIYjVNlDiikXo7JfRZ7eWWtCv2XRq8ynWxjKCABPN3fuRRLmrwHlkhzvoljiZs0Zh6fVg6Htu5MiyLat8UIEG3zLSTyS1tUyZXQFJpYqmUVcV6NagD08'
  })
  /* private urlPath ="https://americas.onepoint-projects.com"; */
  private urlPath ="";

  constructor(private httpClient: HttpClient) { }

  public getlistMyProjects(){

    
   return this.httpClient.get(
      this.urlPath + `/api/json/v2/projects/listMyProjects`,{headers: this.header, withCredentials:true}
     );
 }
  
 public getlistMyProjectsPromese(){

    
  return this.httpClient.get(
     this.urlPath + `/api/json/v2/projects/listMyProjects`,{headers: this.header, withCredentials:true}
    ).toPromise();
  }

  public getPlanForProject(idProject){
   
   return this.httpClient.get(
      this.urlPath + `/api/json/v2/projects/getPlanForProject/`+idProject,{headers:this.header, withCredentials:true}
     );
  }

  public getPlanForProjectPromise(idProject){
   
    return this.httpClient.get(
       this.urlPath + `/api/json/v2/projects/getPlanForProject/`+idProject,{headers:this.header, withCredentials:true}
      ).toPromise();
   }

  public getProjectStatusById(idProjectStatus){
   
    return this.httpClient.get(
       this.urlPath + `/api/json/v2/projects/getProjectStatusById/`+idProjectStatus,{headers:this.header, withCredentials:true}
      );
   }

   public getProjectStatusByIdPromise(idProjectStatus){
   
    return this.httpClient.get(
       this.urlPath + `/api/json/v2/projects/getProjectStatusById/`+idProjectStatus,{headers:this.header, withCredentials:true}
      ).toPromise();
   }

  public listTaskOfProject(idProject){
    return this.httpClient.get(
      this.urlPath + `/api/json/v2/tasks/listTasksOfProject/`+idProject,{headers:this.header, withCredentials:true}
     );
  }

  public listMyTasks(idProject){
    return this.httpClient.get(
      this.urlPath + `/api/json/v2/tasks/listMyTasks?projectIds=`+idProject,{headers:this.header, withCredentials:true}
     );
  }
  public listMyPortfolios(minLevel){
    return this.httpClient.get(
      this.urlPath + `/api/json/v2/projects/listMyPortfolios?minLevel=`+minLevel,{headers:this.header, withCredentials:true}
     );
  }

  public getRootPortfolio(){
    return this.httpClient.get<any>(
      this.urlPath + `/api/json/v2/projects/getRootPortfolio`,{headers:this.header, withCredentials:true}
     ).toPromise();
  }
  

}
