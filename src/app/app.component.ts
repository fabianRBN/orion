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
  constructor(private userService: UserService, 
    private projectService: ProjectService, 
    private cookieService: CookieService,
    private loginService: LoginService
    ){

  }

  ngOnInit() {
    this.userService.getSingOn().subscribe((data)=>{
      this.user =  data;
      console.log(this.user);
       this.cookieService.set('JSESSIONID',JSON.stringify(data),0,'/','americas.onepoint-projects.com'); 
      this.loginService.setUserLoggedIn(data);
    
      this.userService.getlistMyProjects().subscribe((data)=>{
        console.log(data)
      });
     
    });

  
  }
}
