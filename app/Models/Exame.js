'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Exame extends Model {
  static get table() {
    return 'exams'
  }
}

module.exports = Exame
