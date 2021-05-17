'use strict'
const { validate } = use('Validator')
const LaboratoryRepository = use('App/Repositories/LaboratoryRepository')

class LaboratoryController {

  async all({ request, response }) {
    const laboratories = await LaboratoryRepository.findAll()
    if (laboratories.length === 0) {
      return response.status(404).json({ msg: 'laboratories not found' })
    }

    return response.json(laboratories)
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
    const laboratory = await LaboratoryRepository.findByID(id)
    if (!laboratory) {
      return response.status(404).json({ msg: 'laboratory not found' })
    }

    return response.json(laboratory)
  }
  async store({ request, response }) {

    const rules = {
      address: 'required',
      name: 'required|unique:laboratories,name',
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return response.status(401).json(validation.messages())
    }

    const { name, address, status = null } = request.all()

    if (status !== null && (status !== 'ativo' || status !== 'inativo')) {
      return response.status(401).json({ msg: 'Invalid value for status' })
    }

    const statusFormated = status === null ? 'ativo' : status
    const data = await LaboratoryRepository.store({ name, address, status: statusFormated })
    return response.json(data)
  }
  async update({ request, response, params }) {
    const rules = {
      id: 'required'
    }

    const validation = await validate(params, rules)
    if (validation.fails()) {
      return response.status(401).json(validation.messages())
    }
    const { id } = params
    const laboratory = await LaboratoryRepository.findByID(id)
    if (!laboratory) {
      return response.status(404).json({ msg: 'laboratory not found' })
    }

    const { name = null, address = null, status = null } = request.only([["name"], ["address"], ["status"]])

    if (status !== null && (status !== 'ativo' && status !== 'inativo')) {
      return response.status(401).json({ msg: 'Invalid value for status' })
    }
    const laboratoryUpdated = await LaboratoryRepository.update({ laboratory, data: { id, name, address, status } })
    return response.json(laboratoryUpdated)
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
    const laboratory = await LaboratoryRepository.findByID(id)
    if (!laboratory) {
      return response.status(404).json({ msg: 'laboratory not found' })
    }

    await LaboratoryRepository.destroy(id)
    return response.status(200).json({ msg: 'laboratory has been deleted' })
  }
}

module.exports = LaboratoryController
