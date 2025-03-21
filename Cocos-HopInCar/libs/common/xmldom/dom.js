"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */
function copy(src, dest) {
  for (var p in src) {
    dest[p] = src[p];
  }
}
/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */


function _extends(Class, Super) {
  var pt = Class.prototype;

  if (!(pt instanceof Super)) {
    var t = function t() {};

    ;
    t.prototype = Super.prototype;
    t = new t(); // copy(pt,t);

    for (var p in pt) {
      t[p] = pt[p];
    }

    Class.prototype = pt = t;
  }

  if (pt.constructor != Class) {
    if (typeof Class != 'function') {
      console.error("unknow Class:" + Class);
    }

    pt.constructor = Class;
  }
}

var htmlns = 'http://www.w3.org/1999/xhtml'; // Node Types

var NodeType = {};
var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
var TEXT_NODE = NodeType.TEXT_NODE = 3;
var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
var NOTATION_NODE = NodeType.NOTATION_NODE = 12; // ExceptionCode

var ExceptionCode = {};
var ExceptionMessage = {};
var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10); //level2

var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);

function DOMException(code, message) {
  if (message instanceof Error) {
    var error = message;
  } else {
    error = this;
    Error.call(this, ExceptionMessage[code]);
    this.message = ExceptionMessage[code];
    if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
  }

  error.code = code;
  if (message) this.message = this.message + ": " + message;
  return error;
}

;
DOMException.prototype = Error.prototype;
copy(ExceptionCode, DOMException);
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */

function NodeList() {}

;
NodeList.prototype = {
  /**
   * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
   * @standard level1
   */
  length: 0,

  /**
   * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
   * @standard level1
   * @param index  unsigned long 
   *   Index into the collection.
   * @return Node
   * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
   */
  item: function item(index) {
    return this[index] || null;
  },
  toString: function toString(isHTML, nodeFilter) {
    for (var buf = [], i = 0; i < this.length; i++) {
      serializeToString(this[i], buf, isHTML, nodeFilter);
    }

    return buf.join('');
  }
};

function LiveNodeList(node, refresh) {
  this._node = node;
  this._refresh = refresh;

  _updateLiveList(this);
}

function _updateLiveList(list) {
  var inc = list._node._inc || list._node.ownerDocument._inc;

  if (list._inc != inc) {
    var ls = list._refresh(list._node); //console.log(ls.length)


    __set__(list, 'length', ls.length); //copy(ls,list);


    for (var p in ls) {
      list[p] = ls[p];
    }

    list._inc = inc;
  }
}

LiveNodeList.prototype.item = function (i) {
  _updateLiveList(this);

  return this[i];
};

_extends(LiveNodeList, NodeList);
/**
 * 
 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities 
 */


function NamedNodeMap() {}

;

function _findNodeIndex(list, node) {
  var i = list.length;

  while (i--) {
    if (list[i] === node) {
      return i;
    }
  }
}

function _addNamedNode(el, list, newAttr, oldAttr) {
  if (oldAttr) {
    list[_findNodeIndex(list, oldAttr)] = newAttr;
  } else {
    list[list.length++] = newAttr;
  }

  if (el) {
    newAttr.ownerElement = el;
    var doc = el.ownerDocument;

    if (doc) {
      oldAttr && _onRemoveAttribute(doc, el, oldAttr);

      _onAddAttribute(doc, el, newAttr);
    }
  }
}

function _removeNamedNode(el, list, attr) {
  //console.log('remove attr:'+attr)
  var i = _findNodeIndex(list, attr);

  if (i >= 0) {
    var lastIndex = list.length - 1;

    while (i < lastIndex) {
      list[i] = list[++i];
    }

    list.length = lastIndex;

    if (el) {
      var doc = el.ownerDocument;

      if (doc) {
        _onRemoveAttribute(doc, el, attr);

        attr.ownerElement = null;
      }
    }
  } else {
    throw DOMException(NOT_FOUND_ERR, new Error(el.tagName + '@' + attr));
  }
}

