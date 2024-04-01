import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor(private router: Router){}

  ngOnInit(){}

  doSearch(value: string){
    console.log(`value= ${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }

}
