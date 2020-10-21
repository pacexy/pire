import fs from 'fs'
import path from 'path'
import { parsep } from '../src/parser'

const exampleDir = path.join(__dirname, '../example')
const pir = fs.readFileSync(path.join(exampleDir, 'request.pir'), 'utf8')
const pipeline = parsep(pir)
console.dir(pipeline)
