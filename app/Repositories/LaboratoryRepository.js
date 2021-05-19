'use strict'

const Laboratory = use('App/Models/Laboratory')

class LaboratoryRepository {

  static async findAll() {
    const laboratorys = await Laboratory.all()
    return laboratorys.toJSON()
  }

  static async store(data) {
    const laboratory = await Laboratory.create(data)
    return laboratory
  }

  static async storeMany(data) {
    const laboratories = await Laboratory.createMany(data)

    return laboratories
  }

  static async findByID(id) {
    const laboratory = await Laboratory.findBy('id', id)
    return laboratory
  }

  static async update({ laboratory, data }) {
    data.name = data.name === null ? laboratory.name : data.name
    data.address = data.address === null ? laboratory.address : data.address
    data.status = data.status === null ? laboratory.status : data.status

    laboratory.merge(data)
    await laboratory.save()

    return laboratory
  }

  static async destroy(id) {
    const laboratory = await this.findByID(id)
    await laboratory.delete()
  }

  static async validatesIfItIsActive(id) {
    const laboratory = await this.findByID(id)
    const validation = laboratory.status === "ativo" ? true : false
    return validation
  }
}

module.exports = LaboratoryRepository
