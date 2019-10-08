/**
 * 期数：一年份有多少期数
 */
export const LoanPeriodMonthsNumber = 12;

/**
 * 提前还款期数边界值：60
 */
export const EarlySettlementOnNLoanPeriodMonthsBoundaryValue = 60;
export const EarlySettlementOnNLoanPeriodMonthsMultipleNumber = 5;

/**
 * 贷款类型
 */
export const loanCalculatorTypes = [
  {
    cnLabel: '本地住宅类',
    enLabel: 'Local Residential',
    label: '',
    value: 0,
    interestRate: 0.0329,
    list: [5, 10, 15, 20, 25, 30],
    earlySettlementOnNLoanPeriodMonthsBoundaryValue: 60,
    arlySettlementOnNLoanPeriodMonthsMultipleNumber: 5,
    prompt: `1. 五年内提前结清贷款，需支付清前五年的利息与剩余未还本金；<br/>2. 五年后提前结清贷款，只需结清当期利息及支付剩余未还本金。`,
    enPrompt: `1. In the event that early settlement/prepayment is made within 5 years，5 years total interest and balancing principal is to be paid upon settlement.<br/>2. In the event that early settlement/prepayment is made after 5 years,the interest charged on the Principal Sum of remaining period after the settlement/prepayment date will be waived.`
  },
  {
    cnLabel: '本地商铺类',
    enLabel: 'Local Shop',
    label: '',
    value: 1,
    interestRate: 0.0505,
    list: [10],
    earlySettlementOnNLoanPeriodMonthsBoundaryValue: 60,
    arlySettlementOnNLoanPeriodMonthsMultipleNumber: 5,
    prompt: `1. 五年内提前结清贷款，需支付清前五年的利息与剩余未还本金；<br/>2. 五年后提前结清贷款，只需结清当期利息及支付剩余未还本金。`,
    enPrompt: `1. In the event that early settlement/prepayment is made within 5 years，5 years total interest and balancing principal is to be paid upon settlement.<br/>2. In the event that early settlement/prepayment is made after 5 years,the interest charged on the Principal Sum of remaining period after the settlement/prepayment date will be waived.`
  },
  {
    cnLabel: '中国贷',
    enLabel: 'China Loan',
    label: '',
    value: 2,
    interestRate: 0.0665,
    list: [10],
    earlySettlementOnNLoanPeriodMonthsBoundaryValue: 36,
    arlySettlementOnNLoanPeriodMonthsMultipleNumber: 3,
    prompt: `1. 三年内提前结清贷款，需支付清前三年的利息与剩余未还本金；<br/>2. 三年后提前结清贷款，只需结清当期利息及支付剩余未还本金。`,
    enPrompt: `1. In the event that early settlement/prepayment is made within 3 years，3 years total interest and balancing principal is to be paid upon settlement.<br/>2. In the event that early settlement/prepayment is made after 3 years,the interest charged on the Principal Sum of remaining period after the settlement/prepayment date will be waived.`
  }
];
