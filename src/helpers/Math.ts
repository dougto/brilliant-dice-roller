export const Roll = (quantity: number, dice: number): number => {
  let sum = 0;

  for (let i = 0; i < quantity; i++) {
    sum += Math.ceil(Math.random() * dice);
  }

  return sum;
};

export const EvalDiceExpression = (expression: string): number => {
  if (expression === "") {
    return 0;
  }

  const expressionComponents = expression.split(/(\+|-)/g);

  const expressionWithoutDices = expressionComponents.map(
    (component: string) => {
      if (component.includes("d")) {
        if ((component.match(/d/g) as Array<string>).length > 1) {
          throw new Error("invalid expression");
        }

        const [quantity, dice] = component.split("d");

        return `${Roll(parseInt(quantity), parseInt(dice))}`;
      }

      return component;
    }
  );

  const result = eval(expressionWithoutDices.join().replace(/,/g, ""));

  return result;
};
