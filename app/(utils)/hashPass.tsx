import bcrypt from 'bcryptjs';

export async function hashPass(password: string) {
  return bcrypt.hash(password, 10).then(function (hash: string) {
    return hash;
  });
}

export async function isSamePass(password: string, hashedPassword: string) {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
}
