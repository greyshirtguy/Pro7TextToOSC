# Pro7TextToOSC
A simple node app to provide live updates of current Pro7 slide text as a custom OSC message to a textbox in Resolume Avenue/Arena....

Needs later versions of Node that include built-in fetch support (I think versions 17.5 and above? - Just use latest version of Node!)

Currently parameters are hardcoded - update to suit your Pro7 and Resolume machine and also update the OSC message to suit your desired textbox in Resolume Avenue/Arena.
Make sure Resolume Avenue/Arena has OSC enabled.

Run `npm install` to install required packages (for now, just node-osc) and then `node index.js` to run
