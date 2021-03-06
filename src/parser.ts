import { Projection } from './type'

const VOID = 'void'

export function parsep(str: string) {
  const len = str.length
  let initial = true
  let i = 0

  return parsePipeline()

  function parsePipeline() {
    const pipeline = []
    while (i !== len) {
      skipWhiteSpace()
      const pipe = parsePipe()
      pipeline.push(pipe)
      initial = false
    }
    return pipeline
  }

  function parsePipe() {
    const inputFieldPath = parseFieldPath()
    skipWhiteSpace()
    eatArrow()
    skipWhiteSpace()
    const collectionPath = parseCollectionPath()
    skipWhiteSpace()
    const projection = parseProjection()

    if (i === len) {
      return {
        inputFieldPath,
        collectionPath,
        projection,
      }
    }
    eatArrow()
    skipWhiteSpace()
    const outputFieldPath = parseFieldPath()

    const hasInput = !(initial && inputFieldPath[0] === VOID)
    return {
      ...(hasInput && {
        inputFieldPath,
      }),
      collectionPath,
      projection,
      outputFieldPath,
    }
  }

  function parseWord() {
    let word = ''
    while (/[a-z]/i.test(str[i])) {
      word += str[i]
      i++
    }
    return word
  }

  function parseFieldPath() {
    const fieldPath = []
    fieldPath.push(parseWord())
    while (str[i] === '.') {
      i++
      fieldPath.push(parseWord())
    }
    return fieldPath
  }

  function parseProjection() {
    let projection: Projection | 1 = 1
    if (str[i] === '{') {
      i++
      projection = {}
      skipWhiteSpace()
      while (str[i] !== '}') {
        const fieldName = parseWord()
        skipWhiteSpace()
        projection[fieldName] = parseProjection()
      }
      i++
    }
    // should skip white space for recursive call
    skipWhiteSpace()
    return projection
  }

  function parseCollectionPath() {
    const dbName = parseWord()
    eatDot()
    const collectionName = parseWord()
    return [dbName, collectionName]
  }

  function eatDot() {
    if (str[i] !== '.') throw new SyntaxError('Expected: .')
    i++
  }

  function eatArrow() {
    if (str.substr(i, 2) !== '->') throw new SyntaxError('Expected: ->')
    i += 2
  }

  function skipWhiteSpace() {
    const whitespaces = [' ', '\t', '\r', '\n']
    while (whitespaces.includes(str[i])) {
      i++
    }
  }
}
