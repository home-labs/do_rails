"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            // <br>|<br\/>
            // text: function () {
            // },

            addClass: function (classList) {
                var
                    self = this,
                    currentClassList,
                    asString;

                if (arguments.length > 1) {
                    classList = Array.prototype.slice.call(arguments);
                    asString = classList.join(" ");
                } else if (typeof classList === "string") {
                    asString = classList;
                }

                self.each(function (node) {
                    currentClassList = $(node).attr("class");
                    $(node).attr("class", currentClassList + " " + asString);
                });

                return self;
            },

            removeClass: function (classList) {
                var
                    self = this,
                    currentClassList,
                    pattern,
                    removed;

                if (arguments.length > 1) {
                    classList = Array.prototype.slice.call(arguments);
                    pattern = new RegExp("(" + classList
                        .join(")|(")  + ")", "g");
                } else {
                    pattern = new RegExp("(" + classList.split(" ")
                        .join(")|(") + ")", "g");
                }

                self.each(function (node) {
                    currentClassList = $(node).attr("class");
                    removed = currentClassList.replace(pattern, "");
                    $(node).attr("class", removed.replace(/  /g, " ").trim());
                });

                return self;
            },

            find: function (query) {
                var
                    self = this;

                return $(query, self.first());
            },

            check: function () {
                var
                    self = this;

                if (!self.checked()) {
                    self.property("checked", true);
                }

                return self;
            },

            uncheck: function () {
                var
                    self = this;

                return self.property("checked", false);
            },

            removeAttr: function (attrName) {
                var
                    self = this;

                self.each(function (node) {
                    node.removeAttribute(attrName);
                });

                return self;
            },

            attr: function (attrName, value) {
                var
                    self = this,
                    first = self.first();

                if (self.length === 0) {
                    return self;
                }

                if (typeof value === "boolean" || value || value === "") {
                    self.each(function (node) {
                        node.setAttribute(attrName, value);
                    });

                    return self;
                } else {
                    if (first.attributes[attrName]) {
                        return first.attributes[attrName].value;
                    }
                }

                return undefined;
            },

            property: function (propertyName, value) {
                var
                    self = this,
                    first = self.first();

                if (self.length === 0) {
                    return self;
                }

                if (typeof value === "boolean" || value || value === "") {
                    self.each(function (node) {
                        node[propertyName] = value;
                    });

                    return self;
                } else {
                    if (first[propertyName] ||
                        typeof first[propertyName] === "boolean") {
                        return first[propertyName];
                    }
                }

                return undefined;
            },

            firstNode: function () {
                var
                    self = this,
                    nodes = self.first().childNodes;

                return $(nodes[0]);
            },

            firstElement: function () {
                var
                    self = this,
                    elements = self.first().children;

                return $(elements[0]);
            },

            rootText: function () {
                var
                    self = this,
                    text = "";

                Enumerator.each(self.first().childNodes, function (v) {
                    if (v.nodeType === Node.TEXT_NODE) {
                        text += v.textContent.trim();
                    }
                });

                return text;
            },

            append: function(node) {
                var
                    self = this;

                if (typeof node === "string") {
                    node = document.createTextNode(node);
                } else if (node instanceof $) {
                    node = node.first();
                } else if (!node instanceof Node) {
                    throw new Error("An invalid or illegal node was specified.");
                }

                self.each(function (element) {
                    element.appendChild(node);
                });

                return self;
            },

            prepend: function(node) {
                var
                    self = this,
                    firstNode;

                if (typeof node === "string") {
                    node = document.createTextNode(node);
                } else if (node instanceof $) {
                    node = node.first();
                } else if (!node instanceof Node) {
                    throw new Error("An invalid or illegal node was specified.");
                }

                self.each(function (element) {
                    firstNode = $(element).firstNode();
                    $(node).insertBefore(firstNode);
                });

                return self;
            },

            insertBefore: function(node) {
                var
                    self = this;

                if (typeof node === "string") {
                    node = $(node).first();
                } else if (node instanceof $) {
                    node = node.first();
                } else if (!node instanceof Node) {
                    throw new Error("An invalid or illegal node was specified.");
                }

                node.parentNode.insertBefore(self.first(), node);

                return self;
            },

            insertAfter: function(node) {
                var
                    self = this;

                if (typeof node === "string") {
                    node = $(node).first();
                } else if (node instanceof $) {
                    node = node.first();
                } else if (!node instanceof Node) {
                    throw new Error("An invalid or illegal node was specified.");
                }

                node.parentNode.insertBefore(self.first(), node.nextSibling);

                return self;
            },

            parent: function (query) {
                var
                    self = this;

                if (query) {
                    return $(self.first().closest(query));
                } else {
                    return $(self.first().parentNode);
                }

                return $();
            },

            html: function (content) {
                var
                    self = this;

                if (typeof content === "string") {
                    self.each(function (node) {
                        node.innerHTML = content;
                    });
                } else if (content instanceof Node) {
                    self.each(function (node) {
                        node.innerHTML = null;
                        node.appendChild(content);
                    });
                }

                return self;
            },

            first: function () {
                return this[0];
            },

            count: function () {
                return Object.keys(this).length;
            }

        }

    });

}(esPhinx));

/*$.prototype.ancestors = function (nodeName) {
        var _parents = []
            ,parent = null
        ;
        collection.forEach(function (e) {
            parent = e.parentNode;
            if (nodeName) {
                if (parent.nodeName.toLowerCase() === nodeName) {
                    _parents.push(parent);
                } else {
                    while(true) {
                        parent = parent.parentNode;
                        if(parent){
                            if(parent.nodeName.toLowerCase() === nodeName) {
                                _parents.push(parent);
                                break;
                            }
                        } else {
                            break;
                        }
                    }
                }
            } else {
                if(parent){
                    _parents.push(parent);
                }
            }
        });
        return _parents;
    }*/