"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// MongoProvider.ts - Conexión a MongoDB usando Mongoose
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.set('strictQuery', true);
const connectMongo = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
    }
    catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1);
    }
};
exports.default = connectMongo;
