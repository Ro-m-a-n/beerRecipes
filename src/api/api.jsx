export const getRecipesAPI = async (page) => {
  try {
    let res = await fetch(`https://api.punkapi.com/v2/beers?page=${page}`);
    return res.json();
  } catch (e) {
    console.log(e);
  }
};
