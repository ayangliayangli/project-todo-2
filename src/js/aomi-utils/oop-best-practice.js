// 该方法用于继承father的prototype
function inheritPrototype (child, father) {
  child.prototype = Object.create(father.prototype)
  child.prototype.constructor = child
}

const Person = (function () {
  // use iife wrapper constructor and return it finally

  // function classLevelPrivateMethod () { } // class level private method
  // let classLevelPrivateVar = '' // class level private variable

  return function (name) {
    if (this === Person) {
      // 该函数只能使用new来使用，如果直接执行会在这里转义成  new Person()
      this.name = name
    } else {
      return new Person(name)
    }

    // function privateInstanceMethod() { } // instance level private method
    // let privateInstanceVar = '' // instance level private variable
  }
})()

Person.prototype.say = function () {
  console.log(`Person say: this is ${this.name}`)
}

// Student extends Person
function Student (name, grade) {
  Person.call(this, name) // extends father instance member(constructor)
  this.grade = grade
}

inheritPrototype(Student, Person) // extends father class member(prototype)
Student.prototype.say = function () {
  console.log(`student say: this is ${this.name} grade: ${this.grade}`)
}
Student.prototype.study = function () {
  console.log(`${this.name} is studing ...`)
}

// test
const yangli = new Student('yangli', 'grade 1')
console.log(yangli)
