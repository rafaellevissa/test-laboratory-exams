'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExamSchema extends Schema {
  up () {
    this.create('exams', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('exams')
  }
}

module.exports = ExamSchema
