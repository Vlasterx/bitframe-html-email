# Bitersen HTML Email Builder
Intention of this program is to make HTML email templating easier. It is based on [Zurb Panini](https://foundation.zurb.com/sites/docs/panini.html) static site builder and various NPM scripts. In combination, they are able to process your styles and HTML and output inlined HTML that you can use wherever you need to. 

![Inlining styles](/images/inline.png)

## Guidelines for creating HTML emails

Making HTML emails is like designing a web site in 2001. Follow this simple rules and you will be making great HTML emails from scratch.

* All styles in finished HTML must be **inlined**
* All images must use **absolute paths** and **must be hosted on live server**, since images sent as attachments may not be showed in all email clients and online services
* Encoded images may not be shown
* Animated GIF may not work in some older email clients, so use with care
* All images must have ALT attributes
* Use old-school **table design** for outlining your design

## Installation
For this program to work, you will need to install [NodeJS](http://nodejs.org/) and then run the following command in your terminal:

    npm install gulp
    npm install
    
If everything is in order, you can create HTML mails.

# Usage
This program uses [Zurb Panini static site builder](https://foundation.zurb.com/sites/docs/panini.html) to compose HTML e-mails. I suggest that you study their documentation in order to learn the basics. It really is simple to learn because you will only need the basics for the creation of HTML emails.

Templates are located in `./src` folder.  

By running the `gulp` command in your terminal, you will start the build process. That process will create `./public` folder where you will find your regular and inlined templates. Regular templates are for your reference only.

You will notice that rendered templates are missing some of the regular HTML tags like `doctype`, `html`, `head` and `body` since you will probably not use them in your e-mails.


## Author
Vladimir Jovanović
