// Setup typegoose
import { setGlobalOptions, Severity } from '@typegoose/typegoose'
setGlobalOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
import 'module-alias/register'
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
import { app } from '@/app'
import { runMongo } from '@/models/index'

runMongo().then(() => {
  console.log('Mongo connected successfully')
})

app.listen(1337).on('listening', () => {
  console.log('Fondu backend is listening on 1337')
})
