export class CustomCollection {
    constructor(
        public id: string,
        public description: string,
        public directory: string,
        public collectionPic?: string,
        public collectionBanner?: string,
        public pics?: Array<string>,
        public videos?: Array<string>,
    ){}
}