NamedNodeMap.prototype = {
  length: 0,
  item: NodeList.prototype.item,
  getNamedItem: function getNamedItem(key) {
    //		if(key.indexOf(':')>0 || key == 'xmlns'){
    //			return null;
    //		}
    //console.log()
    var i = this.length;

    while (i--) {
      var attr = this[i]; //console.log(attr.nodeName,key)

      if (attr.nodeName == key) {
        return attr;
      }
    }
  },
  setNamedItem: function setNamedItem(attr) {
    var el = attr.ownerElement;

    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR);
    }

    var oldAttr = this.getNamedItem(attr.nodeName);

    _addNamedNode(this._ownerElement, this, attr, oldAttr);

    return oldAttr;
  },

  /* returns Node */
  setNamedItemNS: function setNamedItemNS(attr) {
    // raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
    var el = attr.ownerElement,
        oldAttr;

    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR);
    }

    oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);

    _addNamedNode(this._ownerElement, this, attr, oldAttr);

    return oldAttr;
  },

  /* returns Node */
  removeNamedItem: function removeNamedItem(key) {
    var attr = this.getNamedItem(key);

    _removeNamedNode(this._ownerElement, this, attr);

    return attr;
  },
  // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
  //for level2
  removeNamedItemNS: function removeNamedItemNS(namespaceURI, localName) {
    var attr = this.getNamedItemNS(namespaceURI, localName);

    _removeNamedNode(this._ownerElement, this, attr);

    return attr;
  },
  getNamedItemNS: function getNamedItemNS(namespaceURI, localName) {
    var i = this.length;

    while (i--) {
      var node = this[i];

      if (node.localName == localName && node.namespaceURI == namespaceURI) {
        return node;
      }
    }

    return null;
  }
};
/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */

function DOMImplementation(
/* Object */
features) {
  this._features = {};

  if (features) {
    for (var feature in features) {
      this._features = features[feature];
    }
  }
}

;
DOMImplementation.prototype = {
  hasFeature: function hasFeature(
  /* string */
  feature,
  /* string */
  version) {
    var versions = this._features[feature.toLowerCase()];

    if (versions && (!version || version in versions)) {
      return true;
    } else {
      return false;
    }
  },
  // Introduced in DOM Level 2:
  createDocument: function createDocument(namespaceURI, qualifiedName, doctype) {
    // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
    var doc = new Document();
    doc.implementation = this;
    doc.childNodes = new NodeList();
    doc.doctype = doctype;

    if (doctype) {
      doc.appendChild(doctype);
    }

    if (qualifiedName) {
      var root = doc.createElementNS(namespaceURI, qualifiedName);
      doc.appendChild(root);
    }

    return doc;
  },
  // Introduced in DOM Level 2:
  createDocumentType: function createDocumentType(qualifiedName, publicId, systemId) {
    // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
    var node = new DocumentType();
    node.name = qualifiedName;
    node.nodeName = qualifiedName;
    node.publicId = publicId;
    node.systemId = systemId; // Introduced in DOM Level 2:
    //readonly attribute DOMString        internalSubset;
    //TODO:..
    //  readonly attribute NamedNodeMap     entities;
    //  readonly attribute NamedNodeMap     notations;

    return node;
  }
};
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {}

