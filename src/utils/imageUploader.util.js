import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
const {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env;
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

const extensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];

class ImageUploader {
  /**
     *
     * @param {*} image
     * @returns {string} image url
     */
  static async uploadImage(image) {
    const imgExt = image.name.split('.').pop();
    if (extensions.includes(imgExt)) {
      const result = await cloudinary.uploader.upload(image.path);
      return result.url;
    }
    return null;
  }

  /**
   *
   * @param {*} images
   * @returns {string} url
   */
  static async uploader(images) {
    let uploaded;
    if (!images.length) {
      uploaded = await this.uploadImage(images);
      return uploaded;
    }
  }
}

export default ImageUploader;
