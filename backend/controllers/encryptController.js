import { config } from 'dotenv';
config({ path: '../.env' });
import crypto from 'crypto';

//Generate a random 256-bit (32 bytes) key for AES encryption
//const key = crypto.randomBytes(32);
//use the key in the .env file
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');

// AES encryption and decryption functions
async function encrypt(text, key) {
    const initVector = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv('aes-256-cbc', key, initVector);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return initVector.toString('base64') + ':' + encrypted; // Return initVector and encrypted data as base64
}

async function decrypt(encryptedData, key) {
    const [ivBase64, encryptedText] = encryptedData.split(':');
    const initVector = Buffer.from(ivBase64, 'base64');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, initVector);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Encrypt sensitive data
async function prepareUserData(userData) {
    const encryptedCards = await Promise.all(userData.cards.map(card => encrypt(card, key)));
    const encryptedPassword = await encrypt(userData.password, key);
    
    // Replace plaintext data with encrypted data
    userData.cards = encryptedCards;
    userData.password = encryptedPassword;
}


async function run() {
    try {
        await client.connect();
        const database = client.db('mydatabase');
        const users = database.collection('users');

        // Insert the encrypted user data into MongoDB
        await users.insertOne(userData);
        console.log("User data inserted successfully!");

        // Retrieve the encrypted data from MongoDB
        const encryptedRecord = await users.findOne({ email: "johndoe123@gmail.com" });
        
        // Decrypt data for demonstration
        const decryptedCards = encryptedRecord.cards.map(card => decrypt(card, key));
        const decryptedPassword = decrypt(encryptedRecord.password, key);
        
        console.log("Decrypted Cards:", decryptedCards);
        console.log("Decrypted Password:", decryptedPassword);

    } finally {
        await client.close();
    }
}

async function testEncrypt() {
    const testText = "Test Card Number 4242424242424242";
    const encryptedData = await encrypt(testText, key);
    console.log("Encrypted Text:", encryptedData);
    return encryptedData; // Return encrypted data for further testing
}

async function testDecrypt(encryptedData) {
    const decryptedData = await decrypt(encryptedData, key);
    console.log("Decrypted Text:", decryptedData);
}

testEncrypt().then(encryptedData => testDecrypt(encryptedData)).catch(console.error);

//run().catch(console.dir);

export {
    encrypt,
    decrypt,
    prepareUserData,
}


