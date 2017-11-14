#
# Makefile
#

all: build

build:
	cp index.html script.js styles.css builds/

deploy: build
	scp -r builds/* sumnerevans@sumnerevans.com:sumnerevans.com/quadratic-solver

clean:
	rm -rf builds
