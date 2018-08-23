//BUDGET CONTROLLER
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {  
            expenses: [],
            incomes: []
        },
        totals: {
            expenses: 0,
            incomes: 0
        }
    };

    return {
        addItem: function(type, descr, val) {
            var newItem, ID;

            //Create new ID
            ID = data.allItems[type][data.allItems[type].length-1].id + 1;

            //Create new item based on its type (inc or exp)
            if (type === "exp") {
                newItem = new Expense(ID, descr, val);
            } else if (type === "inc") {
                newItem = new Income(ID, descr, val);
            }

            //Push the new item into the datastructure
            data.allItems[type].push(newItem);
            //Return new item
            return newItem;
        },
    };

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

        //2. Add the item to the budget controller
        var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

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