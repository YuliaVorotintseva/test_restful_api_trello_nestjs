export default () => ({
    port: process.env.PORT,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiration: process.env.JWT_EXPIRATION
    }
})