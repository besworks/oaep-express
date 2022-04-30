# OAEP Express

This API will generate a RSA-OAEP Public/Private keypair in a format that can be *sourced* into shell script. It is intended as a workaround for the fact that OpenSSL lacks support for generating RSA-OAEP keys and the NodeJS runtime is not always available.

## Usage

On your NodeJS enabled server :

```
git clone https://github.com/besworks/oaep-express.git
cd oaep-express
npm install
export PORT=9999
npm start
```

The service is now running with [`forever`](https://www.npmjs.com/package/forever). You can see details about the process with `npm run inspect`. View the logs with `npm run watch` and stop the service with `npm stop`.

Making an HTTP GET Requst to the service will return a plain text response like the following example:

```
OAEP_PUBLIC="-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA013j7hGf6QYPMEU1JJYOLS3L5NOFVA/KVBia
pHcSMjBJoo7yv3EHElu8+98mUvYCnLNzp8IPz8ccvIp741k/Im7fd3sqLnZatErkMlX/4NwVX7KbwSpi
ZLQZ1zbaeN67Gn42+pC0mTf4v29QMvuzdzhCqWiKToQdnGfl8MFUsN+3MVK7thaaSkyjyVAIrwibOGs1
O2fo4Z6s2R1mbqfkrVC6ArpKGVOBkwTy3Yi7LtCyrq7mzj1GstD0BosTd66qSCUObPax2PDdhJBCaB7T
IFtdD/S1nDAOVLtznsX/N/Lg1+0WR43mIWQ07NYGWVINOGdGcYAtJjJwhsTWS+4aRQIDAQAB
-----END PUBLIC KEY-----"

OAEP_PRIVATE="-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDTXePuEZ/pBg8wRTUklg4tLcvk04VU
D8pUGJqkdxIyMEmijvK/cQcSW7z73yZS9gKcs3Onwg/Pxxy8invjWT8ibt93eyoudlq0SuQyVf/g3BVf
spvBKmJktBnXNtp43rsafjb6kLSZN/i/b1Ay+7N3OEKpaIpOhB2cZ+XwwVSw37cxUru2FppKTKPJUAiv
CJs4azU7Z+jhnqzZHWZup+StULoCukoZU4GTBPLdiLsu0LKurubOPUay0PQGixN3rqpIJQ5s9rHY8N2E
kEJoHtMgW10P9LWcMA5Uu3Oexf838uDX7RZHjeYhZDTs1gZZUg04Z0ZxgC0mMnCGxNZL7hpFAgMBAAEC
ggEBAIUo+ZfacqwTrS3z6+8IuhWsbG/U8oJrEES623IRsdz8nudSt4v0YUgnk3/6reJGKo8eXxapI9z6
zBfcBwDMEQJYZ2CWr5Rl6+7535n2pCW9gZmwpH+lfCeFb2IupKTRbX7bVTe2QpDkukmgjx4PhJjvUM/5
lGiywxTuP+bVZc2nfgF9zaygB1rD20/jHfM9xubLDLZDPll+qZTcq2BDsfl3hnkZBsLDHJa9JLhE2xjq
kjRFAxj8v1EtXbj1CtiID5klTOdZCOgZckB/0pi4errdWrM86gUEhSkfgmeuK3VWmZSx+GT2YlfkIvj+
1wt9LBK+yR+GBJZnhQ9kRqR7QgECgYEA9KgIKnunlol/tUKOS6OavymXyMNi+a29SlgLSaAj19+RO540
kHOXqMDeK2BCZQCAzPMyUSVo6YGup6jAtc9oPu03kymNeYBuki72Ii8zMGNJvy01Ralga5DB8xPeivBz
WVqaWBsspw0OPqqXHbPZzjW7eH4T5a6OzV3dGqnAFdECgYEA3Sq5iK54BIeJ+tqxx57GoqOfRPoT/CtR
UbdyPcMQNq+hPIQsC1HYBn5ck6ukwm2R8u8UE1DVzPW6+4YzGnXpBDk3jPFUyDyEtdHLaW7FH16f5IQ1
EAE0dvsanWqb8HaCQ5zMiSeTcuAdDL8iYw02bQrWfQ8oAA++2QkAmJv3tjUCgYEAyubQXutOgbpm/5zD
BlgY7pFAIHBqlUdRxWZfdiApmc8AU8FRNrum+314w+CBL+LK7y6CfGnaKE402zdJG393pTh27sV3X1z0
Vqg72P3sJiUx9Cs6Exv1qz/SmhXQasof3+sUNh3TWnepaK9xxGB0MmC9qaBmQAYUyJ0f0g0WEQECgYAH
18AEjMtMvdGyx5aOUZ8RnWPEemnDA3Y6w5qVfhlRFyFMmBNHw3s5n7mAsxGAo4oNZ1T66l7qibw7tyKQ
yaWdtLm3kcdD4oGCQRJJhtgOqLhaziVjj+dgYL8s3d7xxAISi7jlFDYyWKgvD4gUox9O9pdsj+EHP4ex
ApS21LEQEQKBgBIB3M98qNLTRwN02OoMF1fA8Sx3PH7BDgXakpS5up+mawyIs4B9hrJe5KFtGd3SLRY0
EhDo0V2xpRsUd2XTbLfD5hUBMwSFjS0BgHwWlXNivCsGkT1bPvuwO2tb4ToQWOLiDbeZTBB1vhr1+0NE
1B9qOgaR1UUuQc0LlsX5mQiz
-----END PRIVATE KEY-----"
```

To use this in a shell script :

```
export HOST="your.host.name"
export PORT=9999
source <(wget -nv -qO- http://${HOST}:${PORT})
echo "$OAEP_PUBLIC"
echo "$OAEP_PRIVATE"
```

Or use process substitution to read as a virtual file :

```
cat <(echo "$OAEP_PUBLIC")
```
