//Budget Controller
//
//
var budgetController = (function () {
  
   let x = 10;

   return function (a) {
      console.log(x + a);
   }

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
      addBtn: '.add__btn'
   }
   //
   //
   return {
      getinput: function () {
         //return object include input type, vlaue and description
         return {
            type: document.querySelector(DOMstring.inputType).value,
            //value return will be inc for income or exp for expanse
            //process to pickout income or expanse
            description: document.querySelector(DOMstring.inputDescription).value,
            value: document.querySelector(DOMstring.inputValue).value
         };
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
   //
   //
   //
   var ctrlAddItem = function () {
      // 1.get from input
      var input = UICtrl.getinput();
      console.log(input);
      // 2. add item to bdget Contrller
      // 3. To UI
      // 4. Cal budget
      // 5. Update UI
   }



   return {
      init: function(){
         console.log("Started");
         setUpEventListener();
      }
   }


})(budgetController, UIController);

controller.init();