import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { awsS3Client } from '../config/awsConfig';
import { FileStorage } from '../../domain/interfaces/uploadRepository';

export class S3FileStorage implements FileStorage {
  private s3: AWS.S3;
  private bucketName: string = "bucketmantenimiento";

  constructor() {
    this.s3 = awsS3Client;
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    const fileKey = `${uuidv4()}-${file.originalname}`;
    try {
      const uploadResult = await this.s3.upload({
        Bucket: this.bucketName,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      }).promise();

      return uploadResult.Location;
    } catch (error) {
      throw new Error(`Error al guardar el archivo en S3: ${error}`);
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const fileKey = new URL(fileUrl).pathname.slice(1);
      await this.s3.deleteObject({
        Bucket: this.bucketName,
        Key: fileKey,
      }).promise();
    } catch (error) {
      throw new Error(`Error al eliminar el archivo de S3: ${error}`);
    }
  }
}