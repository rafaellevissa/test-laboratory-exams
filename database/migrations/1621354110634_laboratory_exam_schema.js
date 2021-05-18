'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LaboratoryExamSchema extends Schema {
  up() {
    this.create('laboratory_exams', (table) => {
      table.increments()
      table.timestamps()
    })

    this.alter('laboratory_exams', (table) => {
      table.integer('fk_laboratory')
        .unsigned()
        .references('id')
        .inTable('laboratories')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.integer('fk_exam')
        .unsigned()
        .references('id')
        .inTable('exams')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  down() {
    this.table('laboratory_exams', (table) => {
      table.dropForeign('fk_exam')
      table.dropForeign('fk_laboratory')
    })
    this.drop('laboratory_exams')
  }
}

module.exports = LaboratoryExamSchema
