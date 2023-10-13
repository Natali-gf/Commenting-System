## "Commenting system"

+ create a form for adding comments.
+ The form should have a 1000 character limit and it is preferable to enter text only.
+ If the character limit is exceeded, the system should prohibit the user from entering. Add error handling logic when the allowed number of characters is exceeded.
+ Add comments from other users.
+ Use localStorage in your browser to store these comments.
+ Implement the functionality of writing comments in response to existing ones.
+ The maximum number of nesting levels is two, that is, you can add an answer to a comment, but you cannot add a reply to an answer.
+ Pay attention to email layout - all elements of the system must be configured correctly on screens of different resolutions.
+ add functional changes to the comment rating - it can be turned on and decreased in increments of one.
+ The rating can be negative, negative and zero (default).
+ Implement the ability to add comments to favorites.
+ Add comments sorted by different parameters: date added, number of ratings, number of answers.
+ Please note that it should be possible to change the sort order for each parameter - descending or oldest.
+ Add functionality to display only selected comments.

+ + CODE REQUIREMENTS

+ The project was completed using TypeScript.
+ OOP is used in ES6 classes.
+ The uniformity of code formatting is maintained: correct indentations between semantic blocks, a uniform format for indentations from the left edge (two or four spaces - at your choice), and so on.
+ All variables, classes and functions have meaningful names.
+ The project follows the principles of DRY (Don't repeat yourself) and KISS (Keep it short and simple).
+ All comments are stored in localStorage.
+ To limit avatars, third-party services are used, for example Picsum.
