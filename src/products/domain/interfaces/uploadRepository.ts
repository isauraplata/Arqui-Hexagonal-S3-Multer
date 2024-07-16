export interface FileStorage {
    saveFile(file: Express.Multer.File): Promise<string>;
}