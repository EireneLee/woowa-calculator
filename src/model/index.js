import { EventDispatcher } from "../event";
import {
  OPERATOR_CLEAR,
  OPERATOR_EQUAL,
  OPERATOR_PLUS,
  OPERATOR_MINUS,
  OPERATOR_MULTI,
  OPERATOR_DIVIDE
} from "../const"; //파일 전체가 아닌 필요한 부분만 import
import {
  OperatorVO,
  OperatorPlus, OperatorMinus, OperatorMulti, OperatorDivide
} from './vo';
import { EVENT } from "../event";

const ValidateManager = class {
  isValid(key) {

  }
};

const validateManager = new ValidateManager();

export const CalcManager = class extends EventDispatcher {
  constructor() {
    super();

    this.initKey();
  }

  initKey() {
    this.leftValue = 0;
    this.rightValue = 0;
    this.operator = null;
  }

  addKey(key) {
    switch (key) {
      case OPERATOR_CLEAR:
        this.initKey();

        this.dispatchEvent(EVENT.CALC_UPDATED, this.leftValue);
        break;
      case OPERATOR_PLUS:
        this.operator = new OperatorPlus;

        this.calcKeys();
        break;
      case OPERATOR_MINUS:
        this.operator = new OperatorMinus;

        this.calcKeys();
        break;
      case OPERATOR_MULTI:
        this.operator = new OperatorMulti;

        this.calcKeys();
        break;
      case OPERATOR_DIVIDE:
        this.operator = new OperatorDivide;

        this.calcKeys();
        break;
      case OPERATOR_EQUAL:
        this.calcKeys();
        break;
      default:
        this.rightValue += key + '';

        this.dispatchEvent(EVENT.CALC_UPDATED, +this.rightValue);
        break;

        // [1, 2, 3, 4, '+', 1, 2, 3]

        // this.calcKeys(this.keys);
        //
        // this.displatchEvent(EVENT.CALC_UPDATE, result);
        // this.keys.length = 0; //배열 초기화
        // this.keys.push(result); // 배열의 마지막 값을 넣어준다
        //
        // this.keys.push(key);
    }
    //switch
    //length = 0; 배열 초기화
  }

  calcKeys() {
    let result;

    if (!!this.operator) {
      result = this.operator.calc(+this.leftValue, +this.rightValue);

      this.leftValue = result;
      this.rightValue = 0;

      this.dispatchEvent(EVENT.CALC_UPDATED, result);
    }

    // switch (this.operator) {
    //   case OPERATOR_PLUS:
    //     result = +this.leftValue + +this.rightValue;
    //     break;
    //   case OPERATOR_MINUS:
    //     result = +this.leftValue - +this.rightValue;
    //     break;
    //   case OPERATOR_MULTI:
    //     result = +this.leftValue * +this.rightValue;
    //     break;
    //   case OPERATOR_DIVIDE:
    //     result = +this.leftValue / +this.rightValue;
    //     break;
    // }
  }

  // calcKeys() {
  //   keys = Array.from(keys); // (복사해서) 참조를 끊는다
  //   console.log(this.keys);
  //   this.displatchEvent()
  //   return eval(keys.join(''));
  // }
};