import fs from 'fs'
import path from 'path'
import { parsep } from '../src'

const exampleDir = path.join(__dirname, '../example')
const pir = fs.readFileSync(
  path.join(exampleDir, 'nested-projection.pir'),
  'utf8',
)
const pipeline = parsep(pir)
console.dir(pipeline, { depth: null })
