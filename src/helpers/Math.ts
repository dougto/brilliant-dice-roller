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

export const EvalDiceExpression = (expression: string): number => {
  if (expression === "") {
    return 0;
  }

  const expressionComponents = expression.split(/(\+|-|\*|\/)/g);

  const expressionWithoutDices = expressionComponents.map(
    (component: string) => {
      if (component.includes("d")) {
        if ((component.match(/d/g) as Array<string>).length > 1) {
          throw new Error("invalid expression");
        }

        const [quantity, dice] = component.split("d");

        if (
          !Number.isInteger(parseInt(quantity)) ||
          !Number.isInteger(parseInt(dice))
        ) {
          throw new Error("invalid expression");
        }

        return `${Roll(parseInt(quantity), parseInt(dice))}`;
      }

      return component;
    }
  );

  const result = eval(expressionWithoutDices.join().replace(/,/g, ""));

  return result;
};
