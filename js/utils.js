'use strict';

/**
 * Модуль вспомогательных функций и переменных
 */
(function () {

  // Вспомогательные переменные
  var ESC_KEYCODE = 27;

  /**
   * Функция, возвращающее слово в
   * соответствующем числе
   *
   * @param {number} number
   * @param {string[]} options
   * @return {string}
   * @example
   *
   * makePlural(5, ['комната', 'комнаты', 'комнат']);
   * // return 'комнат';
   */
  var makePlural = function (number, options) {
    var firstDigit = number % 10;
    var secondDigit = Math.floor(number / 10) % 10;

    if (secondDigit !== 1) {
      if (firstDigit === 1) {
        return options[0];
      } else if ((firstDigit >= 2 && firstDigit <= 4)) {
        return options[1];
      }
      return options[2];
    }
    return options[2];
  };

  /**
   * Функция, проверяющая, есть ли
   * у элемента соответствующий родитель
   *
   * @param {Node} parent
   * @param {Node} element
   * @return {boolean}
   */
  var checkParentNode = function (parent, element) {
    var desirableParent = parent;
    var currentElement = element;
    var isEqual = false;
    while (currentElement.parentNode) {
      if (currentElement.parentNode === desirableParent) {
        isEqual = true;
        break;
      }
      currentElement = currentElement.parentNode;
    }
    return isEqual;
  };

  /**
   * Функция, удаляющая определенных детей
   * родительского элемента
   *
   * @param {Node} parent
   * @param {Node} elements
   */
  var removeChildren = function (parent, elements) {
    elements.forEach(function (item) {
      parent.removeChild(item);
    });
  };

  /**
   * Любая функция
   *
   * @callback addedCallback
   */

  /**
   * Функция, вызывающая
   * callback при нажатии ESC
   *
   * @param {Event} evt
   * @param {addedCallback} callback
   */
  var escPressHandler = function (evt, callback) {
    if (evt.keyCode === ESC_KEYCODE) {
      callback();
    }
  };

  /**
   * @callback addedCallback
   */

  /**
   * Функция, вызывающая
   * callback при клике вне элемента
   *
   * @param {Event} evt
   * @param {Element} element
   * @param {addedCallback} callback
   */
  var outsideClickHandler = function (evt, element, callback) {
    var target = evt.target;
    if (target !== element && !checkParentNode(element, target)) {
      callback();
    }
  };

  /**
   * Функция, определяющая значения
   * top и left для элемента
   * относительно окна или страницы
   *
   * @param {Element} elem
   * @param {boolean} relative Относительно страницы
   * @return {Object}
   */
  var getCoords = function (elem, relative) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = relative ? box.top + scrollTop - clientTop : box.top;
    var left = relative ? box.left + scrollLeft - clientLeft : box.left;

    return {
      top: top,
      left: left
    };
  };

  /**
   * Функция, изменяющая значение
   * "другого" поля на значение текущего
   *
   * @param {Element} current
   * @param {Element} opposite
   */
  var changeValue = function (current, opposite) {
    opposite.value = current.value;
  };

  /**
   * Функция глубокого копирования свойств объектов
   *
   * @param {Object} targetObject
   * @param {Object} refObject
   * @return {Object}
   */
  var deepCopy = function (targetObject, refObject) {
    for (var prop in targetObject) {
      if (targetObject.hasOwnProperty(prop)) {
        if (typeof targetObject[prop] === 'object') {
          targetObject[prop] = refObject[prop] ? deepCopy(targetObject[prop], refObject[prop]) : targetObject[prop];
        } else {
          targetObject[prop] = (refObject[prop] || typeof refObject[prop] === 'boolean')
            ? refObject[prop]
            : targetObject[prop];
        }
      }
    }
    return targetObject;
  };

  /**
   * Функция, возвращающая входящее
   * число, если оно в промежутке.
   * В противном случае возвращается
   * одна из заданных границ
   *
   * @param {number} number
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  var conditionalRange = function (number, min, max) {
    return (number < min && min) || (number > max && max) || number;
  };

  /**
   * Функция нахождения тега в родителе
   *
   * @param {Element} parent
   * @param {string} tag
   * @return {Element}
   */
  var findTag = function (parent, tag) {
    var tempElement;

    [].slice.call(parent.children).forEach(function (item) {
      if (item.tagName === tag) {
        tempElement = item;
      }
    });

    return tempElement;
  };

  /**
   * Функция перевода в неактивное состояние
   * элементов формы
   *
   * @param {Element} element Узел формы
   */
  var disableFormChildren = function (element) {
    [].slice.call(element.children).forEach(function (item) {
      item.setAttribute('disabled', '');
    });
  };

  /**
   * Функция перевода в активное состояние
   * элементов формы
   *
   * @param {Element} element Узел формы
   */
  var enableFormChildren = function (element) {
    [].slice.call(element.children).forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  /**
   * @callback addedCallback
   */

  /**
   * Функция устранения дребезга
   *
   * @param {addedCallback} callback
   * @param {number} delay Задержка
   * @return {function()}
   */
  var debounce = function (callback, delay) {
    var timer = null;

    return function () {
      var args = arguments;

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(function () {
        callback(null, args);
      }, delay);
    };
  };

  // Экспорт
  window.utils = {
    makePlural: makePlural,
    removeChildren: removeChildren,
    escPressHandler: escPressHandler,
    outsideClickHandler: outsideClickHandler,
    getCoords: getCoords,
    changeValue: changeValue,
    deepCopy: deepCopy,
    conditionalRange: conditionalRange,
    findTag: findTag,
    disableFormChildren: disableFormChildren,
    enableFormChildren: enableFormChildren,
    debounce: debounce
  };
})();
