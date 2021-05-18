'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LaboratoryExame extends Model {
  static get table() {
    return 'laboratory_exams'
  }
}

module.exports = LaboratoryExame
