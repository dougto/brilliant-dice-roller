export const Roll = (quantity: number, dice: number): number => {
  let sum = 0;

  for (let i = 0; i < quantity; i++) {
    sum += Math.ceil(Math.random() * dice);
  }

  return sum;
};
