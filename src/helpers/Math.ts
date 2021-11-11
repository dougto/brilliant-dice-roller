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

  const expressionWithoutDices = expressionComponents.map(
    (component: string) => {
      if (component.includes('d')) {
        const [quantity, dice] = component.split('d');

        return `${Roll(parseInt(quantity, 10), parseInt(dice, 10))}`;
      }

      return component;
    },
  );

  const maximumValueExpression = expressionComponents.map(
    (component: string) => {
      if (component.includes('d')) {
        const [quantity, dice] = component.split('d');

        return `${parseInt(quantity, 10) * parseInt(dice, 10)}`;
      }

      return component;
    },
  );

  const minimumValueExpression = expressionComponents.map(
    (component: string) => {
      if (component.includes('d')) {
        const [quantity] = component.split('d');

        return quantity;
      }

      return component;
    },
  );

  const result = eval(expressionWithoutDices.join().replace(/,/g, ''));
  const maximumValue = eval(maximumValueExpression.join().replace(/,/g, ''));
  const minimumValue = eval(minimumValueExpression.join().replace(/,/g, ''));

  return [result, maximumValue, minimumValue];
};
