# OCTO Oganization Analysis

How many type of programing languages in your oganization are using?

## Requisite

```bash
npm i foreman -g
```

## Configuration

create `.env` file in project root

```env
AUTHENTICATION_TYPE=token
TOKEN=x08f6906cbca28de25a62bd887b3b737c4f5e69a
OGANIZATION=[YOUR-ORGANIZATION]
REPO_TYPE=private
```

and then fill out yours

## Run

```bash
npm install
nf run node .
node kindsOfLang.js
```

## License

MIT