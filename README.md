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

In your script :

```
export HOST="your.fqdn"
export PORT=9999
source <(wget -nv -qO- http://${HOST}:${PORT})
echo "$OAEP_PUBLIC"
echo "$OAEP_PRIVATE"
```

Or use process substitution to read as a virtual file

```
cat <(echo "$OAEP_PUBLIC")
```