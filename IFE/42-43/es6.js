/* eslint-disable indent,no-unused-vars */
// eslint-disable-next-line indent

//餐厅类
class Restaurant {
    constructor(parameter) {
        this.cash = parameter.cash;
        this.seats = parameter.seats;
        this.staff = parameter.staff;
    }
    hire(person) {
        this.staff.push(person);
    }
    fire(person) {
        for (let i = 0; i < this.staff.length; i++) {
            if (this.staff[i] === person) {
                this.staff.splice(i,1);
            }
        }
    }
}


//职员类
class Staff {
    constructor(id, name, salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }
    completeJob() {

    }
}

//服务员类
class Waiter extends Staff {
    constructor(id, name, salary) {
        super(id, name, salary);
    }
    completeJob (parameter) {
        super.completeJob();
        if (parameter instanceof Array) {
            //order(); 点菜
        } else {
            //eat(); 吃
        }
    }
}


//厨师类
class Cook extends Staff {
    constructor(id, name, salary) {
        super(id, name, salary);
    }
    completeJob (parameter) {
        super.completeJob();
        //cookingDishes(); 烹饪出菜品
    };
}


//顾客类
class Customer{
    order() {}
    eat() {}
}


//菜品类
class Dishes {
    constructor(name, cookingCost, price) {
        this.name = name;
        this.cookingCost = cookingCost;
        this.price = price;
    }
}



var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});

