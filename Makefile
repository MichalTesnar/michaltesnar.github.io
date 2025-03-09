## Just for convenience

# Open a localhost to view the project
serve:
	python3 -m http.server 8001

# View the project in browser
view:
	open http://localhost:8001/

# Publish
publish:
	git add --a && git commit -m "Blog $(shell date +'%Y-%m-%d')" && git push

# Clean up the servers
clean:
	kill -9 $(lsof -t -i :8001)

# One step command to view the website
check:
	make serve & make view

# Phony targets
.PHONY: serve view publish clean check