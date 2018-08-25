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

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(c) {
            sum += c.value;
        });
        data.totals[type] = sum;
    };


    var data = {
        allItems: {  
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function(type, descr, val) {
            var newItem, ID;

            //Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
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

        calculateBudget: function() {
            //Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //Calculate the budget: income - expenses7
            data.budget = data.totals.inc - data.totals.exp;

            //Calculate the percentage of income that we spent
            data.percentage = Math.round(data.totals.expenses / data.totals.inc * 100);
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function() {
            console.log(data);
        }
    };

})();

//UI CONTROLLER
var UIController = (function() {

    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeContainer: ".income__list",
        expenseContainer: ".expenses__list"
    }

    return {
        getInput : function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, //"inc or "exp"
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        addListItem: function(obj, type) {
            //Create HTML string with placeholder text
            var html, newHtml, element;

            if (type === "inc") {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === "exp") {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            //Replace te placeholder text with actual data
            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%description%", obj.description);
            newHtml = newHtml.replace("%value%", obj.value);
       
            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML("beforeend",newHtml);
        },
 
        clearFields: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = ""; 
            });

            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {


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

    var updateBudget = function() {
        //1. Calculate the budget
        budgetCtrl.calculateBudget();

        //2. Return the budget
        var budget = budgetCtrl.getBudget();

        //3. Display the budget
        console.log(budget);
    };

    var ctrlAddItem = function() {

        //1. Get the field input data
        var input = UICtrl.getInput();

        if(input.description != "" && !isNaN(input.value) && input.value > 0) {
            //2. Add the item to the budget controller
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. Add the new item to the UI
            UICtrl.addListItem(newItem, input.type);

            //4. Clear the fields
            UICtrl.clearFields();

            //5. Calculate and update budget
            updateBudget();
        }
    }

    return {
        init: function() {
            setupEventListener();
        }
    }
})(budgetController, UIController);

controller.init();