function Decoder(bytes, port) {
  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.

  // first two bytes are for Temperature. No need of signed, and range of sensor is

  var temp = (bytes[0] << 8) | bytes[1];

  // third and fourth bytes are for Electrical Conductivity. range 0-
  var ec = (bytes[2] << 8) | bytes[3];

  // fith and sixth bytes are for pH. range 0-
  var ph = (bytes[4] << 8) | bytes[5];

  return {
    temp: temp,
    ec: ec,
    ph: ph
  }
}
