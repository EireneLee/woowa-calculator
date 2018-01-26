// event 송신발신 : 이벤트 인터페이스를 한 곳에 구현

export const EVENT = {
  CALC_UPDATED: 'CALC_UPDATED'
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

    events[type].push(listener);
  }

  dispatchEvent(type, data) {
    const listeners = this.events[type];

    listeners.forEach(listener => listener.call(this, data));
  }
};