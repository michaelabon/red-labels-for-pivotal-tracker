zip:
	zip -0 build/red-labels-for-pivotal-tracker.zip -r . -x@exclude.lst

clean:
	rm build/red-labels-for-pivotal-tracker.zip

.PHONY: clean