;
Node.prototype = {
  firstChild: null,
  lastChild: null,
  previousSibling: null,
  nextSibling: null,
  attributes: null,
  parentNode: null,
  childNodes: null,
  ownerDocument: null,
  nodeValue: null,
  namespaceURI: null,
  prefix: null,
  localName: null,
  // Modified in DOM Level 2:
  insertBefore: function insertBefore(newChild, refChild) {
    //raises 
    return _insertBefore(this, newChild, refChild);
  },
  replaceChild: function replaceChild(newChild, oldChild) {
    //raises 
    this.insertBefore(newChild, oldChild);

    if (oldChild) {
      this.removeChild(oldChild);
    }
  },
  removeChild: function removeChild(oldChild) {
    return _removeChild(this, oldChild);
  },
  appendChild: function appendChild(newChild) {
    return this.insertBefore(newChild, null);
  },
  hasChildNodes: function hasChildNodes() {
    return this.firstChild != null;
  },
  cloneNode: function cloneNode(deep) {
    return _cloneNode(this.ownerDocument || this, this, deep);
  },
  // Modified in DOM Level 2:
  normalize: function normalize() {
    var child = this.firstChild;

    while (child) {
      var next = child.nextSibling;

      if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
        this.removeChild(next);
        child.appendData(next.data);
      } else {
        child.normalize();
        child = next;
      }
    }
  },
  // Introduced in DOM Level 2:
  isSupported: function isSupported(feature, version) {
    return this.ownerDocument.implementation.hasFeature(feature, version);
  },
  // Introduced in DOM Level 2:
  hasAttributes: function hasAttributes() {
    return this.attributes.length > 0;
  },
  lookupPrefix: function lookupPrefix(namespaceURI) {
    var el = this;

    while (el) {
      var map = el._nsMap; //console.dir(map)

      if (map) {
        for (var n in map) {
          if (map[n] == namespaceURI) {
            return n;
          }
        }
      }

      el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
    }

    return null;
  },
  // Introduced in DOM Level 3:
  lookupNamespaceURI: function lookupNamespaceURI(prefix) {
    var el = this;

    while (el) {
      var map = el._nsMap; //console.dir(map)

      if (map) {
        if (prefix in map) {
          return map[prefix];
        }
      }

      el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
    }

    return null;
  },
  // Introduced in DOM Level 3:
  isDefaultNamespace: function isDefaultNamespace(namespaceURI) {
    var prefix = this.lookupPrefix(namespaceURI);
    return prefix == null;
  }
};

function _xmlEncoder(c) {
  return c == '<' && '&lt;' || c == '>' && '&gt;' || c == '&' && '&amp;' || c == '"' && '&quot;' || '&#' + c.charCodeAt() + ';';
}

copy(NodeType, Node);
copy(NodeType, Node.prototype);
/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */

function _visitNode(node, callback) {
  if (callback(node)) {
    return true;
  }

  if (node = node.firstChild) {
    do {
      if (_visitNode(node, callback)) {
        return true;
      }
    } while (node = node.nextSibling);
  }
}

function Document() {}

function _onAddAttribute(doc, el, newAttr) {
  doc && doc._inc++;
  var ns = newAttr.namespaceURI;

  if (ns == 'http://www.w3.org/2000/xmlns/') {
    //update namespace
    el._nsMap[newAttr.prefix ? newAttr.localName : ''] = newAttr.value;
  }
}

function _onRemoveAttribute(doc, el, newAttr, remove) {
  doc && doc._inc++;
  var ns = newAttr.namespaceURI;

  if (ns == 'http://www.w3.org/2000/xmlns/') {
    //update namespace
    delete el._nsMap[newAttr.prefix ? newAttr.localName : ''];
  }
}

function _onUpdateChild(doc, el, newChild) {
  if (doc && doc._inc) {
    doc._inc++; //update childNodes

    var cs = el.childNodes;

    if (newChild) {
      cs[cs.length++] = newChild;
    } else {
      //console.log(1)
      var child = el.firstChild;
      var i = 0;

      while (child) {
        cs[i++] = child;
        child = child.nextSibling;
      }

      cs.length = i;
    }
  }
}
/**
 * attributes;
 * children;
 * 
 * writeable properties:
 * nodeValue,Attr:value,CharacterData:data
 * prefix
 */


function _removeChild(parentNode, child) {
  var previous = child.previousSibling;
  var next = child.nextSibling;

  if (previous) {
    previous.nextSibling = next;
  } else {
    parentNode.firstChild = next;
  }

  if (next) {
    next.previousSibling = previous;
  } else {
    parentNode.lastChild = previous;
  }

  _onUpdateChild(parentNode.ownerDocument, parentNode);

  return child;
}
/**
 * preformance key(refChild == null)
 */


