#!/usr/bin/env bash

mkdir -p 2021/$1

touch 2021/$1/input
touch 2021/$1/sample
cp scripts/templates/code.js 2021/$1/01.js
cp scripts/templates/code.js 2021/$1/02.js
cp scripts/templates/parse.js 2021/$1/parse.js