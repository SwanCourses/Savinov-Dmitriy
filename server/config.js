const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/savinov_course_app',
  port: process.env.PORT || 8000,
};

export default config;
