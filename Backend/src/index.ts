import express, { Request, Response } from 'express'

const app = express()

const port = 8001

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!')
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});