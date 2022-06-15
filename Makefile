default: fmt

dep:
	npm install

fmt:
	npx prettier --write .

clean:
	@echo "Nothing to clean"

check:
	@echo "Nothing to check"

build:
	npm run build