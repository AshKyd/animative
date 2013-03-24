An animation library designed to let you create short, semantic
presentations within HTML pages akin to interactive GIF images.

Have you ever wanted to add a GIF to your post to illustrate a point,
but wanted to include text or annotations? Animative is probably what
you're looking for.

This isn't a jQuery plugin, it runs on page load and unobtrusively
converts all animative elements into slideshows. You can use data
parameters to specify additional options, and CSS to style your
elements. There's no code involved.

Animative is best utilised if you're at least a little familiar with
CSS.

Usage
=====
1. Include the Javascript on your page (or activate the Wordpress plugin).
2. Create a HTML list with class="animative" and add any number of items.
3. Specify a width and height on your list with style="width:300px;height:300px;" for example.
4. Load your page and see the results.

Animative is best used with a combination of graphics and text, although
you could use either or both.

Options
=======
You can use the following options on either the .animative element, or
on the child li elements.

To apply an option, specify it as a data- attribute. For example:

    <ul class="animative" data-animation="slide">

interval
--------
The interval between slidse in milliseconds.

Default:

    2000

transition-duration
-------------------
The duration of the transition.

Default:

    100

animation
---------
The type of animation to perform between frames.

Options are:
* fade (default)
* slide (slides down over the previous slide.
* none (No transition, a clean cut over)

Default:

    fade