function _insertBefore(parentNode, newChild, nextChild) {
  var cp = newChild.parentNode;

  if (cp) {
    cp.removeChild(newChild); //remove and update
  }

  if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
    var newFirst = newChild.firstChild;

    if (newFirst == null) {
      return newChild;
    }

    var newLast = newChild.lastChild;
  } else {
    newFirst = newLast = newChild;
  }

  var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;
  newFirst.previousSibling = pre;
  newLast.nextSibling = nextChild;

  if (pre) {
    pre.nextSibling = newFirst;
  } else {
    parentNode.firstChild = newFirst;
  }

  if (nextChild == null) {
    parentNode.lastChild = newLast;
  } else {
    nextChild.previousSibling = newLast;
  }

  do {
    newFirst.parentNode = parentNode;
  } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));

  _onUpdateChild(parentNode.ownerDocument || parentNode, parentNode); //console.log(parentNode.lastChild.nextSibling == null)


  if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
    newChild.firstChild = newChild.lastChild = null;
  }

  return newChild;
}

function _appendSingleChild(parentNode, newChild) {
  var cp = newChild.parentNode;

  if (cp) {
    var pre = parentNode.lastChild;
    cp.removeChild(newChild); //remove and update

    var pre = parentNode.lastChild;
  }

  var pre = parentNode.lastChild;
  newChild.parentNode = parentNode;
  newChild.previousSibling = pre;
  newChild.nextSibling = null;

  if (pre) {
    pre.nextSibling = newChild;
  } else {
    parentNode.firstChild = newChild;
  }

  parentNode.lastChild = newChild;

  _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);

  return newChild; //console.log("__aa",parentNode.lastChild.nextSibling == null)
}

