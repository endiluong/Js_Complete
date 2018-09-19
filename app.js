//Budget Controller
//
//
var budgetController = (function () {
      //Create Expanse Object
      var Expense = function (id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
      };

      var Income = function (id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
      };

      //Create Data Structure for more complex data process
      var data = {
            allItems: {
                  expense: [],
                  income: []
            },
            total: {
                  exp: 0,
                  inc: 0
            }
      };

      return {
            addItem: function (type, des, val) {
                  var newItem, ID;
                  if (data.allItems[type].length > 0) {
                        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
                  } else {
                        ID = 0;
                  }
                  //Use Type to define expense or income
                  // then pass ID from the upper ID Processor to the new Item = new[type] along with value and des
                  //Create new Item on Type
                  if (type === 'expense') {
                        newItem = new Expense(ID, des, val);
                  } else if (type === 'income') {
                        newItem = new Income(ID, des, val);
                  }
                  //Put to Data Structure
                  data.allItems[type].push(newItem);
                  //Return new Element
                  return newItem;
            },

            testing: function () {
                  console.log(data);
            }
      };

})();


//
//
//UI Controller
//
//
var UIController = (function () {
      //
      var DOMstring = {
            inputType: '.add__type',
            inputDescription: '.add__description',
            inputValue: '.add__value',
            addBtn: '.add__btn',
            incomeContainer: '.income__list',
            expanseContainer: '.expenses__list'
      }
      //
      //
      return {
            getInput: function () {
                  //return object include input type, vlaue and description
                  return {
                        type: document.querySelector(DOMstring.inputType).value,
                        //value return will be inc for income or exp for expanse
                        //process to pickout income or expanse
                        description: document.querySelector(DOMstring.inputDescription).value,
                        value: document.querySelector(DOMstring.inputValue).value
                  };
            },

            addListItem: function (obj, type) {
                  var html, newHTML, element;
                  //Create HTML string with placeholder text
                  if (type === 'income') {
                        element = DOMstring.incomeContainer;
                        html = '<div class="item clearfix" id = "income-%id%" ><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div >';
                  } else if (type === 'expense') {
                        element = DOMstring.expanseContainer;
                        html = '<div class="item clearfix" id = "expense-%id%" ><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div >';
                  }
                  //Replace placeholder text with some actual data
                  console.log(obj);
                  newHTML = html.replace('%id%', obj.id);
                  newHTML = newHTML.replace('%value%', obj.value);
                  newHTML = newHTML.replace('%description%', obj.description);

                  //Insert the HTML to DOM
                  document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

            },

            getDOMstrings: function () {
                  return DOMstring;
            }
      };

})();
//
//
// GLobal Controller
//
//
var controller = (function (budgetCtrl, UICtrl) {
      //
      //
      //
      var setUpEventListener = function () {
            var DOMstring = UICtrl.getDOMstrings();

            document.querySelector(DOMstring.addBtn).addEventListener('click', ctrlAddItem);

            document.addEventListener('keypress', function (e) {
                  if (e.keyCode === 13 || e.which === 13) {
                        //Do Enter
                        ctrlAddItem();
                  }
            });
      };

      var ctrlAddItem = function () {
            var input, newItem;
            // 1.get from input
            input = UICtrl.getInput();
            console.log(input);
            // 2. add item to bdget Contrller
            //budgetrcontroller

            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. To UI
            UICtrl.addListItem(newItem, input.type);
            // 4. Cal budget
            // 5. Update UI
      }


      return {
            init: function () {
                  console.log("Started");
                  setUpEventListener();
            }
      }
})(budgetController, UIController);

controller.init();