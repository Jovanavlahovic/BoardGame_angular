import { Component, OnInit } from '@angular/core';
import { GamesService } from '../service/games.service';
import { Game, GameList } from './model/game.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  gameList: GameList;
  categories: string[];

  params = {
    page: 1,
    pageSize: 6,
    filter: {
      minRating: '',
      maxRating: '',
      categories: 'wargames',
    },
  };

  constructor(private service: GamesService) {}

  ngOnInit(): void {
    this.getGames();
    this.getCategories();
  }

  getGames(): void {
    this.service.getGames(this.params).subscribe((x) => {
      this.gameList = x;
    });
  }

  getCategories(): void {
    this.service.getCategories().subscribe((x) => (this.categories = x));
  }

  getPage(page: number): void {
    this.params.page = page;
    this.getGames();
  }
}
