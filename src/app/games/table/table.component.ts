import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../model/game.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
@Input() list: Game[];

  constructor() { }

  ngOnInit(): void {
  }

}
