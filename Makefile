.PHONY: all build typescript clean serve

all: build

build: typescript

typescript: tsconfig.json $(shell find src -type f)
	tsc

clean:
	rm -rf dist

serve: build dist/index.js
	hs
