module.exports = {
  NAME_OF_PROJECT: "Редактор курсов",
  MONGO_URL: "mongodb://localhost:27017/project-editor",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  PORT: process.env.PORT || 3000
};
