import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA  } from '@angular/material';

@Component({
  selector: 'app-dialog-actividad',
  templateUrl: './dialog-actividad.component.html',
  styleUrls: ['./dialog-actividad.component.css']
})
export class DialogActividadComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public actividad: any) { 
      console.log(actividad)
   }

  ngOnInit() {
  }

}