Document.prototype = {
  //implementation : null,
  nodeName: '#document',
  nodeType: DOCUMENT_NODE,
  doctype: null,
  documentElement: null,
  _inc: 1,
  insertBefore: function insertBefore(newChild, refChild) {
    //raises 
    if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
      var child = newChild.firstChild;

      while (child) {
        var next = child.nextSibling;
        this.insertBefore(child, refChild);
        child = next;
      }

      return newChild;
    }

    if (this.documentElement == null && newChild.nodeType == ELEMENT_NODE) {
      this.documentElement = newChild;
    }

    return _insertBefore(this, newChild, refChild), newChild.ownerDocument = this, newChild;
  },
  removeChild: function removeChild(oldChild) {
    if (this.documentElement == oldChild) {
      this.documentElement = null;
    }

    return _removeChild(this, oldChild);
  },
  // Introduced in DOM Level 2:
  importNode: function importNode(importedNode, deep) {
    return _importNode(this, importedNode, deep);
  },
  // Introduced in DOM Level 2:
  getElementById: function getElementById(id) {
    var rtv = null;

    _visitNode(this.documentElement, function (node) {
      if (node.nodeType == ELEMENT_NODE) {
        if (node.getAttribute('id') == id) {
          rtv = node;
          return true;
        }
      }
    });

    return rtv;
  },
  //document factory method:
  createElement: function createElement(tagName) {
    var node = new Element();
    node.ownerDocument = this;
    node.nodeName = tagName;
    node.tagName = tagName;
    node.childNodes = new NodeList();
    var attrs = node.attributes = new NamedNodeMap();
    attrs._ownerElement = node;
    return node;
  },
  createDocumentFragment: function createDocumentFragment() {
    var node = new DocumentFragment();
    node.ownerDocument = this;
    node.childNodes = new NodeList();
    return node;
  },
  createTextNode: function createTextNode(data) {
    var node = new Text();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createComment: function createComment(data) {
    var node = new Comment();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createCDATASection: function createCDATASection(data) {
    var node = new CDATASection();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createProcessingInstruction: function createProcessingInstruction(target, data) {
    var node = new ProcessingInstruction();
    node.ownerDocument = this;
    node.tagName = node.target = target;
    node.nodeValue = node.data = data;
    return node;
  },
  createAttribute: function createAttribute(name) {
    var node = new Attr();
    node.ownerDocument = this;
    node.name = name;
    node.nodeName = name;
    node.localName = name;
    node.specified = true;
    return node;
  },
  createEntityReference: function createEntityReference(name) {
    var node = new EntityReference();
    node.ownerDocument = this;
    node.nodeName = name;
    return node;
  },
  // Introduced in DOM Level 2:
  createElementNS: function createElementNS(namespaceURI, qualifiedName) {
    var node = new Element();
    var pl = qualifiedName.split(':');
    var attrs = node.attributes = new NamedNodeMap();
    node.childNodes = new NodeList();
    node.ownerDocument = this;
    node.nodeName = qualifiedName;
    node.tagName = qualifiedName;
    node.namespaceURI = namespaceURI;

    if (pl.length == 2) {
      node.prefix = pl[0];
      node.localName = pl[1];
    } else {
      //el.prefix = null;
      node.localName = qualifiedName;
    }

    attrs._ownerElement = node;
    return node;
  },
  // Introduced in DOM Level 2:
  createAttributeNS: function createAttributeNS(namespaceURI, qualifiedName) {
    var node = new Attr();
    var pl = qualifiedName.split(':');
    node.ownerDocument = this;
    node.nodeName = qualifiedName;
    node.name = qualifiedName;
    node.namespaceURI = namespaceURI;
    node.specified = true;

    if (pl.length == 2) {
      node.prefix = pl[0];
      node.localName = pl[1];
    } else {
      //el.prefix = null;
      node.localName = qualifiedName;
    }

    return node;
  }
};

_extends(Document, Node);

function Element() {
  this._nsMap = {};
}

;
Element.prototype = {
  nodeType: ELEMENT_NODE,
  hasAttribute: function hasAttribute(name) {
    return this.getAttributeNode(name) != null;
  },
  getAttribute: function getAttribute(name) {
    var attr = this.getAttributeNode(name);
    return attr && attr.value || '';
  },
  getAttributeNode: function getAttributeNode(name) {
    return this.attributes.getNamedItem(name);
  },
  setAttribute: function setAttribute(name, value) {
    var attr = this.ownerDocument.createAttribute(name);
    attr.value = attr.nodeValue = "" + value;
    this.setAttributeNode(attr);
  },
  removeAttribute: function removeAttribute(name) {
    var attr = this.getAttributeNode(name);
    attr && this.removeAttributeNode(attr);
  },
  //four real opeartion method
  appendChild: function appendChild(newChild) {
    if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return this.insertBefore(newChild, null);
    } else {
      return _appendSingleChild(this, newChild);
    }
  },
  setAttributeNode: function setAttributeNode(newAttr) {
    return this.attributes.setNamedItem(newAttr);
  },
  setAttributeNodeNS: function setAttributeNodeNS(newAttr) {
    return this.attributes.setNamedItemNS(newAttr);
  },
  removeAttributeNode: function removeAttributeNode(oldAttr) {
    //console.log(this == oldAttr.ownerElement)
    return this.attributes.removeNamedItem(oldAttr.nodeName);
  },
  //get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS: function removeAttributeNS(namespaceURI, localName) {
    var old = this.getAttributeNodeNS(namespaceURI, localName);
    old && this.removeAttributeNode(old);
  },
  hasAttributeNS: function hasAttributeNS(namespaceURI, localName) {
    return this.getAttributeNodeNS(namespaceURI, localName) != null;
  },
  getAttributeNS: function getAttributeNS(namespaceURI, localName) {
    var attr = this.getAttributeNodeNS(namespaceURI, localName);
    return attr && attr.value || '';
  },
  setAttributeNS: function setAttributeNS(namespaceURI, qualifiedName, value) {
    var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
    attr.value = attr.nodeValue = "" + value;
    this.setAttributeNode(attr);
  },
  getAttributeNodeNS: function getAttributeNodeNS(namespaceURI, localName) {
    return this.attributes.getNamedItemNS(namespaceURI, localName);
  },
  getElementsByTagName: function getElementsByTagName(tagName) {
    return new LiveNodeList(this, function (base) {
      var ls = [];

      _visitNode(base, function (node) {
        if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)) {
          ls.push(node);
        }
      });

      return ls;
    });
  },
  getElementsByTagNameNS: function getElementsByTagNameNS(namespaceURI, localName) {
    return new LiveNodeList(this, function (base) {
      var ls = [];

      _visitNode(base, function (node) {
        if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)) {
          ls.push(node);
        }
      });

      return ls;
    });
  }
};
Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;

