export class MyCollectionSettings {
    constructor(
        public virtualDirectoriesHost: string, 
        public virtualDirectoriesRelativePaths: Array<string>
    )
    {
        virtualDirectoriesRelativePaths = [];
    }
}