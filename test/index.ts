import fs from 'fs'
import path from 'path'
import { parsePire } from '../src/parser'

const exampleDir = path.join(__dirname, '../example')
const pir = fs.readFileSync(path.join(exampleDir, 'request.pir'), 'utf8')
const pipeline = parsePire(pir)
console.dir(pipeline)
