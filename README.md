# Pro7TextToOSC
A simple node app to provide live updates of current Pro7 slide text as a custom OSC message to a textbox in Resolume Avenue/Arena....

Needs later versions of Node that includes built-in fetch support (I think versions 17.5 and above? - Just use latest version of Node!)
It connects to Pro7 via the Pro7 API (available in Pro 7.9 and later when networking is enabled) to recieve updates of the current slide text whenever the active slide changes and sends that text in a custom OSC message which can update a textbox in Resolume Avenue/Arena.

While the app is running, the result will be a live update of a textbox in Resolume with the current slide text in Pro7.

Currently parameters are hardcoded - update to suit your Pro7 and Resolume machine and also update the OSC message to suit your desired textbox in Resolume Avenue/Arena.

Make sure Resolume Avenue/Arena has OSC enabled.

Run `npm install` to install required packages (for now, just node-osc) and then `node index.js` to run
