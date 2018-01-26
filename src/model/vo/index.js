import {
  OPERATOR_PLUS,
  OPERATOR_MINUS,
  OPERATOR_MULTI,
  OPERATOR_DIVIDE
} from '../../const';

export const OperatorVO = class {
  get symbol() {
    throw 'symbol must override';
  }

  calc(a, b) {
    throw 'calc must override';
  }
};

export const OperatorPlus = class extends OperatorVO {
  get symbol() {
    return OPERATOR_PLUS;
  }

  calc(a, b) {
    if (!a || !b) {
      return a || b;
    }

    return a + b;
  }
};

export const OperatorMinus = class extends OperatorVO {
  get symbol() {
    return OPERATOR_MINUS;
  }

  calc(a, b) {
    if (!a || !b) {
      return a || b;
    }

    return a - b;
  }
};

export const OperatorMulti = class extends OperatorVO {
  get symbol() {
    return OPERATOR_MULTI;
  }

  calc(a, b) {
    if (!a || !b) {
      return a || b;
    }

    return a * b;
  }
};

export const OperatorDivide = class extends OperatorVO {
  get symbol() {
    return OPERATOR_DIVIDE;
  }

  calc(a, b) {
    if (!a || !b) {
      return a || b;
    }

    return a / b;
  }
};