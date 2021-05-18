'use strict'

const LaboratoryExame = use('App/Models/LaboratoryExame')

class LaboratoryExameRepository {

  static async findAll() {
    const laboratory_exames = await LaboratoryExame.all()
    return laboratory_exames.toJSON()
  }

  static async store(data) {
    const laboratory_exame = await LaboratoryExame.create(data)
    return laboratory_exame
  }

  static async findByID(id) {
    const laboratory_exame = await LaboratoryExame.findBy('id', id)
    return laboratory_exame
  }

  static async update({ laboratory_exame, data }) {
    data.fk_laboratory = data.fk_laboratory === null ? laboratory_exame.fk_laboratory : data.fk_laboratory
    data.fk_exam = data.fk_exam === null ? laboratory_exame.fk_exam : data.fk_exam

    laboratory_exame.merge(data)
    await laboratory_exame.save()

    return laboratory_exame
  }

  static async destroy(id) {
    const laboratory_exame = await this.findByID(id)
    await laboratory_exame.delete()
  }
}

module.exports = LaboratoryExameRepository
