#calculator

## calculator UI - html, css 
- 숫자 (0 - 9) 
- 연산자 (+, -, x, ÷, =)
- clear (erase all, reset 기능)
- 합계 (result)

# Javascript code 작성
### events 이벤트 핸들러 

````
import Woowahan from 'woowahan';
import template from './index.handlebars';

export const Calculator = Woowahan.View.create('Calculator', {
  template,

  events: {
    'click #cal tr td':'onClickButton'
  },
  
  onClickButton(event) {
    const num = $(event.currentTarget).text();
    console.log(num);
  }
    
````

### 숫자 및 연산자를 상수로 선언 및 할당

````
const/index.js 


export const NUM_0 = 0;
export const NUM_1 = 1;
export const NUM_2 = 2;
export const NUM_3 = 3;
export const NUM_4 = 4;
export const NUM_5 = 5;
export const NUM_6 = 6;
export const NUM_7 = 7;
export const NUM_8 = 8;
export const NUM_9 = 9;

export const OPERATOR_PLUS = '+';
export const OPERATOR_MINUS = '-';
export const OPERATOR_MULTI = 'x';
export const OPERATOR_DIVIDE = '÷';
export const OPERATOR_EQUAL = '=';
export const OPERATOR_CLEAR = 'C';

````

### Object.assign() 
- 상수 import
- Object.assign() : method is used to copy the values of all enumerable own properties from one or more source objects to a target object. 
It will return the target object.

````
calculator/index.js 

import Woowahan from 'woowahan';
import template from './index.handlebars';
import {
  NUM_0, NUM_1, NUM_2, NUM_3, NUM_4, NUM_5, NUM_6, NUM_7, NUM_8, NUM_9,
  OPERATOR_CLEAR, OPERATOR_EQUAL, OPERATOR_MINUS, OPERATOR_MULTI, OPERATOR_PLUS, OPERATOR_DIVIDE
} from "../../const"

export const Calculator = Woowahan.View.create('Calculator', {
  template,

  events: {
    'click #cal tr td':'onClickButton'
  },
  
  viewWillMount(renderData) {
      Object.assign(renderData, {
        num0: NUM_0, num1: NUM_1, num2: NUM_2, num3: NUM_3, num4: NUM_4,
        num5: NUM_5, num6: NUM_6, num7: NUM_7, num8: NUM_8, num9: NUM_9,
        plus: OPERATOR_PLUS, minus: OPERATOR_MINUS, multi: OPERATOR_MULTI,
        equal: OPERATOR_EQUAL, clear: OPERATOR_CLEAR, divide: OPERATOR_DIVIDE
      })
    },
    
````
### Event Handler : onClickButton()
- num0 의 key 값인 0은 false 이므로 오염 예방 방어 로직으로 인해 계산기 숫자 0이 console에 찍히지 않음

````
calculator/index.js


// TODO: 이벤트 핸들러 설명

  // onClickButton(event) {
  //   const num = $(event.currentTarget).text();
  //   console.log(num);
  // }
  onClickButton(event) {
    const key = $(event.currentTarget).data('key');

    // 오염 예방을 위한 방어 로직
    if(!!key) {
      this.calcManager.addKey(key);
    }
  }
  
````
###  EventDispatcher
````
// event 송신발신 : 이벤트 인터페이스를 한 곳에 구현

export const EVENT = {
  //CALC_UPDATED
};

export const EventDispatcher = class {
  constructor() {
    this.events = {};
  }

  //addEventListener(type, listener){}
  addEventListener(type, listener) {
    // 두 번이상 코드에 등장하면 변수로 만들라
    const events = this.events;

    if(!events[type]) {
      events[type] = [];
    }

  }

  displatchEvent(type, data) {

  }

````

# MVC
- MVC :: Model 과 View 는 분리(격리)되어 있다 Controller 만 Model / View 를 알고 변화를 감지하고 제어한다
- Model :: view 이전의 모든 데이터
- View :: rendering (template + model)
- Mediator 로 View 를 감싸면 마크업개발자와 프론트 개발자는 서로 class 만 맞추면 된다


### 계산을 담당할 Calcmanager 생성

````
calculator/index.js


initialize() {
    this.calcManager = new CalcManager();

    this.calcManager.addEventListener(EVENT.CALC_UPDATED, function (data) {
      console.log(data);
    });

    //this.calcManager.dispatchEvent('click');

    this.super();
  },
````

````  
model/index.js


import {EventDispatcher} from "../event";
import {OPERATOR_CLEAR} from "../const";

export const CalcManager = class extends EventDispatcher {
  constructor() {
    super();

    this.keys = [];
  }

  addKey(key) {
    this.keys.push(key);

    //switch
    //length = 0; 배열 초기화


    this.calcKeys();
  }

  calcKeys() {
    console.log(this.keys);
    this.displatchEvent()
  }

````
## eval() 사용하지 않는 이유
- 보안이슈
- 성능이슈 : 브라우저에서 실행하는 모든 최적화를 무력화시킴 
- jquery 내부에서는(ex. global.eval()) 사용하기도 하고, 고급 개발자는 사용하기도 한다