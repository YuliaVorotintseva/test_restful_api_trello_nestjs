export default () => ({
    port: parseInt(String(process.env.PORT), 10),
    jwt: {
        secret: process.env.JWT_SECRET,
        expiration: process.env.JWT_EXPIRATION
    },
    database: {
        host: process.env.DB_HOST,
        port: parseInt(String(process.env.DB_PORT), 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
})