export const Roll = (quantity: number, dice: number): number => {
  let sum = 0;

  for (let i = 0; i < quantity; i++) {
    let randomNumber = Math.random();

    if (randomNumber == 0) {
      randomNumber = Math.min();
    }

    sum += Math.ceil(randomNumber * dice);
  }

  return sum;
};

export const isDiceExpressionValid = (expression: string): boolean => {
  if (expression === '') return false;

  return !expression.match(/\D\D|\D$|^\D|^0|d\d+d/g);
};

export const EvalDiceExpression = (expression: string): [number, number, number] => {
  if (expression === '') {
    return [0, 0, 0];
  }

  if (!isDiceExpressionValid(expression)) {
    return [0, 0, 0];
  }

  const expressionComponents = expression.split(/(\+|-|\*|\/)/g);

  let expressionWithoutDices = '';
  let maximumValueExpression = '';
  let minimumValueExpression = '';

  expressionComponents.forEach(
    (component: string) => {
      if (component.includes('d')) {
        const [quantity, dice] = component.split('d');

        expressionWithoutDices += `${Roll(parseInt(quantity, 10), parseInt(dice, 10))}`;
        maximumValueExpression += `${parseInt(quantity, 10) * parseInt(dice, 10)}`;
        minimumValueExpression += quantity;
        return;
      }

      expressionWithoutDices += component;
      maximumValueExpression += component;
      minimumValueExpression += component;
    },
  );

  const result = eval(expressionWithoutDices);
  const maximumValue = eval(maximumValueExpression);
  const minimumValue = eval(minimumValueExpression);

  return [result, maximumValue, minimumValue];
};
