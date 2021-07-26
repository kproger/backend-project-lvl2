lint:
	npx eslint .

install:
	npm install
	
publish:
	npm publish --dry-run

test: 
	npx -n --experimental-vm-modules jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8