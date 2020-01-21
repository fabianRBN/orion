import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { User } from './class/user';
import { ProjectService } from './service/project.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './service/login.service';
import { Session } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User ={
    name:'',
    active:true,
    contact: null,
    description:'',
    external:true,
    id:null,
    level: null,
    resources:[],
    source:null
  };
  //Progress Bar
  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;

  proyectSelected = '0';

  proyectos:any =[];

  constructor(private userService: UserService, 
    private projectService: ProjectService, 
    private cookieService: CookieService,
    private loginService: LoginService
    ){

  }

  changeSelectProject(id){
    console.log(id)
  }

  ngOnInit() {
    this.userService.getSingOn().subscribe((data)=>{
      this.user =  data;    
          
    });
    this.projectService.getlistMyProjects().subscribe((data2:any)=>{
      this.proyectos = data2.projectNode;
      this.proyectos.forEach((element:any) => {
        this.projectService.getPlanForProject(element.id).subscribe((planProject:any)=>{
          element.progreso = planProject.complete;
          element.actualEffort =planProject.actualEffort;
          element.remainingEffort = planProject.remainingEffort;
          element.planing = planProject;
        })
      });
      
      console.log(this.proyectos)
    });
  
  }
}
