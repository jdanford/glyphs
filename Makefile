OUTFILE = index.js

.PHONY: all build clean serve

all: build

build: $(OUTFILE)

$(OUTFILE): tsconfig.json $(shell find src -type f)
	tsc --outFile $(OUTFILE)

clean:
	rm -f $(OUTFILE)

serve: build $(OUTFILE)
	@hs
