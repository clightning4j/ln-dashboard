default: fmt

dep:
	npm install

fmt:
	npx prettier --write .

clean:
	@rm -rf node_modules

check:
	npm run test

build:
	npm run build