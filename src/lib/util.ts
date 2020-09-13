export const sleep = (waitSeconds: number): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, waitSeconds * 1000);
  });
};
