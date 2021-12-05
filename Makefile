# Install the dependencies.
deps:
	npm install --no-optional
	npm audit fix

# Run the development server.
dev:
	npm run dev	