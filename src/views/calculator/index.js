import Woowahan from 'woowahan';
import template from './index.handlebars';
import {
  NUM_0, NUM_1, NUM_2, NUM_3, NUM_4, NUM_5, NUM_6, NUM_7, NUM_8, NUM_9,
  OPERATOR_CLEAR, OPERATOR_EQUAL, OPERATOR_MINUS, OPERATOR_MULTI, OPERATOR_PLUS, OPERATOR_DIVIDE
} from "../../const"
import { EVENT } from "../../event";
import { CalcManager } from "../../model";
// 클로저 영역
export const Calculator = Woowahan.View.create('Calculator', {
  template,

  events: {
    'click #cal tr td': 'onClickButton'
  },

  initialize() {
    this.setModel({ calResult: 0 });

    this.calcManager = new CalcManager();

    this.calcManager.addEventListener(EVENT.CALC_UPDATED, function (data) {
      // window.location.href = `#/calculator/${data}`; //url param 값 변화
      this.setModel({ calResult: data });
    }.bind(this));

    // this.calcManager.dispatchEvent(EVENT.CALC_UPDATED, '메로'); //url param 값 변화

    this.super();
  },

  viewWillMount(renderData) {
    // const calResult = this.params.cal_result;
    // 변수선언은 최상단에 / es6에서 호이스팅을 방지하기 위해 TDG(죽은 공간)을 없애기 위함 / typeof 변수은 항상 죽지 않았던 관례도 깨버림

    Object.assign(renderData, {
      num0: NUM_0, num1: NUM_1, num2: NUM_2, num3: NUM_3, num4: NUM_4,
      num5: NUM_5, num6: NUM_6, num7: NUM_7, num8: NUM_8, num9: NUM_9,
      plus: OPERATOR_PLUS, minus: OPERATOR_MINUS, multi: OPERATOR_MULTI,
      equal: OPERATOR_EQUAL, clear: OPERATOR_CLEAR, divide: OPERATOR_DIVIDE,
    });

    renderData.calResult = this.getCalResult();

    return renderData;
  },

  // viewDidMount($el) {
  //   $el.css({ backgroundColor: 'red' });
  // },

  getCalResult() {
    return this.params.cal_result || '0';
  },


  // TODO: 이벤트 핸들러 설명

  // onClickButton(event) {
  //   const num = $(event.currentTarget).text();
  //   console.log(num); // console.log()는 테스트 완료 후 바로 삭제
  // }
  onClickButton(event) {
    const key = $(event.currentTarget).data('key');

    // 오염 예방을 위한 방어 로직
    // if(!!key) {
    //   this.calcManager.addKey(key);
    // }
    if(typeof key !== 'undefined') {
      this.calcManager.addKey(key);
    }
  }
});

// MVC :: Model 과 View 는 분리(격리)되어 있다 Controller 만 Model / View 를 알고 변화를 감지하고 제어한다
// Model :: view 이전의 모든 데이터
// View :: rendering (template + model)
// Mediator 로 View 를 감싸면 마크업개발자와 프론트 개발자는 서로 class 만 맞추면 된다