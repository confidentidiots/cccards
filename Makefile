.PHONY: run dist cards

dist:
	mkdir -p docs
	touch docs/_config.yml
	npm run dist

run:
	npm run start

cards:
	@echo "downloading latest cards"
	@./node_modules/.bin/gsjson 1-cC5eLPYp1zdSwhTeJWk78t6MtWMWEoRU9V1NwZGedw cards.json
	@echo "downloaded latest cards"
	@cp cards.json dist/
