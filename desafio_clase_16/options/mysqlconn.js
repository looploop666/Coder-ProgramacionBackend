export const optionsMDB = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'agatamarina',
        database: 'ecommerce-Productos'
    }
}

export const optionsSqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: './db/ecommerce.sqlite'
    },
    useNullAsDefault: true
}