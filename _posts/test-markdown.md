---
layout: post
title: Sample blog post
subtitle: Each post also has a subtitle
gh-repo: daattali/beautiful-jekyll
gh-badge: [star, fork, follow]
tags: [test]
comments: true
js: https://polyfill.io/v3/polyfill.min.js?features=es6
js: https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js
---

This is a demo post to show you how to write blog posts with markdown.  I strongly encourage you to [take 5 minutes to learn how to write in markdown](https://markdowntutorial.com/) - it'll teach you how to transform regular text into bold/italics/headings/tables/etc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultrices ligula id pulvinar vestibulum. Sed egestas blandit tellus sed lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac hendrerit sem. Vestibulum vel aliquam mauris, sit amet ultrices metus. Donec condimentum libero vel ipsum laoreet tincidunt. Donec et eros neque. Suspendisse dignissim, lectus quis dignissim fringilla, sapien erat venenatis mi, eu cursus diam nulla vehicula lectus. Morbi condimentum mauris vel lectus rhoncus, sed euismod dui blandit. Maecenas at orci eu lectus scelerisque sollicitudin vitae ut ipsum. Sed mattis, justo sed luctus scelerisque, ex lorem porttitor risus, id consequat diam dolor a justo. Maecenas porta tristique ante. Vestibulum pellentesque nisi at dignissim ornare. Ut sollicitudin nisl risus, at convallis justo pulvinar quis. 

Este es un párrafo en el que voy a agregar una ecuación, como puede ser por ejemplo $$\mathbf{F} = m\mathbf{a}$$ o también, puede ser la ecuación de Schrödinger unidimensional, $$i \hbar \frac{\partial}{\partial t} \psi = -\frac{i \hbar}{2m} \frac{\partial^2}{\partial x^2} \psi + V \psi$$ o $$a = \frac{a}{b}$$ \(\frac{i \hbar}{2m} \nabla^2 \Psi \).

**Here is some bold text**

## Here is a secondary heading

Here's a useless table:

| Number | Next number | Previous number |
| :------ |:--- | :--- |
| Five | Six | Four |
| Ten | Eleven | Nine |
| Seven | Eight | Six |
| Two | Three | One |


How about a yummy crepe?

![Crepe](https://s3-media3.fl.yelpcdn.com/bphoto/cQ1Yoa75m2yUFFbY2xwuqw/348s.jpg)

It can also be centered!

![Crepe](https://s3-media3.fl.yelpcdn.com/bphoto/cQ1Yoa75m2yUFFbY2xwuqw/348s.jpg){: .mx-auto.d-block :}

Here's a code chunk:

~~~
var foo = function(x) {
  return(x + 5);
}
foo(3)
~~~

And here is the same code with syntax highlighting:

```javascript
var foo = function(x) {
  return(x + 5);
}
foo(3)
```

And here is the same code yet again but with line numbers:

{% highlight javascript linenos %}
var foo = function(x) {
  return(x + 5);
}
foo(3)
{% endhighlight %}

## Boxes
You can add notification, warning and error boxes like this:

### Notification

{: .box-note}
**Note:** This is a notification box.

### Warning

{: .box-warning}
**Warning:** This is a warning box.

### Error

{: .box-error}
**Error:** This is an error box.
