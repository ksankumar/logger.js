/**
 * Copyright (c) 2016 Santhosh Kumar, Krishnan
 * @license The MIT License (MIT)
 * @description Get all console logs into screen without opening console/developer mode.
 * @author Santhosh Kumar Krishnan, https://www.linkedin.com/in/ksankumar
 * @version v1.0.1
 **/
(function(wc) {
    'use strict';
    var version = 'v1.0.1',
        logEle, el, color,
        container,
        myNav = navigator.userAgent.toLowerCase(),
        config = {
            warn: '#FFA500;',
            error: '#FF0000;',
            info: '#FFFF00;',
            log: '#7FFF00;',
            def: '#00FFFF;',
            sLog: 'log info warn error'.split(' '),
            top_left: {
                'top': 0,
                'left': 0,
                'right': '',
                'bottom': ''
            },
            top_right: {
                'top': 0,
                'left': '',
                'right': 0,
                'bottom': ''
            },
            bottom_left: {
                'top': '',
                'left': 0,
                'right': '',
                'bottom': 0
            },
            bottom_right: {
                'top': '',
                'left': '',
                'right': 0,
                'bottom': 0
            },
            mainCon_css: 'background:#000;position:fixed;min-width:200px;max-height:50vh;font-family:Helvetica,Arial,sans-serif;font-size:10px;border:2px solid tomato;font-weight:bold;padding:5px;text-align:left;'
        },
        defOptions = {
            direction: 'top_left',
            bgColor: '#000000;',
            css: 'opacity:0.8; eeoverflow:auto;'
        },
        /**
         * @return {function} Creating instance
         **/
        DOM = {},
        Logger = function() {},
        d = wc.log,
        fn = d,
        log = function(a, l) {
            if (!wc) return; /* return or call your custom function here */
            fn = (l === undefined) ? d : (_console[l] || d);
            DOM.paintLog(l, a[0]);
            fn.apply(wc, a);
        },
        _console = {
            log: wc.log,
            debug: wc.debug,
            info: wc.info,
            warn: wc.warn,
            error: wc.error,
            assert: wc.assert,
            clear: wc.clear,
            dir: wc.dir,
            dirxml: wc.dirxml,
            trace: wc.trace,
            group: wc.group,
            groupCollapsed: wc.groupCollapsed,
            groupEnd: wc.groupEnd,
            time: wc.time,
            timeEnd: wc.timeEnd,
            timeStamp: wc.timeStamp,
            profile: wc.profile,
            profileEnd: wc.profileEnd,
            count: wc.count,
            exception: wc.exception,
            table: wc.table
        };
    /**
     * @return {boolean} Is browser is IE or not
     **/
    function isIE() {
        return myNav.indexOf('msie') !== -1 ? parseInt(myNav.split('msie')[1], 10) : false;
    }
    /**
     * @return {boolean} Is object or not
     **/
    function isObject(a) {
        return (a instanceof Object || typeof a === 'object');
    }
    /**
     * @return {object} Merging two objects
     **/
    function extend(obj, src) {
        if (!isIE()) {
            /*this is too fast compare to other, but this is not working in IE8 and less*/
            Object.keys(src).forEach(function(key) {
                obj[key] = src[key];
            });
        } else {
            /*this is slow compare to above, this is for IE*/
            for (var key in src) {
                if (src.hasOwnProperty(key)) obj[key] = src[key];
            }
        }
        return obj;
    }
    /**
     * Destroy the screen console
     **/
    function destroy() {
        if (logger.loggerInitialized) {
            logger.loggerInitialized = !1;
            container.remove();
            container = '';
        } else {
            throw 'You need to call `logger.init()` for show logger screen.';
        }
    }
    DOM = {
        /**
         * Creata a screen console container
         * @param {object} options
         * @return {object} screen console container
         **/
        createContainer: function(options) {

            var butt, mainCon = this.createElement(config.mainCon_css);

            butt = this.createButton('Clear', function() {
                logEle.innerHTML = '';
            });
            mainCon.appendChild(butt);

            butt = this.createButton('Close', destroy);
            butt.style.cssText = 'float:right;';
            mainCon.appendChild(butt);

            logEle = this.createElement(options.css);
            mainCon.appendChild(logEle);
            return mainCon;
        },
        /**
         * Creates a DOM element
         * @param {String} scc
         * @return {Object} DOM element
         **/
        createElement: function(css) {
            var element = document.createElement('div');
            element.style.cssText = css;
            return element;
        },
        /**
         * creates a button for clean/destroy button
         * @param {string} button name
         * @param {function} button event
         * @return {object} button DOM element
         **/
        createButton: function(name, event) {
            var element = document.createElement('button');
            element.innerHTML = name;
            element.addEventListener("click", event);
            return element;
        },
        /**
         * Print the console log into the browser screen
         * @param {string} console name
         * @param {string} console message
         **/
        paintLog: function(l, msg) {
            msg = config.sLog.indexOf(l) > -1 ? msg : 'Please, see the browser console';
            color = config[l] ? config[l] : config.def;
            el = this.createElement('color:' + color + 'line-height:18px;background:' + (logEle.children.length % 2 ? 'rgba(255,255,255,0.1)' : ''));
            el.textContent = msg;
            logEle.appendChild(el);
        },
        /**
         * Set the screen console positon - top_left, top_right, bottom_left, bottom_right
         * @param {object} positions 
         **/
        setPosition: function(styles) {
            if (container) {
                styles = config[styles];
                for (var property in styles)
                    container.style[property] = styles[property];
            } else {
                throw 'You need to call `logger.init()` for show logger screen.';
            }
        }
    };

    Logger = Logger.prototype = {
        /**
         * @return {String} Logger version
         **/
        version: version,
        /**
         * initializing the logger screen window
         * @param {Object} options for logger 
         **/
        init: function(options) {
            if (this.loggerInitialized) return;
            this.loggerInitialized = !0;
            defOptions = isObject(options) ? extend(defOptions, options) : defOptions;
            container = DOM.createContainer(defOptions);
            DOM.setPosition(defOptions.direction);
            document.body.appendChild(container);
        },
        /**
         * show the logger screen window if turned off
         **/
        on: function() {
            if (container) {
                container.style.display = 'block';
            } else {
                throw 'You need to call `logger.init()` for show logger screen.';
            }
        },
        /**
         * hide the displaying logger screen window
         **/
        off: function() {
            if (this.loggerInitialized) container.style.display = 'none';
        },
        /**
         * kill the the logger screen window
         **/
        kill: destroy,
        /**
         * set positon the logger screen window
         * @param {Object} options for logger pisition
         **/
        position: function(a) {
            if (a && a.direction !== undefined) {
                DOM.setPosition(a.direction);
            }
        },
        /**
         * Clears the console.
         **/
        clear: function() {
            log(arguments, 'clear');
        },
        /**
         * Writes a message to the console with the visual "info" icon and color coding and a hyperlink to the line where it was called.
         **/
        info: function() {
            log(arguments, 'info');
        },
        /**
         * Writes a message to the console. You may pass as many arguments as you'd like, and they will be joined together in a space-delimited line.
         **/
        log: function() {
            log(arguments, 'log');
        },
        /**
         * Tests that an expression is true. If not, it will write a message to the console and throw an exception.
         **/
        assert: function() {
            log(arguments, 'assert');
        },
        /**
         * Writes the number of times that the line of code where count was called was executed.
         **/
        count: function() {
            log(arguments, 'count');
        },
        /**
         * Writes a message to the console, including a hyperlink to the line where it was called.
         **/
        debug: function() {
            log(arguments, 'debug');
        },
        /**
         * Prints an interactive listing of all properties of the object. This looks identical to the view that you would see in the DOM Panel.
         **/
        dir: function() {
            log(arguments, 'dir');
        },
        /**
         * Prints the XML source tree of an HTML or XML element. This looks identical to the view that you would see in the HTML Panel. You can click on any node to inspect it in the HTML Panel.
         **/
        dirxml: function() {
            log(arguments, 'dirxml');
        },
        /**
         * Writes a message to the console with the visual "error" icon and color coding and a hyperlink to the line where it was called.
         **/
        error: function() {
            log(arguments, 'error');
        },
        /**
         * Writes a message to the console and opens a nested block to indent all future messages sent to the console. Call console.groupEnd() to close the block.
         **/
        group: function() {
            log(arguments, 'group');
        },
        /**
         * Like console.group(), but the block is initially collapsed.
         **/
        groupCollapsed: function() {
            log(arguments, 'groupCollapsed');
        },
        /**
         * Closes the most recently opened block created by a call to console.group() or console.groupCollapsed()
         **/
        groupEnd: function() {
            log(arguments, 'groupEnd');
        },
        /**
         * Turns on the JavaScript profiler.
         **/
        profile: function() {
            log(arguments, 'profile');
        },
        /**
         * Turns off the JavaScript profiler and prints its report.
         **/
        profileEnd: function() {
            log(arguments, 'profileEnd');
        },
        /**
         * Creates a new timer under the given name. Call console.timeEnd() with the same name to stop the timer and print the time elapsed.
         **/
        time: function() {
            log(arguments, 'time');
        },
        /**
         * Stops a timer created by a call to console.time(name) and writes the time elapsed.
         **/
        timeEnd: function() {
            log(arguments, 'timeEnd');
        },
        /**
         * Creates a time stamp, which can be used together with HTTP traffic timing to measure when a certain piece of code was executed.
         **/
        timeStamp: function() {
            log(arguments, 'timeStamp');
        },
        /**
         * Prints an interactive stack trace of JavaScript execution at the point where it is called.
         **/
        trace: function() {
            log(arguments, 'trace');
        },
        /**
         * Writes a message to the console with the visual "warning" icon and color coding and a hyperlink to the line where it was called.
         **/
        warn: function() {
            log(arguments, 'warn');
        },
        /**
         * Prints an error message together with an interactive stack trace of JavaScript execution at the point where the exception occurred.
         **/
        exception: function() {
            log(arguments, 'exception');
        },
        /**
         * Allows to log provided data using tabular layout.
         **/
        table: function() {
            log(arguments, 'table');
        }
    };
    /**
     * initializing the logger screen window
     **/
    Logger.init();
    /* AMD/RequireJS */
    if (typeof define !== 'undefined' && define.amd) {
        define([], function() {
            return Logger;
        });
    }
    /* CommonJS */
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = Logger;
    } else { /*Plain javascript library*/
        window.logger = window.Logger = Logger;
    }

})(window.console);