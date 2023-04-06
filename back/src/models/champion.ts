export class Champion {
    public name: string; 
    public img: string;
    public gender: string;
    public position:  string[];
    public species: string[];
    public ressource: string;
    public RangeType : string[];
    public Region : string[];
    public date: number;

    constructor(name:string, img:string, gender:string, position:string[], species: string[], ressource:string, RangeType : string[], Region : string[], date : number) {
        this.name = name;
        this.img = img;
        this.gender = gender;
        this.position = position;
        this.species = species;
        this.ressource = ressource;
        this.RangeType = RangeType;
        this.Region = Region;
        this.date = date;
      }
}