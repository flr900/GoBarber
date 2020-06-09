import 'reflect-metadata'

// eslint-disable-next-line no-unused-vars
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import routes from './routes'
import uploadConfig from '@config/upload'

import '@shared/infra/typeorm'
import '@shared/container'
import AppError from '@shared/errors/appError'

const app = express()

app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use((err:Error, request:Request, response:Response, next:NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ statsu: 'error', message: err.message })
  }
  console.error(err)
  return response.status(500).json({ status: 'error', message: 'Internal server error' })
})

app.listen(3333, () => {
  console.log('✔✔✔')
})
