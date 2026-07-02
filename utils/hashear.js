// hash.js
import bcrypt from 'bcrypt';
import readline from 'readline';

const SALT_ROUNDS = 10;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('🔐 Ingresá la contraseña a hashear: ', async (plainPassword) => {
  try {
    const hashed = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    console.log('\n✅ Contraseña hasheada:\n', hashed);
  } catch (error) {
    console.error('❌ Error al hashear la contraseña:', error);
  } finally {
    rl.close();
  }
});

//COmando para iniciar script : node hashear.js
//colocarse con consola dentro de la carpeta