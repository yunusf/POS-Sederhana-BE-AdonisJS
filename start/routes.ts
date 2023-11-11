/* eslint-disable prettier/prettier */
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// TODO: list Route
/*
  code => Route.resource('nama argumen/link').apiOnly() 
  terminal => node ace list:routes
*/
Route.group(() => {
  Route.resource('kategori', 'KategorisController')
  Route.resource('users', 'UsersController')
  Route.resource('profiles', 'ProfilesController')
  Route.resource('products', 'ProductsController')
  Route.resource('transaction', 'TransactionsController')
  Route.resource('transactionDetail', 'TransactionDetailsController')
})
