import rateLimiter from 'express-rate-limit';

export const authRateLimiter = rateLimiter({
    windowMs: 15*60*1000,
    max: 10,
    message: {
        success: false,
        message: 'Too many requests. Please try again later.'
    }
});