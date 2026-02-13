import dotenv from 'dotenv';

dotenv.config({ path: 'docker.env' });

export const databaseUrl = process.env.DATABASE_URL;