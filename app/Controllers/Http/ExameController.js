'use strict'
const { validate } = use('Validator')
const ExameRepository = use('App/Repositories/ExameRepository')

class ExameController {
  async all({ request, response }) {
    const exames = await ExameRepository.findAll()
    if (exames.length === 0) {
      return response.status(404).json({ msg: 'exames not found' })
    }

    return response.json(exames)
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
    const exame = await ExameRepository.findByID(id)
    if (!exame) {
      return response.status(404).json({ msg: 'exame not found' })
    }

    return response.json(exame)
  }
  async store({ request, response }) {

    const rules = {
      name: 'required|unique:exams,name',
      type: 'required',
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return response.status(401).json(validation.messages())
    }

    const { name, status = null, type = null } = request.all()

    if (status !== null && (status !== 'ativo' || status !== 'inativo')) {
      return response.status(401).json({ msg: 'Invalid value for status' })
    }

    if (type !== null && !['analise', 'clinica', 'imagem'].includes(type)) {
      return response.status(401).json({ msg: 'Invalid value for type' })
    }

    const statusFormated = status === null ? 'ativo' : status
    const data = await ExameRepository.store({ name, status: statusFormated, type })
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
    const exame = await ExameRepository.findByID(id)
    if (!exame) {
      return response.status(404).json({ msg: 'exame not found' })
    }

    const { name = null, status = null, type = null } = request.only([["name"], ["status"], ["type"]])

    if (status !== null && (status !== 'ativo' && status !== 'inativo')) {
      return response.status(401).json({ msg: 'Invalid value for status' })
    }

    if (type !== null && !['analise', 'clinica', 'imagem'].includes(type)) {
      return response.status(401).json({ msg: 'Invalid value for type' })
    }
    const exameUpdated = await ExameRepository.update({ exame, data: { id, name, type, status } })
    return response.json(exameUpdated)
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
    const exame = await ExameRepository.findByID(id)
    if (!exame) {
      return response.status(404).json({ msg: 'exame not found' })
    }

    await ExameRepository.destroy(id)
    return response.status(200).json({ msg: 'exame has been deleted' })
  }
}

module.exports = ExameController
