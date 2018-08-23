/* eslint-disable indent,no-unused-vars */
// eslint-disable-next-line indent

//餐厅类
function Restaurant(parameter) {
    this.cash = parameter.cash;
    this.seats = parameter.seats;
    this.staff = parameter.staff;
}

Restaurant.prototype.hire = function (person) {
    this.staff.push(person);
};

Restaurant.prototype.fire = function (person) {
    for (let i = 0; i < this.staff.length; i++) {
        if (this.staff[i] === person) {
            this.staff.splice(i,1);
        }
    }
};

//职员类
function Staff(id, name, salary) {
    this.id = id;
    this.name = name;
    this.salary = salary;
}

Staff.prototype.completeJob = function () {

};

//服务员类
function Waiter(id, name, salary) {
    Staff.call(this, id, name, salary);
    this.completeJob();
}
Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constructor = Waiter;
Waiter.prototype.completeJob = function (parameter) {
    if (parameter instanceof Array) {
        console.log("Waiter : Wait a moment, we will serve as soon as possible...");
        return parameter[0].name;
    } else if (typeof (parameter) === "string") {
        console.log("Waiter : Please eat");
        return parameter;
    }
};
let ProxySingletonWaiter =  (function() {
    let instance;
    return function(id, name, salary) {
        if (!instance) {
            instance = new Waiter(id, name, salary);
        }
        return instance;
    };
})();


//厨师类
function Cook(id, name, salary) {
    Staff.call(this, id, name, salary);
    this.completeJob();
}
Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constructor = Cook;
Cook.prototype.completeJob = function (parameter) {
    if (typeof (parameter) === "string") {
        console.log("Cook : " + parameter + " is being made");
        return parameter;
    }
};
let ProxySingletonCook =  (function() {
    let instance;
    return function(id, name, salary) {
        if (!instance) {
            instance = new Cook(id, name, salary);
        }
        return instance;
    };
})();


//顾客类
function Customer(name) {
    this.name = name;
}
Customer.prototype.order = function () {
    let dish = [menu[random()]];
    console.log("Customer : Order " + dish[0].name);
    return dish;
};
Customer.prototype.eat = function () {
    return "Customer : Ah~ delicious, I am finished.";
};

//菜品类
function Dish(name, cookingCost, price) {
    this.name = name;
    this.cookingCost = cookingCost;
    this.price = price;
}

let customerList = ["Clark", "Clive", "Jerry", "Dirk", "Howard", "Gary", "Murray"];

let menu = [{"name": "chicken in Scallion oil","price": 50},
    {"name": "roast suckling pig","price": 80},
    {"name": "braised beef with brown sauce","price": 40},
    {"name": "crisp fried spareribs","price": 50},
    {"name": "fragrant fried chicken","price": 30},
    {"name": "Roast Beijing Duck","price": 100}];


for (let i = 0; i < customerList.length; i++) {
    let currentCustomer = new Customer(customerList[i]);
    console.log("* Customer " + currentCustomer.name + " is seated *");
    let currentWaiter = new ProxySingletonWaiter("1", "Tom", 1000);
    console.log("* Waiter " + currentWaiter.name + " service *");
    let currentCook = new ProxySingletonCook("1", "Tony", 12000);
    console.log("* Cook " + currentCook.name + " service *");
    if (currentWaiter.completeJob(currentCook.completeJob(currentWaiter.completeJob(currentCustomer.order())))) {
        console.log(currentCustomer.eat());
    }
    currentCustomer = null;
}

function random() {
    return Math.floor(Math.random() * 6);
}
