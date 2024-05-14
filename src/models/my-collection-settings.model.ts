export class MyCollectionSettings {
    constructor(
        public virtualDirectoriesHost?: string, 
        public virtualDirectoriesRelativePaths?: Array<string>,
        public collectionPicIdentifier?: string,
        public collectionBannerIdentifier?: string
    ){}
}