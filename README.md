# Logger
Logger is a lightweight pure Javascript library, it helps for Get the all console logs into browser screen window without opening console/developer mode

### Version
v1.0.1

### Installation
You need Gulp installed globally:
```sh
$ npm i -g gulp
```
```sh
$ git clone https://github.com/ksankumar/logger.js
```
```html
<script type="text/javascript" src="lib/logger.js"></script>
```

### [Example](https://github.com/ksankumar/index.html)

![Screenshot](/screenshot.png)

# Logger.js API

## init
```js
logger.init({'bgColor':'tomato', 'direction':'top_right'});
```
 * options
    * directions - positions for logger window (top_left/top_right/bottom_left/bottom_right)
    * bgColor - background color

Initializing the logger screen window.

## On
```js
logger.on();
```
Show the logger screen window if is turned off.

## Off
```js
logger.off();
```
Hide the displaying logger screen window.

## kill
```js
logger.kill();
```
Destroy the logger screen window if it's created.

## Position
```js
logger.position({'direction':'bottom_right'});
```
Change the logger screen window position.

## log
```js
logger.log('foo');
```
For general output of logging information. You may use string substitution and additional arguments with this method.

## warn

```js
logger.warn("foo");
```
Outputs a warning message. You may use string substitution and additional arguments with this method

## error
```js
logger.error('Opps.. Error');
```
Outputs an error message. You may use string substitution and additional arguments with this method.

## dir
```js
logger.dir(object);
```
Displays an interactive listing of the properties of a specified JavaScript object. This listing lets you use disclosure triangles to examine the contents of child objects.

## dirxml
```js
logger.dirxml(object);
```
Displays an XML/HTML Element representation of the specified object if possible or the JavaScript Object view if it is not

## group
```js
logger.group(object);
```
Creates a new inline group, indenting all following output by another level. To move back out a level, call groupEnd().

## groupCollapsed
```js
logger.groupCollapsed(object);
```
Creates a new inline group, indenting all following output by another level; unlike group(), this starts with the inline group collapsed, requiring the use of a disclosure button to expand it. To move back out a level, call groupEnd().

## groupEnd
```js
logger.groupEnd();
```
Exits the current inline group.

## profile
```js
logger.profile(label);
```
Starts the browser's build-in profiler (for example, the Firefox performance tool). You can specify an optional name for the profile.

## profileEnd
```js
 logger.profileEnd();
```
Stops the profiler. You can see the resulting profile in the browser's performance tool


## table
```js
logger.table(object);
```
Displays tabular data as a table.

## time
```js
logger.time(label);
```
Starts a timer with a name specified as an input parameter. Up to 10,000 simultaneous timers can run on a given page.


## timeEnd
```js
logger.timeEnd(label);
```
Stops the specified timer and logs the elapsed time in seconds since its start.

## timeStamp
```js
logger.timeStamp(label);
```
Adds a marker to the browser's Timeline or Waterfall tool.


## trace
```js
logger.trace(object);
```
Outputs a stack trace.

## assert
```js
logger.assert(expression, object);
```
Log a message and stack trace to console if first argument is false.

## count
```js
logger.count(label);
```
Log the number of times this line has been called with the given label.


## debug
```js
logger.debug(object);
```
Writes a message to the console, including a hyperlink to the line where it was called.

## exception
```js
logger.exception(object);
```
Prints an error message together with an interactive stack trace of JavaScript execution at the point where the exception occurred.object

## clear
```js
logger.clear();
```
Clears the console.
## About

And of course ksankumar itself is open source with a [public repository][ksankumar]
 on GitHub.

## Reference
[Firefox Console API](https://getfirebug.com/wiki/index.php/Console_API)

[Chrome Console API](https://developer.chrome.com/devtools/docs/console-api)

License
----
MIT

**Free Software, Santhosh Kumar Krishnan!**
