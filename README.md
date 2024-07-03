# Condor Discussions Indexer

This tool is used to query the discussion posts of the [Condor Info](https://github.com/casper-network/condor-info) repository. It can provide the maintainer's post as well as index the comments and denote which is marked as an answer.

## Install

```bash
git clone https://github.com/casper-network/condor-discussions-indexer
cd condor-discussions-indexer
npm install
```

Open the template _.env_ file:

```bash
nano .env
```

[Create a Personal Access Token through GitHub](https://github.com/settings/tokens/new), providing access only to `read:discussion`.

Create a new _.env_ file:

```bash
touch .env
```

Paste in your new Personal Access Token:

```bash
nano .env
```

_Example:_

```
GITHUB_PAT=ghp_sgaSFSjBzf7ltXqWj6Y87ljFRgrOyt0ziIYy
```

## Run

Get a discussion post by providing the discussion number:

```bash
npm run get-discussion 19
```

Output:

```
Original Question: {
  title: 'How to get AddressableEntity?',
  body: 'How to get the AddressableEntity of a wallet, smart contract in a transaction data?'
}
Comments: [
  {
    id: 'DC_kwDOMD2G484AlsVm',
    bodyText: 'AddressableEntity is the new way to refer to both accounts and contracts. Contracts are represented by entity-contract-<hash>, and accounts by either entity-account-<hash> or their public key in the transaction data. You can obtain the transaction data using this query:casper-client get-transaction <transaction_hash> -n <node_address>',
    author: { login: 'sczembor' },
    createdAt: '2024-06-26T09:58:14Z',
    isAnswer: false
  }
]
```

The comments, and whether or not they are labeled as the answer, are in `comments.nodes`.
