import multer, { StorageEngine } from "multer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Configuración de multer para almacenamiento local
const diskStorageConfig: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../uploads'));

  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Configuración de multer para almacenamiento en memoria (S3)
const memoryStorageConfig: StorageEngine = multer.memoryStorage();

// Función para determinar el tipo de almacenamiento basado en USE_S3
const getStorageConfig = () => {
  if (process.env.USE_S3 === 'true') {
    return memoryStorageConfig;
  } else {
    return diskStorageConfig;
  }
};

// Configuración del middleware de subida
export const upload = multer({
  storage: getStorageConfig(),
}).single("image");