_extends(Element, Node);

function Attr() {}

;
Attr.prototype.nodeType = ATTRIBUTE_NODE;

_extends(Attr, Node);

function CharacterData() {}

;
CharacterData.prototype = {
  data: '',
  substringData: function substringData(offset, count) {
    return this.data.substring(offset, offset + count);
  },
  appendData: function appendData(text) {
    text = this.data + text;
    this.nodeValue = this.data = text;
    this.length = text.length;
  },
  insertData: function insertData(offset, text) {
    this.replaceData(offset, 0, text);
  },
  appendChild: function appendChild(newChild) {
    throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
  },
  deleteData: function deleteData(offset, count) {
    this.replaceData(offset, count, "");
  },
  replaceData: function replaceData(offset, count, text) {
    var start = this.data.substring(0, offset);
    var end = this.data.substring(offset + count);
    text = start + text + end;
    this.nodeValue = this.data = text;
    this.length = text.length;
  }
};

_extends(CharacterData, Node);

function Text() {}

;
Text.prototype = {
  nodeName: "#text",
  nodeType: TEXT_NODE,
  splitText: function splitText(offset) {
    var text = this.data;
    var newText = text.substring(offset);
    text = text.substring(0, offset);
    this.data = this.nodeValue = text;
    this.length = text.length;
    var newNode = this.ownerDocument.createTextNode(newText);

    if (this.parentNode) {
      this.parentNode.insertBefore(newNode, this.nextSibling);
    }

    return newNode;
  }
};

_extends(Text, CharacterData);

function Comment() {}

;
Comment.prototype = {
  nodeName: "#comment",
  nodeType: COMMENT_NODE
};

_extends(Comment, CharacterData);

function CDATASection() {}

;
CDATASection.prototype = {
  nodeName: "#cdata-section",
  nodeType: CDATA_SECTION_NODE
};

_extends(CDATASection, CharacterData);

function DocumentType() {}

;
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;

_extends(DocumentType, Node);

function Notation() {}

;
Notation.prototype.nodeType = NOTATION_NODE;

_extends(Notation, Node);

function Entity() {}

;
Entity.prototype.nodeType = ENTITY_NODE;

_extends(Entity, Node);

function EntityReference() {}

;
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;

_extends(EntityReference, Node);

function DocumentFragment() {}

;
DocumentFragment.prototype.nodeName = "#document-fragment";
DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;

_extends(DocumentFragment, Node);

function ProcessingInstruction() {}

ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;

_extends(ProcessingInstruction, Node);

function XMLSerializer() {}

XMLSerializer.prototype.serializeToString = function (node, isHtml, nodeFilter) {
  return nodeSerializeToString.call(node, isHtml, nodeFilter);
};

Node.prototype.toString = nodeSerializeToString;

function nodeSerializeToString(isHtml, nodeFilter) {
  var buf = [];
  var refNode = this.nodeType == 9 && this.documentElement || this;
  var prefix = refNode.prefix;
  var uri = refNode.namespaceURI;

  if (uri && prefix == null) {
    //console.log(prefix)
    var prefix = refNode.lookupPrefix(uri);

    if (prefix == null) {
      //isHTML = true;
      var visibleNamespaces = [{
        namespace: uri,
        prefix: null
      } //{namespace:uri,prefix:''}
      ];
    }
  }

  serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces); //console.log('###',this.nodeType,uri,prefix,buf.join(''))

  return buf.join('');
}

function needNamespaceDefine(node, isHTML, visibleNamespaces) {
  var prefix = node.prefix || '';
  var uri = node.namespaceURI;

  if (!prefix && !uri) {
    return false;
  }

  if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace" || uri == 'http://www.w3.org/2000/xmlns/') {
    return false;
  }

  var i = visibleNamespaces.length; //console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)

  while (i--) {
    var ns = visibleNamespaces[i]; // get namespace prefix
    //console.log(node.nodeType,node.tagName,ns.prefix,prefix)

    if (ns.prefix == prefix) {
      return ns.namespace != uri;
    }
  } //console.log(isHTML,uri,prefix=='')
  //if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
  //	return false;
  //}
  //node.flag = '11111'
  //console.error(3,true,node.flag,node.prefix,node.namespaceURI)


  return true;
}

