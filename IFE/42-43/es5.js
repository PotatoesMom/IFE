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
}
Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constructor = Waiter;
Waiter.prototype.completeJob = function (parameter) {
    if (parameter instanceof Array) {
        //order(); 点菜
    } else {
        //eat(); 吃
    }
};

//厨师类
function Cook(id, name, salary) {
    Staff.call(this, id, name, salary);
}
Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constructor = Cook;
Cook.prototype.completeJob = function (parameter) {
    //cookingDishes(); 烹饪出菜品
};

//顾客类
function Customer() {}
Customer.prototype.order = function () {

};
Customer.prototype.eat = function () {

};

//菜品类
function Dishes(name, cookingCost, price) {
    this.name = name;
    this.cookingCost = cookingCost;
    this.price = price;
}
