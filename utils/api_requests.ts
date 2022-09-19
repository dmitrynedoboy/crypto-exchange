const getMinAmount = async (from, to) => {
  try {
    const response = await fetch(
      `${process.env.API_MIN_AMOUNT}${from}_${to}?api_key=${process.env.API_KEY}`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }

};

const getEstimatedAmount = async (minAmount, from, to) => {
  try {
    const response = await fetch(
      `${process.env.API_ESTIMATED_AMOUNT}${minAmount}/${from}_${to}/?api_key=${process.env.API_KEY}`
    );
    const { estimatedAmount } = await response.json()
    return estimatedAmount;
  } catch (error) {
    console.error(error);
  }
}

const getCurrencyList = async () => {
  try {
    const response = await fetch(`${process.env.API_CURR_LIST}`);
    return await response.json();
  } catch (error) {
    console.error(error);

  }


}

export { getMinAmount, getEstimatedAmount, getCurrencyList };
