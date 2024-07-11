# Condor Discussions Indexer

This tool is used to query the discussion posts of the [Condor Info](https://github.com/casper-network/condor-info) repository. It can provide the maintainer's post as well as index the comments and denote which is marked as an answer.

## Install

```bash
git clone https://github.com/casper-network/condor-discussions-indexer
cd condor-discussions-indexer
npm install
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

First, create a file _usernames.txt_ in the project root:

```bash
touch usernames.txt
```

and populate it with one user to track per line:

_Example:_

```
dylanireland
sczembor
melpadden
```

The output will only consist of the users listed in the _usernames.txt_ file.

Get a discussion post by providing the discussion number:

```bash
npm run get-discussion 19
```

The script will create a CSV file named _discussions\_`{DISCUSSION_NUMBER}`.csv_ containing each comment as a row of data.
