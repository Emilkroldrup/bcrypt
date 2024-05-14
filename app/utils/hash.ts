import crypto from 'crypto';

const generateSalt = (length = 16): string => {
  return crypto.randomBytes(length).toString('hex');
};

export const hashPassword = (password: string, salt: string = generateSalt()): { salt: string; hash: string } => {
  const hash = crypto.createHmac('sha256', salt).update(password).digest('hex');
  return { salt, hash };
};

export const verifyPassword = (inputPassword: string, hashedPassword: string, salt: string): boolean => {
  const { hash } = hashPassword(inputPassword, salt);
  return hash === hashedPassword;
};
