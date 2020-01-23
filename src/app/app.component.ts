import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { User } from './class/user';
import { ProjectService } from './service/project.service';
import {MatSelectChange } from '@angular/material/select'
import { IfStmt } from '@angular/compiler';



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
  proyectSelected:any = '0';

  datosGrafica:any = []

  proyectos:any =[];

 


  

  constructor(private userService: UserService, 
    private projectService: ProjectService, 

    ){
    
  }

  
  

  changeSelectProject(proyecto){
    proyecto = proyecto.value;
    if(proyecto.projectManager){
      this.userService.getRecurso(proyecto.projectManager).subscribe( res =>{
        this.proyectSelected.projectManagerData = res;
      })
    
     
    }else{
      console.log('no existe');
    }
    if(this.proyectSelected.projectStatus){
      this.projectService.getProjectStatusById(this.proyectSelected.projectStatus).subscribe( estatus =>{
        this.proyectSelected.projectStatus = estatus;
      });
    }

    this.projectService.listTaskOfProject(this.proyectSelected.id).subscribe(task=>{
      this.proyectSelected.tasks = task;  
    });
   

    this.datosGrafica = [ { data: [proyecto.planing.baseEffort, proyecto.planing.actualEffort, proyecto.planing.remainingEffort, proyecto.planing.expectedEffort ], label: 'Resources' }];
    console.log(proyecto); 
   
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
          console.log('planProject')
        });
       /*  if(element.projectManager){
          this.userService.getRecurso(element.projectManager).subscribe(res=>{
            element.projectMangerData=res;

          })
        }else{
          element.projectMangerData=null;
        } */
      
      });
      
    });

    
  
  }


 
}
