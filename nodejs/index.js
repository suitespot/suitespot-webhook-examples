const http = require('http')
const { createHmac } = require('crypto')

const PORT = process.env.PORT || 5000

const server = http.createServer(async (req, res) => {
  if (req.url === '/api/webhook' && req.method === 'POST') {
    const signatureHeader = req.headers['x-sst-signature'] ?? ''
    const { timestamp, v0 } = parseSignatureHeader(signatureHeader)

    // Read body as string
    const body = await bodyAsString(req)
    console.log('body', body)

    // Verify signature
    const secret = Buffer.from(process.env.SECRET, 'base64')
    const hmac = createHmac('sha256', secret, { })
    hmac.update(`${timestamp}.${body}`)
    const signature = hmac.digest('base64')

    const isValid = signature === v0

    res.writeHead(200, { 'Content-Type': 'application/json' })
    const result = {
      timestamp,
      v0,
      body,
      signature,
      signatureHeader,
      isValid
    }
    res.write(JSON.stringify(result))
    res.end()
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route not found' }))
  }
})

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`)
})

function bodyAsString (req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => resolve(body))
    req.on('error', (err) => reject(err))
  })
}

function parseSignatureHeader (signatureHeaderRaw) {
  const signatureHeader = Array.isArray(signatureHeaderRaw) ? signatureHeaderRaw[0] : signatureHeaderRaw
  console.log('signatureHeader', signatureHeader)
  const [timestampPart, v0Part, v1Part] = signatureHeader.split(',')
  console.log('timestampPart', timestampPart)
  console.log('v0Part', v0Part)
  console.log('v1Part', v1Part)
  const entriesOf = (str) => str?.split('=') ?? [null, null]
  const [, timestamp] = entriesOf(timestampPart)
  const [, v0] = entriesOf(v0Part)
  const [, v1] = entriesOf(v1Part)
  const result = { timestamp, v0, v1 }
  console.log('parseSignatureHeader', result)
  return result
}
