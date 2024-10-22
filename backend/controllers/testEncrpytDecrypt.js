import { encrypt, decrypt, prepareUserData } from './encryptController.js';
import { config } from 'dotenv';
config({ path: '../.env' });

//Generate a random 256-bit (32 bytes) key for AES encryption
//const key = crypto.randomBytes(32);
//use the key in the .env file
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');

async function testEncrypt() {
    const textToEncrypt = "mySensitiveData"; // Example data
    const encryptedData = await encrypt(textToEncrypt, key);
    console.log("Encrypted Data:", encryptedData);
    return encryptedData; // Return the encrypted data for further testing
}

async function testDecrypt(encryptedData) {
    const decryptedData = await decrypt(encryptedData, key);
    console.log("Decrypted Data:", decryptedData);
}

// Run tests
async function runTests() {
    const encryptedData = await testEncrypt();
    await testDecrypt(encryptedData);
}

runTests().catch(console.error);
