'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LaboratorySchema extends Schema {
  up() {
    this.create('laboratories', (table) => {
      table.increments()
      table.string('name').unique().notNullable()
      table.string('address').notNullable()
      table.enu('status', ['ativo', 'inativo']).defaultTo('ativo')
      table.timestamps()
    })
  }

  down() {
    this.drop('laboratories')
  }
}

module.exports = LaboratorySchema
