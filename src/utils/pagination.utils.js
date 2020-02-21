
const pagination = ({ page, numberOfRows }) => {
  const limit = numberOfRows;
  const offset = (page - 1) * numberOfRows;

  return { limit, offset };
};

export default pagination;
