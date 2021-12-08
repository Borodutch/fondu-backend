const request = require('supertest')
import { app } from '@/app'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { runMongo, stopMongo } from '@/models/index'
import { Server } from 'http'
import { dropMongo, startKoa, stopServer } from './testUtils'

describe('Public endpoint', () => {
  let server: Server

  const data = {
    name: 'Semions',
    symbol: 'SIS',
    receiver: '0x4bC410a84574f6f67c4a406C68e5eED2d4633c11',
    privateKey:
      '674291ef97447b8e5d0a90539c9dd3ca1346ee8c78934971d0868a4a20173fac',
    baseUri: 'https://test-uri/',
    mintable: false,
    burnable: false,
    autoIncrementIds: false,
    pausable: false,
    enumerable: false,
    uriStorage: false,

    ownable: true,
    roles: false,
  }

  beforeAll(async () => {
    const mongoServer = new MongoMemoryServer()
    await runMongo(await mongoServer.getUri())
    server = await startKoa(app)
  })

  beforeEach(async () => {
    await dropMongo()
  })

  afterAll(async () => {
    await stopMongo()
    await stopServer(server)
  })

  it('should return contract with baseUri', async () => {
    const response = await request(server)
      .post('/erc721')
      .set('Content-Type', 'application/json')
      .set('Accept-Encoding', 'gzip, deflate, br')
      .set('Connection', 'keep-alive')
      .send(data)

    expect(response).toBe('Hello world')
  })
})
