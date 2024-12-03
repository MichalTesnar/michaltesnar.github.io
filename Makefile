## Just for convenience

# Open a localhost to view the project
serve:
	python3 -m http.server 8000

# View the project in browser
view:
	open http://localhost:8000/

# Publish
publish:
	git add --a && git commit -m "Blog $(shell date +'%Y-%m-%d')" && git push

# Clean up the servers
clean:
	kill -9 $(lsof -t -i :8000)

# Phony targets
.PHONY: serve view publish clean