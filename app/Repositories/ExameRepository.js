'use strict'

const Exame = use('App/Models/Exame')

class ExameRepository {

  static async findAll() {
    const exams = await Exame.all()
    return exams.toJSON()
  }

  static async store(data) {
    const exame = await Exame.create(data)
    return exame
  }

  static async findByID(id) {
    const exame = await Exame.findBy('id', id)
    return exame
  }

  static async update({ exame, data }) {
    data.name = data.name === null ? exame.name : data.name
    data.status = data.status === null ? exame.status : data.status
    data.type = data.type === null ? exame.type : data.type

    exame.merge(data)
    await exame.save()

    return exame
  }

  static async destroy(id) {
    const exame = await this.findByID(id)
    await exame.delete()
  }
}

module.exports = ExameRepository
