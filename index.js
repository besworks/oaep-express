import express from 'express';
import { Crypto } from '@peculiar/webcrypto';

const crypto = new Crypto();
const app = express();

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

app.get('/', async (req, res) => {
  const keys = await crypto.subtle.generateKey({
    name: "RSA-OAEP", hash: "SHA-256",
    publicExponent: new Uint8Array([1, 0, 1]),
    modulusLength: 2048,
  }, true, [ 'encrypt', 'decrypt' ]);
  
  let priv = await crypto.subtle.exportKey('pkcs8', keys.privateKey);
  let pub = await crypto.subtle.exportKey('spki', keys.publicKey);
  
  priv = btoa(ab2str(priv)).replace(/(.{80})/g, '$1\n');
  pub = btoa(ab2str(pub)).replace(/(.{80})/g, '$1\n');
  
  priv = `-----BEGIN PRIVATE KEY-----\n${priv}\n-----END PRIVATE KEY-----`;
  pub = `-----BEGIN PUBLIC KEY-----\n${pub}\n-----END PUBLIC KEY-----`;
  
  let output = `OAEP_PUBLIC="${pub}"` + '\n\n' + `OAEP_PRIVATE="${priv}"`;

  res.set('content-type', 'text/plain')
  res.send(output);
});

app.listen(process.env.PORT || 0, function onListening() {
  console.log('OAEP Generator API Running on port', this.address().port);
});
