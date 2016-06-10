HTMLCollection.prototype.removeClass = (names, interval)->
  obj = $(this)
  _a = names.split(" ")

  setTimeout ->
    obj.each (e)->
      _a.each (c)->
        e.classList.remove c
  , interval || 0

  this


HTMLCollection.prototype.remove = (interval)->
  obj = this
  setTimeout ->
    obj.each (e)->
      remove(e)
  , interval || 0

  this


remove = (obj)->
  obj.parentNode.removeChild(obj)


HTMLCollection.prototype.toggleClass = (class1, class2)->
  _collection = this
  _collection.each (e)->
    e.toggleClass class1, class2

  this


HTMLCollection.prototype.replaceClass = (sought, substitute)->
  _collection = this
  _collection.each (e)->
    e.replaceClass sought, substitute

  this


HTMLCollection.prototype.addClass = (names)->
  _collection = this
  _collection.each (e)->
    e.addClass names

  this


HTMLCollection.prototype.removeClass = (names)->
  _collection = this
  _collection.each (e)->
    e.removeClass names

  this