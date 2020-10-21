interface Query {
  [fieldName: string]: Query | undefined
}

export function parsep(str: string) {
  const len = str.length
  let i = 0

  return parsePipeline()

  function parsePipeline() {
    const pipeline = []
    while (i !== len) {
      skipWhiteSpace()
      const pipe = parsePipe()
      pipeline.push(pipe)
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
    const query = parseQuery()
    skipWhiteSpace()

    if (i === len) {
      return {
        inputFieldPath,
        collectionPath,
        query,
      }
    }
    eatArrow()
    skipWhiteSpace()
    const outputFieldPath = parseFieldPath()

    return {
      inputFieldPath,
      collectionPath,
      query,
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

  function parseQuery() {
    let query: Query | undefined = undefined
    if (str[i] === '{') {
      i++
      query = {}
      skipWhiteSpace()
      while (str[i] !== '}') {
        const fieldName = parseWord()
        skipWhiteSpace()
        query[fieldName] = parseQuery()
      }
      i++
    }
    return query
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
