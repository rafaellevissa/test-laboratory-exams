'use strict'

const { validate } = use('Validator')
const ExameRepository = use('App/Repositories/ExameRepository')
const LaboratoryExameRepository = use('App/Repositories/LaboratoryExameRepository')
const LaboratoryRepository = use('App/Repositories/LaboratoryRepository')

class LaboratoryExameController {
  async all({ request, response }) {
    const laboratories_exames = await LaboratoryExameRepository.findAll()
    if (laboratories_exames.length === 0) {
      return response.status(404).json({ msg: 'records not found' })
    }

    return response.json(laboratories_exames)
  }

  async store({ request, response }) {

    const rules = {
      id_laboratory: 'required|number',
      id_exam: 'required|number',
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return response.status(401).json(validation.messages())
    }

    const { id_exam, id_laboratory } = request.only([["id_exam"], ["id_laboratory"]])

    const examIsActive = await ExameRepository.validatesIfItIsActive(id_exam)
    if (!examIsActive) { return response.status(401).json({ msg: 'exam is not active' }) }

    const laboratoryIsActive = await LaboratoryRepository.validatesIfItIsActive(id_laboratory)
    if (!laboratoryIsActive) { return response.status(401).json({ msg: 'laboratory is not active' }) }

    const data = await LaboratoryExameRepository.store({ fk_exam: id_exam, fk_laboratory: id_laboratory })
    return response.json(data)
  }

  async remove({ request, response, params }) {
    const rules = {
      id: 'required'
    }

    const validation = await validate(params, rules)
    if (validation.fails()) {
      return response.status(401).json(validation.messages())
    }
    const { id } = params
    const record = await LaboratoryExameRepository.findByID(id)
    if (!record) {
      return response.status(404).json({ msg: 'record not found' })
    }

    await LaboratoryExameRepository.destroy(id)
    return response.status(200).json({ msg: 'record has been deleted' })
  }

  async unique({ request, response, params }) {
    const rules = {
      id: 'required|number'
    }

    const validation = await validate(params, rules)
    if (validation.fails()) {
      return response.status(401).json(validation.messages())
    }
    const { id } = params
    const record = await LaboratoryExameRepository.findByID(id)
    if (!record) {
      return response.status(404).json({ msg: 'record not found' })
    }

    return response.json(record)
  }
}

module.exports = LaboratoryExameController
