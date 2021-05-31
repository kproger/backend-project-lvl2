lint:
	npx eslint .

publish:
	npm publish --dry-run

test: 
	npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8