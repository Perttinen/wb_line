export const baseUrl =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001/api/'
        : '/api/'