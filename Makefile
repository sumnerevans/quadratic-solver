#
# Makefile
#

all: build

builds:
	mkdir -p builds

build: | builds
	cp index.html script.js styles.css builds/

clean:
	rm -rf builds
