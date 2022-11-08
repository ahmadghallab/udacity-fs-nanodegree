import express, { Request, Response } from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import routes from './routes'
import errorHandler from './middlewares/error-handlers'
import NotFoundError from './errors/not-found-error'
import cookieSession from 'cookie-session'
import cors from 'cors';

const app = express()
const port = process.env.PORT

app.set("trust proxy", true);

app.use(json());
app.use(cors())
app.use(cookieSession({
  name: 'session',
  signed: false,
  secure: false,
  keys: ['abc123'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to store front API')
})

app.use('/api', routes)

app.all('*', () => {
    throw new NotFoundError()
})

app.use(errorHandler)

app.listen(port, () => console.log(`Listening on port ${port}!`))

export default app
