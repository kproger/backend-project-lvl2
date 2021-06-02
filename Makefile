lint:
	npx eslint .

install:
	npm install
	
publish:
	npm publish --dry-run

test: 
	npx jest 

test-coverage:
	npm test -- --coverage --coverageProvider=v8