function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
  if (nodeFilter) {
    node = nodeFilter(node);

    if (node) {
      if (typeof node == 'string') {
        buf.push(node);
        return;
      }
    } else {
      return;
    } //buf.sort.apply(attrs, attributeSorter);

  }

  switch (node.nodeType) {
    case ELEMENT_NODE:
      if (!visibleNamespaces) visibleNamespaces = [];
      var startVisibleNamespaces = visibleNamespaces.length;
      var attrs = node.attributes;
      var len = attrs.length;
      var child = node.firstChild;
      var nodeName = node.tagName;
      isHTML = htmlns === node.namespaceURI || isHTML;
      buf.push('<', nodeName);

      for (var i = 0; i < len; i++) {
        // add namespaces for attributes
        var attr = attrs.item(i);

        if (attr.prefix == 'xmlns') {
          visibleNamespaces.push({
            prefix: attr.localName,
            namespace: attr.value
          });
        } else if (attr.nodeName == 'xmlns') {
          visibleNamespaces.push({
            prefix: '',
            namespace: attr.value
          });
        }
      }

      for (var i = 0; i < len; i++) {
        var attr = attrs.item(i);

        if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
          var prefix = attr.prefix || '';
          var uri = attr.namespaceURI;
          var ns = prefix ? ' xmlns:' + prefix : " xmlns";
          buf.push(ns, '="', uri, '"');
          visibleNamespaces.push({
            prefix: prefix,
            namespace: uri
          });
        }

        serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
      } // add namespace for current node		


      if (needNamespaceDefine(node, isHTML, visibleNamespaces)) {
        var prefix = node.prefix || '';
        var uri = node.namespaceURI;
        var ns = prefix ? ' xmlns:' + prefix : " xmlns";
        buf.push(ns, '="', uri, '"');
        visibleNamespaces.push({
          prefix: prefix,
          namespace: uri
        });
      }

      if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
        buf.push('>'); //if is cdata child node

        if (isHTML && /^script$/i.test(nodeName)) {
          while (child) {
            if (child.data) {
              buf.push(child.data);
            } else {
              serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
            }

            child = child.nextSibling;
          }
        } else {
          while (child) {
            serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
            child = child.nextSibling;
          }
        }

        buf.push('</', nodeName, '>');
      } else {
        buf.push('/>');
      } // remove added visible namespaces
      //visibleNamespaces.length = startVisibleNamespaces;


      return;

    case DOCUMENT_NODE:
    case DOCUMENT_FRAGMENT_NODE:
      var child = node.firstChild;

      while (child) {
        serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
        child = child.nextSibling;
      }

      return;

    case ATTRIBUTE_NODE:
      return buf.push(' ', node.name, '="', node.value.replace(/[<&"]/g, _xmlEncoder), '"');

    case TEXT_NODE:
      return buf.push(node.data.replace(/[<&]/g, _xmlEncoder));

    case CDATA_SECTION_NODE:
      return buf.push('<![CDATA[', node.data, ']]>');

    case COMMENT_NODE:
      return buf.push("<!--", node.data, "-->");

    case DOCUMENT_TYPE_NODE:
      var pubid = node.publicId;
      var sysid = node.systemId;
      buf.push('<!DOCTYPE ', node.name);

      if (pubid) {
        buf.push(' PUBLIC "', pubid);

        if (sysid && sysid != '.') {
          buf.push('" "', sysid);
        }

        buf.push('">');
      } else if (sysid && sysid != '.') {
        buf.push(' SYSTEM "', sysid, '">');
      } else {
        var sub = node.internalSubset;

        if (sub) {
          buf.push(" [", sub, "]");
        }

        buf.push(">");
      }

      return;

    case PROCESSING_INSTRUCTION_NODE:
      return buf.push("<?", node.target, " ", node.data, "?>");

    case ENTITY_REFERENCE_NODE:
      return buf.push('&', node.nodeName, ';');
    //case ENTITY_NODE:
    //case NOTATION_NODE:

    default:
      buf.push('??', node.nodeName);
  }
}

function _importNode(doc, node, deep) {
  var node2;

  switch (node.nodeType) {
    case ELEMENT_NODE:
      node2 = node.cloneNode(false);
      node2.ownerDocument = doc;
    //var attrs = node2.attributes;
    //var len = attrs.length;
    //for(var i=0;i<len;i++){
    //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
    //}

    case DOCUMENT_FRAGMENT_NODE:
      break;

    case ATTRIBUTE_NODE:
      deep = true;
      break;
    //case ENTITY_REFERENCE_NODE:
    //case PROCESSING_INSTRUCTION_NODE:
    ////case TEXT_NODE:
    //case CDATA_SECTION_NODE:
    //case COMMENT_NODE:
    //	deep = false;
    //	break;
    //case DOCUMENT_NODE:
    //case DOCUMENT_TYPE_NODE:
    //cannot be imported.
    //case ENTITY_NODE:
    //case NOTATION_NODE：
    //can not hit in level3
    //default:throw e;
  }

  if (!node2) {
    node2 = node.cloneNode(false); //false
  }

  node2.ownerDocument = doc;
  node2.parentNode = null;

  if (deep) {
    var child = node.firstChild;

    while (child) {
      node2.appendChild(_importNode(doc, child, deep));
      child = child.nextSibling;
    }
  }

  return node2;
} //
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};


