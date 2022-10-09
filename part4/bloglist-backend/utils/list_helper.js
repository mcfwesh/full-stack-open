const dummy = (array) => {
  return 1;
};

const totalLikes = (array) => {
  return array.reduce((a, b) => a + b.likes, 0);
};

const favoriteBlog = (array) => {
  const maxLike = Math.max(...array.map((b) => b.likes));
  const { title, author, likes } = array.find((b) => b.likes === maxLike);
  return { title, author, likes };
};

const mostBlogs = (array) => {
  const occurrences = array.reduce(function (acc, curr) {
    return acc[curr.author] ? ++acc[curr.author] : (acc[curr.author] = 1), acc;
  }, {});
  const max = Math.max(...Object.values(occurrences));
  const getMaxAuthorArray = Object.entries(occurrences).filter(
    ([author, blogs]) => blogs === max
  )[0];
  return { author: getMaxAuthorArray[0], blogs: getMaxAuthorArray[1] };
};

const mostLikes = (array) => {
  let Obj = {};
  array.forEach((d) => {
    if (Obj[d.author]) {
      Obj[d.author] = d.likes + Obj[d.author];
    } else {
      Obj[d.author] = d.likes;
    }
  });
  const max = Math.max(...Object.values(Obj));
  const getMaxLikesArray = Object.entries(Obj).filter(
    ([author, likes]) => likes === max
  )[0];
  return { author: getMaxLikesArray[0], likes: getMaxLikesArray[1] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
