export default {
    mysql: {
        connectionLimit: 10,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        database: process.env.DB_SCHEMA
    },
    auth: {
        secret: process.env.SECRET
    },
    mailgun: {
        apiKey: process.env.MAILGUN_KEY,
        domain: process.env.MAILGUN_DOMAIN
    },
    stripeKey: process.env.STRIPE_KEY
}