function _cloneNode(doc, node, deep) {
  var node2 = new node.constructor();

  for (var n in node) {
    var v = node[n];

    if (_typeof(v) != 'object') {
      if (v != node2[n]) {
        node2[n] = v;
      }
    }
  }

  if (node.childNodes) {
    node2.childNodes = new NodeList();
  }

  node2.ownerDocument = doc;

  switch (node2.nodeType) {
    case ELEMENT_NODE:
      var attrs = node.attributes;
      var attrs2 = node2.attributes = new NamedNodeMap();
      var len = attrs.length;
      attrs2._ownerElement = node2;

      for (var i = 0; i < len; i++) {
        node2.setAttributeNode(_cloneNode(doc, attrs.item(i), true));
      }

      break;
      ;

    case ATTRIBUTE_NODE:
      deep = true;
  }

  if (deep) {
    var child = node.firstChild;

    while (child) {
      node2.appendChild(_cloneNode(doc, child, deep));
      child = child.nextSibling;
    }
  }

  return node2;
}

function __set__(object, key, value) {
  object[key] = value;
} //do dynamic


try {
  if (Object.defineProperty) {
    var getTextContent = function getTextContent(node) {
      switch (node.nodeType) {
        case ELEMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var buf = [];
          node = node.firstChild;

          while (node) {
            if (node.nodeType !== 7 && node.nodeType !== 8) {
              buf.push(getTextContent(node));
            }

            node = node.nextSibling;
          }

          return buf.join('');

        default:
          return node.nodeValue;
      }
    };

    Object.defineProperty(LiveNodeList.prototype, 'length', {
      get: function get() {
        _updateLiveList(this);

        return this.$$length;
      }
    });
    Object.defineProperty(Node.prototype, 'textContent', {
      get: function get() {
        return getTextContent(this);
      },
      set: function set(data) {
        switch (this.nodeType) {
          case ELEMENT_NODE:
          case DOCUMENT_FRAGMENT_NODE:
            while (this.firstChild) {
              this.removeChild(this.firstChild);
            }

            if (data || String(data)) {
              this.appendChild(this.ownerDocument.createTextNode(data));
            }

            break;

          default:
            //TODO:
            this.data = data;
            this.value = data;
            this.nodeValue = data;
        }
      }
    });

    __set__ = function __set__(object, key, value) {
      //console.log(value)
      object['$$' + key] = value;
    };
  }
} catch (e) {//ie8
} //if(typeof require == 'function'){


exports.DOMImplementation = DOMImplementation;
exports.XMLSerializer = XMLSerializer; //}