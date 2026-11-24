import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import dns from 'dns';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

// 1. Force IPv4 first to prevent Windows dual-stack DNS resolution issues on Atlas
dns.setDefaultResultOrder('ipv4first');

// 2. Load environment variables from backend/.env safely
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

/**
 * Securely prompts for input with masked keystrokes ('*') in interactive TTY terminals.
 * Never echoes the cleartext password to stdout.
 */
function askMaskedPassword(promptText) {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    const stdout = process.stdout;

    stdout.write(promptText);

    if (!stdin.isTTY) {
      // Non-interactive fallback
      const rl = readline.createInterface({ input: stdin, output: stdout });
      rl.question('', (ans) => {
        rl.close();
        resolve(ans.trim());
      });
      return;
    }

    let input = '';
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf-8');

    const onData = (chunk) => {
      for (const char of chunk) {
        if (char === '\r' || char === '\n' || char === '\u0004') {
          // Enter pressed
          stdin.removeListener('data', onData);
          stdin.setRawMode(false);
          stdin.pause();
          stdout.write('\n');
          resolve(input);
          return;
        } else if (char === '\u0003') {
          // Ctrl+C pressed
          stdin.removeListener('data', onData);
          stdin.setRawMode(false);
          stdin.pause();
          stdout.write('\n[Operation canceled by user]\n');
          process.exit(130);
        } else if (char === '\u0008' || char === '\x7f') {
          // Backspace pressed
          if (input.length > 0) {
            input = input.slice(0, -1);
            stdout.write('\b \b');
          }
        } else if (char.charCodeAt(0) >= 32) {
          // Printable character
          input += char;
          stdout.write('*');
        }
      }
    };

    stdin.on('data', onData);
  });
}

async function resetAdminPassword() {
  console.log('======================================================');
  console.log(' Khan Sher Portfolio - Admin Password Reset Utility  ');
  console.log('======================================================\n');

  // Validate environment configuration
  if (!process.env.MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI is not defined in backend/.env.');
    process.exit(1);
  }

  try {
    console.log('[1/4] Connecting securely to database...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log('✓ Database connection established successfully.\n');

    console.log('[2/4] Verifying existing admin record...');
    const admin = await Admin.findOne();
    if (!admin) {
      console.error('❌ Error: No existing admin account found in the database.');
      console.error('Please initialize an account via the setup interface first.');
      await mongoose.disconnect();
      process.exit(1);
    }

    console.log(`✓ Existing admin account found:`);
    console.log(`  - Username : ${admin.username}`);
    console.log(`  - Email    : ${admin.email}`);
    console.log(`  - Role     : ${admin.role}`);
    console.log(`  - Account ID: ${admin._id}`);
    console.log(`  (Note: Username, email, role, and ID will be strictly preserved)\n`);

    console.log('[3/4] Enter your new master password:');
    const newPassword = await askMaskedPassword('Enter new password (min 6 characters): ');
    if (!newPassword || newPassword.length < 6) {
      console.error('\n❌ Error: Password must be at least 6 characters long.');
      await mongoose.disconnect();
      process.exit(1);
    }

    const confirmPassword = await askMaskedPassword('Confirm new password: ');
    if (newPassword !== confirmPassword) {
      console.error('\n❌ Error: Passwords do not match. No changes have been saved.');
      await mongoose.disconnect();
      process.exit(1);
    }

    console.log('\n[4/4] Hashing password with bcrypt and updating database...');
    admin.password = newPassword;
    await admin.save(); // Triggers Mongoose pre('save') hook with bcryptjs 10 rounds

    console.log('✓ Password updated and hashed successfully in MongoDB Atlas.\n');
    console.log('======================================================');
    console.log(' SUCCESS: Admin password has been reset successfully!');
    console.log(` Log in with Username: "${admin.username}" or Email: "${admin.email}"`);
    console.log(' URL: http://localhost:5173/admin/login');
    console.log('======================================================\n');
  } catch (error) {
    console.error('\n❌ An error occurred during password reset:');
    if (error.name === 'MongooseServerSelectionError') {
      console.error('Database connection failed. Please ensure your internet connection is active');
      console.error('and your IP address is whitelisted in MongoDB Atlas Network Access.');
    } else {
      console.error(error.message);
    }
    process.exit(1);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

resetAdminPassword();

