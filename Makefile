export SHELL := /bin/bash
export PATH  := $(CURDIR)/node_modules/.bin:$(PATH)

all: node_modules build

node_modules:
	@npm install

build:
	@rollup --config
watch:
	@rollup --config
