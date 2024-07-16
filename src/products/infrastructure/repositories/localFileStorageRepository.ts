import fs from "fs/promises";
import path from "path";
import { FileStorage } from "../../domain/interfaces/uploadRepository";

export class LocalFileStorage implements FileStorage {
  async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      if (!file.path) {
        throw new Error("El archivo recibido no contiene una ruta válida.");
      }

      const filePath = path.join(__dirname, "../../../uploads", file.filename);
      if (file.path !== filePath) {
        await fs.rename(file.path, filePath);
      }

      return `uploads/${file.filename}`;
    } catch (error) {
      throw new Error(`Error al guardar el archivo localmente: ${error}`);
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const fullPath = path.join(__dirname, "../../../", filePath);
      await fs.unlink(fullPath);
    } catch (error) {
      throw new Error(`Error al eliminar el archivo local: ${error}`);
    }
  }
}
