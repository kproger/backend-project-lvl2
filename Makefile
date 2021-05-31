lint:
	npx eslint .

publish:
	npm publish --dry-run

test: 
	npx jest --coverageProvider=v8

test-coverage:
	npm test -- --coverage --coverageProvider=v8