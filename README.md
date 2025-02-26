
# Chamber

A web-based cryptocurrency wallet. It supports both the generation of new wallets and the entry of existing recovery phrases. It displays private keys, public keys and balance. Currently supporting 2 blockchains Solana and Ethereum.

## Installation

- Ensure you have Node.js, npm and typescript installed on your machine.

- Clone the repository and add to your local environment.

- Install the required dependencies.

```bash
  cd chamber
  npm install
```
## Environment Variables

Create a [Alchemy](https://www.alchemy.com/) account and get your rpc ready because to run this project, you will need to add the following environment variables to your .env file inside all the servers folder.

`VITE_SOL_URL=`
`VITE_ETH_URL=`


## Deployment

To deploy this project locally run:
```bash
  npm run dev
```

To deploy this project globally run:
```bash
  npm run build
```
And upload the dist folder over hosting server.
## Optimization Plans

- Implementing devnet functionalities
- Adding more blockchains support
- Transaction feature
- UI improvement
- Establishing own backend 



