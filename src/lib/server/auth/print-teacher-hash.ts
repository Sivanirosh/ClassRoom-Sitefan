import { hashTeacherPassword } from './password-hash';

const password = process.argv.slice(2).join(' ');

if (!password) {
  console.error('Usage: npm run teacher:hash -- "mot-de-passe-enseignant"');
  process.exit(1);
}

console.log(hashTeacherPassword(password));
