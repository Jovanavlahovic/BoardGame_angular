export class Game{ 
    _id: number;
    name: string;
    description: string;
    publish_date: Date;
    categories: string[];
    rating: string;

    constructor(obj?:any){
        this._id  = obj && obj._id || null;
        this.name = obj && obj.name || '';
        this.description = obj && obj.description || '';
        this.publish_date = obj && new Date(obj.publish_date) || null;
        this.categories  = obj && obj.categories || [];
        this.rating  = obj && obj.rating || '';
    }
}

export class GameList{
    count: number;
    games: Game[];

    constructor(obj?:any){
        this.count = obj && obj.count || null;
        this.games = obj && obj.games.map(x => new Game(x))
    }
}