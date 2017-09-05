export SHELL := /bin/bash
export PATH  := $(CURDIR)/node_modules/.bin:$(PATH)

all: node_modules build serve

node_modules:
	@npm install

build:
	@rollup index.js \
		--output.format es \
		--output.file dist.js

watch:
	@rollup index.js \
		--watch \
		--output.format es \
		--output.file dist.js

serve:
	@serve .
