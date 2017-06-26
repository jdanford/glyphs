.PHONY: all build clean serve

all: build

build: index.js

index.js: tsconfig.json $(shell find src -type f)
	tsc

clean:
	rm -rf dist

serve: build index.js
	hs
