import crypto from 'crypto';

class Encryption {
  static generateSalt(): string {
    return crypto.randomBytes(128).toString('base64');
  }

  static generateHashedPassword(salt: string, password: string): string {
    return crypto
      .createHmac('sha256', salt)
      .update(password)
      .digest('hex')
  }
}

export default Encryption;