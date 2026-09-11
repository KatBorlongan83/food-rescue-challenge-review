SHELL := /bin/zsh

NODE ?= node

SEED ?= 20260908
DIFFICULTY ?= silver

WORKSPACE := workspace

.PHONY: dev test clean

dev:
	@nohup env SEED="$(SEED)" DIFFICULTY="$(DIFFICULTY)" \
		"$(NODE)" mock.js --generate > /dev/null 2>&1 & disown; \
		echo "Scenario generation started!"

test:
	@nohup "$(NODE)" mock.js > /dev/null 2>&1 & disown; \
		echo "Tests running!"

clean:
	rm -f "$(WORKSPACE)/scenario.json"
	rm -f "$(WORKSPACE)/generation.log"