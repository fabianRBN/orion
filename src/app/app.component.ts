import { Component, OnInit,Injectable } from '@angular/core';
import { UserService } from './service/user.service';
import { User } from './class/user';
import { ProjectService } from './service/project.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogActividadComponent } from './dialog-actividad/dialog-actividad.component'
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, merge} from 'rxjs';
import {map} from 'rxjs/operators';

export class DynamicFlatNode {
  constructor(public item: string, public level: number = 1, public expandable: boolean = false,
              public isLoading: boolean = false) {}
}
export class DynamicDatabase {
  dataMap = new Map();

  rootLevelNodes = ['194216117'];

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
  }


  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}
@Injectable()
export class DynamicDataSource {

  dataChange: BehaviorSubject<DynamicFlatNode[]> = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private treeControl: FlatTreeControl<DynamicFlatNode>,
              private database: DynamicDatabase) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this.treeControl.expansionModel.onChange!.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach((node) => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.reverse().forEach((node) => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this.database.getChildren(node.item);
    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(name =>
          new DynamicFlatNode(name, node.level + 1, this.database.isExpandable(name)));
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        this.data.splice(index + 1, children.length);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 1000);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DynamicDatabase]
})
export class AppComponent implements OnInit {

  showFiller = false;
  panelOpenState = false;
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

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  proyectSelected:any = '0';

  allProject: any =  {
    total:0,
    base: 0,
    value:0,
    spi:0
  };
  portafolioRoot:any={data:[] , label:'Proyectos'};
  datosGrafica:any = [];
  datosPortafolioBar = { data:[] , label:'Proyectos',backgroundColor:[],borderColor:[],hoverBackgroundColor:[],hoverBorderColor:[]};
  datosfinales = [this.datosPortafolioBar];
  estandarColores =[
    {color:'#ffdd4c',label:'01-Conceptualización'},
    {color:'#ffdd4c',label:'01-Conceptualización'},
    {color:'#ffdd4c',label:'01-Conceptualización'},
    {color:'#ffdd4c',label:'01-Conceptualización'},
    {color:'#ffdd4c',label:'01-Conceptualización'},
    {color:'#ffdd4c',label:'01-Conceptualización'},
    {color:'#ffdd4c',label:'01-Conceptualización'},
    {color:'#ffdd4c',label:'01-Conceptualización'},
    {color:'#ffdd4c',label:'01-Conceptualización'},
    {color:'#ffdd4c',label:'01-Conceptualización'}
  ]
  estadosGrafica = [];
  datosEstadosProyectos = [
      {id:0, label:'01.01-Conceptualización',color:'#ffdd4c'},
      {id:1, label:'01.02-Aprobación',color:'#ffa300'},
      {id:2, label:'02.01-Plan',color:'#85d8f9'},
      {id:3, label:'02.02-TDRs',color:'#c791d3'},
      {id:4, label:'03.01-Licitación',color:'#c791d3'},
      {id:5, label:'03.02-Contratación',color:'#af63c1'},
      {id:6, label:'04.01-Roll-Out',color:'#b1e459'},
      {id:7, label:'04.02-Control',color:'#b1e459'},
      {id:8, label:'04.03-Puesta Operación',color:'#b1e459'},
      {id:9, label:'05-Cierre',color:'rgb(92, 167, 195)'},
      {id:10, label:'inicio',color:'rgb(92, 167, 195)'}
    ];
  estadosProyectos = [];

  proyectos:any =[];
  listActividades: any = [];
  estadosGraficaArray: any=[];
  listPortafolios=[];
  listProjectosProtafolios=[];
  selectorTree:any = {}; 
  dataInicialData: DynamicDatabase;
  arrayPortafolios =[];
  constructor(
    private userService: UserService, 
    private projectService: ProjectService, 
    public dialog: MatDialog,
    database: DynamicDatabase
    ){   
      this.panelOpenState = true;
      this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
      
      this.dataInicialData= database;


  
    
  }
  inicializarTree(){
    var arrayProtafolios;
    console.log(this.listPortafolios)
    this.dataInicialData.dataMap = new Map(this.arrayPortafolios);
    this.dataSource = new DynamicDataSource(this.treeControl, this.dataInicialData);
    this.dataSource.data = this.dataInicialData.initialData(); 
  }

