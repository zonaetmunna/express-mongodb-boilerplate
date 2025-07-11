"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
async function testConnection() {
    try {
        const uri = process.env.MONGODB_URI;
        console.log('Testing MongoDB connection...');
        console.log('URI format check:', uri?.startsWith('mongodb://') || uri?.startsWith('mongodb+srv://'));
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        await mongoose_1.default.connect(uri, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('Successfully connected to MongoDB!');
        await mongoose_1.default.disconnect();
        console.log('Disconnected from MongoDB');
    }
    catch (error) {
        console.error('Connection test failed:', error);
        if (error instanceof Error) {
            console.error('Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
        }
    }
}
testConnection();
//# sourceMappingURL=test-connection.js.map