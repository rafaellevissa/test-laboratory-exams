'use strict'

const Route = use('Route')
const Env = use('Env')

Route.get('/', () => {
  return `<a href='/docs'> Acesse esse link para ser direcionado para a documentação</a>`
})

Route.get('/laboratories', 'LaboratoryController.all')
Route.post('/laboratory', 'LaboratoryController.store')
Route.put('/laboratory/:id', 'LaboratoryController.update')
Route.get('/laboratory/:id', 'LaboratoryController.unique')
Route.delete('/laboratory/:id', 'LaboratoryController.remove')

Route.get('/exames', 'ExameController.all')
Route.post('/exame', 'ExameController.store')
Route.put('/exame/:id', 'ExameController.update')
Route.get('/exame/:id', 'ExameController.unique')
Route.delete('/exame/:id', 'ExameController.remove')

Route.get('/laboratories-exames', 'LaboratoryExameController.all')
Route.post('/laboratory-exame', 'LaboratoryExameController.store')
Route.get('/laboratory-exame/:id', 'LaboratoryExameController.unique')
Route.delete('/laboratory-exame/:id', 'LaboratoryExameController.remove')

Route.group(() => {

  Route.post('laboratories', 'LaboratoryController.storeMany');

}).prefix('batch');
