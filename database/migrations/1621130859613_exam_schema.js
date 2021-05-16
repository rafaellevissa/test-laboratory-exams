'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExamSchema extends Schema {
  up () {
    this.create('exams', (table) => {
      table.increments()
      table.string('name').unique().notNullable()
      table.string('address').notNullable()
      table.enu('type', ['analise', 'clinica', 'imagem']).notNullable()
      table.enu('status', ['ativo', 'inativo']).defaultTo('ativo')
      table.timestamps()
    })
  }

  down () {
    this.drop('exams')
  }
}

module.exports = ExamSchema
