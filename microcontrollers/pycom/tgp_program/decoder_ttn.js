function Decoder(bytes, port) {
  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.

  // first two bytes are for EC. No need of signed, and range of sensor is
  // var ec = (bytes[0] << 8) | bytes[1];

  // third and fourth bytes are for pH. range 0-
  // var ph = (bytes[2] << 8) | bytes[3];

  // fith and sixth bytes are for DO. range 0-
  // var do = (bytes[4] << 8) | bytes[5];

  // seventh and eigth bytes are for Temperature. range 0-
  // var temp = (bytes[6] << 8) | bytes[7];

  // seventh and eigth bytes are for DO. range 0-
  var temp = (bytes[0] << 8) | bytes[1];

  return {
  //  ec: ec,
  //  ph: ph,
  //  do: do,
    temp: temp,
  //  turb: turb
  }
}
