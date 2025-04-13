require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI, 
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
  JWT_EXPIRE: '8h',
  // Hardcoded guard credentials (in production, store hashed password)
  GUARD_CREDENTIALS: {
    email: 'guard@pict.edu',
    password: '123456',
    role: 'guard'
  },

};