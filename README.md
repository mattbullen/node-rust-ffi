## Rust FFI via a Node.js websocket

In progress - another sample app for learning the [Rust](https://www.rust-lang.org/) language. It's a basic Node.js websocket-based server that runs Rust code through an FFI/foreign function interface wrapper.

Right now, it just takes a string and sends it to the server via a websocket. The server runs the string through wrappered Rust code, then returns a JSON object to the browser with details about the request and the character count of the string (based on [this](http://jakegoulding.com/rust-ffi-omnibus/string_arguments/) example).

This example runs on Linux - I also wrote a Windows-compatible version, in the "windows" folder, that runs on localhost:5000.

##### Try it out: https://sunny-shore-7262.herokuapp.com/
