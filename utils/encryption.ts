import crypto from 'crypto';
import Encription from '../interfaces/utils/Encription.interface';

const encription: Encription = {
  generateSalt: () => crypto.randomBytes(128).toString('base64'),
  generateHashedPassword: (salt: string, password: string) => crypto
  .createHmac('sha256', salt)
  .update(password)
  .digest('hex')
}

export default encription;