  opendDialog(actividad){
        this.dialog.open(DialogActividadComponent, {data: actividad});
  }

  changeSelectProject(proyecto){
    this.listActividades = [];
    proyecto = proyecto.value;
    if(proyecto.projectManager){
      this.userService.getRecurso(proyecto.projectManager).subscribe( res =>{
        this.proyectSelected.projectManagerData = res;
      })

    }
   

    this.projectService.listTaskOfProject(this.proyectSelected.id).subscribe(task=>{
      this.proyectSelected.tasks = task;  
    });
   

    this.datosGrafica = [ { data: [proyecto.planing.baseEffort, proyecto.planing.actualEffort, proyecto.planing.remainingEffort], label: 'Presupuesto' }];

    this.getListActividates(this.proyectSelected.id);
 
  }

  treenodeselected(event:any){
    if(this.selectorTree.path){
      this.selectorTree.path[0].style.background = 'rgb(255, 255, 255)';
    }

      this.selectorTree = event 
      this.selectorTree.path[0].style.background = 'rgba(120, 188, 255, 0.52)';

  
  
    
  }

  private getListActividates(idProject){
    this.projectService.listMyTasks(idProject).subscribe((actividades: any)=> {
        this.listActividades = actividades.activity;
        this.listActividades.forEach( actividad =>{
          actividad.progresoPorcentaje = 100 * (actividad.actualEffort/(actividad.actualEffort + actividad.openEffort));

        })
        console.log(this.listActividades)
    });

  
  }

  private getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private clearArrays(){
    this.estadosGrafica =[];
    this.datosPortafolioBar.data=[];
    this.datosPortafolioBar.backgroundColor=[];
    this.datosPortafolioBar.borderColor=[];
    this.datosPortafolioBar.hoverBackgroundColor=[];
    this.datosPortafolioBar.hoverBorderColor=[];
    this.datosfinales =  [this.datosPortafolioBar];
  }

  setValueofGrafic(){
    console.log(this.estadosGrafica)
    console.log(this.datosPortafolioBar)
  
      this.clearArrays()
    
    this.contadorEstados(this.estadosProyectos)
   
  }

  contadorEstados(array){
    
    var repetidos = {};
    var labels = [];
    var values = [];
    
    array.forEach(function(numero){
      repetidos[numero] = (repetidos[numero] || 0) + 1;
    });

    for( let item in repetidos){
      
      this.datosfinales[0].data.push(repetidos[item])

      console.log({colores:this.datosEstadosProyectos.filter(x=> x.label == item )[0].color});
      this.datosfinales[0].backgroundColor.push(this.datosEstadosProyectos.filter(x=> x.label == item )[0].color);
      this.datosfinales[0].hoverBackgroundColor.push(this.datosEstadosProyectos.filter(x=> x.label == item )[0].color);
      this.datosfinales[0].hoverBorderColor.push(this.datosEstadosProyectos.filter(x=> x.label == item )[0].color);
      this.datosfinales[0].borderColor.push(this.datosEstadosProyectos.filter(x=> x.label == item )[0].color);

  
    
      this.estadosGrafica.push(item)
    }
    this.datosfinales[0].data.push(0)
    this.estadosGrafica.push('1s')
      this.datosfinales[0].backgroundColor.push(0);
   /* console.log({ data:values, labels:labels }) */

    return { data:values, labels:labels };
  }

  private setDateFinish(start, finish){
    
    start = new Date(start)
    if(finish== null){
      finish = new Date()
    }else{
      finish = new Date(finish)
    }

    return (finish - start)/(1000*60*60*24);
  }

  private getValue(actual, final){
      return (actual * 100 ) / final;
  }

  getNamePortafolio(id){
    if(id == '194216118'){
      return 'Proyectos Eliminados';
    }

    var portafolio = this.listPortafolios.filter(x=> x.id ==id);
   
    if(portafolio.length>0){
      return portafolio[0].name;
    }else{
      console.log(this.proyectos.filter(x=> x.id==id))
      return this.proyectos.filter(x=> x.id==id)[0].name;
    }
   
  }

