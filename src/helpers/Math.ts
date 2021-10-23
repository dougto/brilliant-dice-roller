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

  return !expression.match(/\D\D|\D$|^\D|^0/g);
};

export const EvalDiceExpression = (expression: string): number => {
  if (expression === '') {
    return 0;
  }

  if (!isDiceExpressionValid(expression)) {
    return 0;
  }

  const expressionComponents = expression.split(/(\+|-|\*|\/)/g);

  const expressionWithoutDices = expressionComponents.map(
    (component: string) => {
      if (component.includes('d')) {
        const [quantity, dice] = component.split('d');

        return `${Roll(parseInt(quantity, 10), parseInt(dice, 10))}`;
      }

      return component;
    },
  );

  const result = eval(expressionWithoutDices.join().replace(/,/g, ''));

  return result;
};
