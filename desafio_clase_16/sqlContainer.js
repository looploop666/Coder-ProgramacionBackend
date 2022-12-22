import knex from 'knex'

class ClienteSQL {

    constructor(options, tableName) {
        this.knex = knex(options);
        this.tableName = tableName;
    }

    crearTabla(tableName) {
        return this.knex.schema.dropTableIfExists(`${tableName}`)
            .finally(() => {
                return this.knex.schema.createTable(`${tableName}`, table => {
                    if (tableName === 'productos') {
                        table.increments('id').primary()
                        table.string('title', 15).notNullable()
                        table.float('price').notNullable()
                        table.string('thumbnail', 100).notNullable()

                    } else if (tableName === 'mensajes') {
                        table.increments('id').primary()
                        table.string('email', 35).notNullable()
                        table.dateTime('ddhh').notNullable()
                        table.string('message', 25).notNullable()
                    }
                })
            })
    }

    save(items, tableName) {
        return this.knex(`${tableName}`).insert(items)
    }

    getById(id, tableName) {
        return this.knex(`${tableName}`).select('*').where('id', '=', id)
    }

    getAll(tableName) {
        return this.knex(`${tableName}`).select('*')
    }

    deleteAll(tableName) {
        return this.knex.from(`${tableName}`).del()
    }

    deleteById(id, tableName) {
        return this.knex.from(`${tableName}`).where('id', '=', id).del()
    }

    close() {
        this.knex.destroy()
    }
}

export default ClienteSQL