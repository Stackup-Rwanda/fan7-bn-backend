import bcryptjs from 'bcryptjs';

const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const hashed = await bcryptjs.hash(password, salt);
  return hashed;
};

// decrypting passwiord

const decryptPassword = async (dataTodecrypt, dataBaseHash) => {
  const deHashedPassword = await bcryptjs.compare(dataTodecrypt, dataBaseHash);
  return deHashedPassword;
};
export default { hashPassword, decryptPassword };
