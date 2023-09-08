const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

export const isBookmarked = (id) => {
  return bookmarks.includes(id);
}

export const bookmark = (id) => {
  console.log(bookmarks);
  bookmarks.push(id);
  console.log(bookmarks);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

export const unbookmark = (id) => {
  const index = bookmarks.indexOf(id);
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

export default bookmarks;