import AWS from 'aws-sdk';
import dotenv from "dotenv";

//estas credenciales van cambiando cada vez que se inicia el laboratorio

dotenv.config();
// Configuración de AWS S3
const s3Config = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: "us-east-1"
};
const s3 = new AWS.S3(s3Config);

export const awsS3Client = s3;

