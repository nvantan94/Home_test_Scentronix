# Home Test of Scentronix - an API for retrieving reachable endpoints

## Introduction

This project will create an API with details as follows:
* /v1/reachable-endpoints: to retrieve all reachable endpoints (status code: 200 - 299 and do not timeout in 5 seconds).

Query param: priority (optional) - only return reachable endpoints with the given priority
- This field must be a positive value to pass API validation
- If the field is skipped, server will return all reachable endpoints. The returned endpoints are sorted in ascending order of their priority.

Examples:
* http://localhost:3000/v1/reachable-endpoints
* http://localhost:3000/v1/reachable-endpoints?priority=3

## Requirements
* npm
* nvm
* node `20`

## Installation

```bash
$ nvm use
$ npm install
```

## Testing

```bash
$ npm run test
```

## Building

```bash
$ npm run build
```

## Running on local - server will be running on localhost port 3000

```bash
$ npm run start
```

## Running on development environment

```bash
$ npm run dev
```
