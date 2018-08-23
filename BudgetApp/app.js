//BUDGET CONTROLLER
var budgetController = (function() {

})();

//UI CONTROLLER
var UIController = (function() {

    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn"
    }
    
    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, //"inc or "exp"
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDomstrings: function(){
            return DOMstrings;
        }

    };
})();

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListener = function() {
        var DOM = UICtrl.getDomstrings();

        document.querySelector(DOM.inputBtn).addEventListener("click", function() {
            ctrlAddItem();
        });
        document.addEventListener("keypress", function(event) {
            if (event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function() {

        //1. Get the field input data
        var input = UICtrl.getInput();
        console.log(input);

        //2. Add the item to the budget controller
        //3. Add the new item to the UI
        //4. Calculate the budget
        //5. Display the budget
    }

    return {
        init: function() {
            setupEventListener();
        }
    }
})(budgetController, UIController);

controller.init();