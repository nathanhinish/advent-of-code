#!/usr/bin/env bash

source .env.local

url="https://adventofcode.com/2021/day/$1/input"
cookie_header="Cookie: session=$AOC_SESSION_COOKIE"

mkdir -p 2021/$1

wget --header="$cookie_header" -O 2021/$1/input "$url" || echo "Fill with input data" > 2021/$1/input
touch 2021/$1/sample
cp scripts/templates/code.js 2021/$1/01.js
cp scripts/templates/code.js 2021/$1/02.js
cp scripts/templates/parse.js 2021/$1/parse.js
cp scripts/templates/run.js 2021/$1/run.js