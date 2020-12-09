import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from 'src/app/service/games.service';
import { Game } from '../model/game.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  newGame: Game;
  gameId: number;
  categories: string[];
  formValidator: FormGroup;
  publishDate;

  constructor(
    private route: ActivatedRoute,
    private service: GamesService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gameId = this.route.snapshot.params['id'];
    this.generateForm();
    this.getCategories();
    this.newGame = new Game();

    if (this.gameId) {
      this.service.getGame(this.gameId).subscribe((x) => {
        this.newGame = x;
        this.publishDate = {
          year: this.newGame.publish_date.getFullYear(),
          month: this.newGame.publish_date.getMonth()+1,
          day: this.newGame.publish_date.getDate()
        }
        this.formValidator.get('publish_date').patchValue(this.publishDate);
        this.formValidator.patchValue(this.newGame);
      });
    }
  }

  getCategories(): void {
    this.service.getCategories().subscribe((x) => (this.categories = x));
  }

  generateForm():void{
    this.formValidator = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', [Validators.required, Validators.minLength(50)]],
      'publish_date': ['', Validators.required],
      'categories': [[], Validators.required]
    })
  }

  setDate():void{
    this.publishDate = this.formValidator.get('publish_date').value;
    this.newGame.publish_date = new Date(this.publishDate.year, this.publishDate.month-1, this.publishDate.day);
    console.log(this.newGame.publish_date);
  }

  onSubmit():void{
    this.newGame = this.formValidator.value;
    this.setDate();
    
    if(this.gameId){
      this.newGame._id = this.gameId;
      this.service.updateGame(this.newGame).subscribe(x => 
        this.newGame = x)
    } else {
      this.service.addGame(this.newGame).subscribe(x =>
        this.newGame = x)
    }
    this.formValidator.reset();
    this.router.navigate(['games']);
  }
}
