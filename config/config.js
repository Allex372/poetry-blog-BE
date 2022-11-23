module.exports = {
    MONGO_URL: 'mongodb://localhost:27017/Blogger',
    // MONGO_URL: 'mongodb+srv://Olleksandr:zIyLM88buYClq1M6@cluster0.ysxtq8s.mongodb.net/?retryWrites=true&w=majority',
    PORT: 5000,
    JWT_ACCESS: process.env.JWT_ACCESS || 'JWT_ACCESS',
    JWT_REFRESH: process.env.JWT_REFRESH || 'JWT_REFRESH',

    ROOT_EMAIL: process.env.ROOT_EMAIL,
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD
};
