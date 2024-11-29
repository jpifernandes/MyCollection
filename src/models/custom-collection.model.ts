export class CustomCollection {

    images: Array<string>;
    videos: Array<string>;

    constructor(
        public id: string,
        public description: string,
        public directories: string[],
        public collectionPic?: string,
        public collectionBanner?: string
    )
    {
        this.images = new Array<string>();
        this.videos = new Array<string>();
    }

    public SetPicAndBanner(pic?: string, banner?: string){
        this.collectionPic = pic;
        this.collectionBanner = banner;
    }
}