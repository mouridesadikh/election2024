import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'election2024';
    currentPath: string = '';
    constructor(private router : Router){
     
    }
    
    ngOnInit(){
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        // Mettre à jour le chemin de la page courante à chaque changement de navigation
        this.currentPath = event.url;
        console.log('====================================');
        console.log(this.currentPath);
        console.log('====================================');
      });
    }
}