  private getListMyProtafolios(minLevel){
    this.projectService.listMyPortfolios(minLevel)
    
    .subscribe( (listProyectos) =>{
      this.listPortafolios.push(listProyectos);
    },
    (error)=>{
      console.log('Error listMyPortfolios');
    },
    ()=>{
      this.listPortafolios = this.listPortafolios[0].projectNode;
      

      this.listPortafolios.forEach(
        item =>{
          this.arrayPortafolios.push([ item.id , this.getChildren(item.children )])
        }
      )
      console.log(this.arrayPortafolios)
    })
  }

  private getChildren(children:[]){
    var arrayChildren =[];
    if(children){
      children.forEach( (item:any) =>{
        arrayChildren.push(item.id);
      })
      return arrayChildren;
    }else{
      return [];
    }

  }

  private getProjectsPortafolios(listPortafolios){
    listPortafolios.filter( portafolio =>{
      
    });
  }

  private getPortafolioRoot(){
    this.projectService.getRootPortfolio()
      .then(
        (value: any)=>{
          console.log(value)
        }
      )
      .finally(
        ()=>{
          console.log('Termino')
        }
      )
  }

  private getListMyProjects(){
    return this.projectService.getlistMyProjectsPromese()
    .then(
      (listMyProject:any)=>{
        this.proyectos = listMyProject.projectNode;
        
      });
    
  }

  private getPlanForProject(element:any){
    return this.projectService.getPlanForProjectPromise(element.id).then(
      (planProject:any)=>{
        element.progreso = planProject.complete;
        element.actualEffort =planProject.actualEffort;
        element.remainingEffort = planProject.remainingEffort;
        element.planing = planProject;
        element.spi = element.planing.trackedComplete / 100;
        element.progresoPorcentaje = 100* (element.planing.actualEffort / (element.planing.actualEffort + element.planing.openEffort));
        this.allProject.total = this.allProject.total + element.actualEffort;
        this.allProject.base = this.allProject.base + element.planing.baseEffort;
        this.allProject.value = this.getValue(this.allProject.total,this.allProject.base);
      }
    )
  }

  private getProjectStatusById(element:any, index){
    
    return this.projectService.getProjectStatusByIdPromise(element.projectStatus)
    .then( (estatus:any)=>{
     
      element.projectStatusData = estatus;

      let data:any = this.datosEstadosProyectos.filter( x=> x.label == element.projectStatusData.name)[0];
      this.estadosProyectos.push(data.label); 

   

      
      
    })
  }

  private dataSideBar(chilren:[any]){

    chilren.forEach( child=>{

    })
    

  }

  private getColorfind(id){
    console.log(id)
    return this.datosEstadosProyectos.filter((x:any)=> x.label == id)[0].color;
  }

  
  private test(){
    this.proyectos.reduce((previousPromise,nextId)=>{
      return previousPromise.then(() => {
      }).finally(
        ()=>{
          console.log('final')
        }
      );
    }, Promise.resolve())
  }

  private foreachListMyProjects(){
    
  
  /*   this.test(); */

    this.proyectos.forEach(
      (element:any, index) => {
      this.getPlanForProject(element).finally(
        ()=>{
          if(element.projectStatus){
            this.getProjectStatusById(element,index).finally();
          }
        }
        
      )
      }
      
    ); 
  }

  private getSingOn(){
    this.userService.getSingOn().subscribe(
      (data)=>{
        this.user =  data;
      },
      (error)=>{
        console.log('Error en userService');
      },
      ()=>{
      }
    );
  }

  ngOnInit() {
    
    this.getSingOn();
    this.getListMyProtafolios(90);
    this.getListMyProjects().finally(
      ()=>{
      // Recorrido de lista de projectos
      this.foreachListMyProjects();
      this.getPortafolioRoot();

      setTimeout(
        ()=>{
          this.contadorEstados(this.estadosProyectos)
          /* this.dataSource.data = [{
            name: 'Vegetables',
            children: [
              {
                name: 'Green',
                children: [
                  {name: 'Broccoli'},
                  {name: 'Brussels sprouts'},
                ]
              }, {
                name: 'Orange',
                children: [
                  {name: 'Pumpkins'},
                  {name: 'Carrots'},
                ]
              },
            ]
          }]; */
          

        },500
      )

      }
    )
  }


  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => { return node.level; };

  isExpandable = (node: DynamicFlatNode) => { return node.expandable; };

  hasChild = (_: number, _nodeData: DynamicFlatNode) => { return _nodeData.expandable; };



 


 
}
