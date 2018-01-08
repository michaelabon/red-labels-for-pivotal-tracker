## v1.3.1: Red Details, again

### Fixes

- The new, rectangular look of the story details broke my styling. This release catches up to Tracker's new styling.

## v1.3.0: Red Details

### Enhancements

- Your story details now sport Red Labels! That's right! The inspiration for the style
  now the same red that you know and love. It even gets darker when you hover over it.
  
## v1.2.2: Mutation Observers

### Fixes

- Bulk removing now works correctly (#3)
- Once again, blocked label in detail view is highlighted and can be interacted with (#6)

## v1.2.1

### Fixes

- Embarrassing use of an interval to automatically color the label nodes.

## v1.2.0 Prevent Wrapping; More Matching

Two visible changes with this release!

1. Prevent wrapping

    Long labels with whitespace like `needs production environment` would have ugly wrapping that broke the pillbox effect.

    ![2015-08-07_0133](https://cloud.githubusercontent.com/assets/567950/9129348/7cfba4a2-3ca4-11e5-9d7f-7b0e0ef56015.png)

    Now, through some styling and DOM hackery, they do not wrap internally, but do wrap between labels.

    ![2015-08-07_0132](https://cloud.githubusercontent.com/assets/567950/9129354/8e2f62fe-3ca4-11e5-8d68-76e1804e6231.png)

2. More matching

    This is a regression fix. I had not really intended for the `blocked` and `needs` matching to be anchored to the start of the label. Now your `▩▩blocked▩▩` labels will be bright and red.

As always, thanks for checking this out. I appreciate all your feedback.

## v1.1.0 Pillbox Previews

After user research, it was not enough to simply change the `color` of the label from green to red. It did not stand out enough from the green and purple. I want to try it with pillboxes, just like the detail view, and see what the response is.

As an aside, I specifically chose that particular red (taken from Pivotal Tracker's own color scheme for thematic purposes) with subchromaticity in mind.

## v1.0.1 Initial Release

All labels in Pivotal Tracker that match "blocked" or "needs <something>" will be turned from green to red.
