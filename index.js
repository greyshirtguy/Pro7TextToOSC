const { Client, Server } = require('node-osc')

// Update this IP and port to suit your Resolume machine (with OSC enabled)
const client = new Client('127.0.0.1', 7000)

// Pro7 API - update localhost:50001 to suit your Pro7 machine.
url = "http://localhost:50001/v1/status/updates"

function connectToStatusStream() {
fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: '["status/slide"]'
})
  .then(processChunkedResponse)
  .catch(onChunkedResponseError)
  
  function onChunkedResponseError(err) {
    console.error(err)
    setTimeout( function() { connectToStatusStream() }, 1000)
  }
  
  function processChunkedResponse(response) {
    depth = 1 // I was curious about keeping track of the # of recursive function calls....

    var reader = response.body.getReader()
    var decoder = new TextDecoder();
    
    return readChunk();
  
    function readChunk(depth) {
      return reader.read().then(appendChunks);
    }
  
    function appendChunks(result) {
      var chunk = decoder.decode(result.value || new Uint8Array, {stream: !result.done});
      
      // Some optional tracing of raw data sent by Pro7 each time a slide is triggered....
      //console.log('got chunk of', chunk.length, 'bytes')
      //console.log(chunk)

      slideJSONData = JSON.parse(chunk)

      console.log(slideJSONData.data.current.text)

      // Update this OSC path to suit your specific textblock in Resolume.....
      client.send('/composition/layers/3/clips/1/video/source/blocktextgenerator/text/params/lines', slideJSONData.data.current.text, (err) => {
        if (err) console.error(err);
      });

      if (result.done) {
        console.log('done')
        connectToStatusStream()
      } else {
        console.log('recursion depth: ' + depth)
        return readChunk(depth++)
      }
    }
  }
}
  
connectToStatusStream()


