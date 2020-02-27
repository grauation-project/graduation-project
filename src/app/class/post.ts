export class Post {
    constructor(
        public title: string,
        public content:string,
       public postedby:string,
       public comment:string[],
       public like:string[],
       public createdat:Date
    ){ }
}
