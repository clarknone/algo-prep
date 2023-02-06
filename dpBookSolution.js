const maxHours = 12;

const books = [
  { title: "The Foundation", hours: 8, price: 50 },
  { title: "Harry Porter", hours: 8, price: 50 },
  { title: "Art of War", hours: 1, price: 15 },
  { title: "Think and Grow Rich", hours: 2, price: 25 },
  { title: "Blue Ocean Strategy", hours: 1.5, price: 15 },
  { title: "Eze Goes to School", hours: 1, price: 10 },
  { title: "Macbeth", hours: 2, price: 30 },
  { title: "Hamlet", hours: 2, price: 30 },
  { title: "Start With Why", hours: 2, price: 25 },
  { title: "The Wealth of Nations", hours: 4, price: 25 },
];

const sortedBooks = books.sort((a, b) => b.hours - a.hours);

let count = 0;

function dynamicSearch(availableBooks, availableHours, memo = {}) {
  count++;
  let result = [];
  const currentBook = availableBooks[0];
  const memoIndex = `${availableBooks.length} ${+availableHours}`;
  if (availableBooks.length < 1 || availableHours < 1) {
    result = [0, []];
  } else if (memo[memoIndex]) {
    result = memo[memoIndex];
  } else if (currentBook.hours > availableHours) {
    result = dynamicSearch(availableBooks.slice(1), availableHours, memo);
  } else {
    const [hoursIfSelected, booksIfSelected] = dynamicSearch(
      availableBooks.slice(1),
      availableHours - currentBook.hours,
      memo
    );
    const [hoursIfNotSelected, booksIfNotSelected] = dynamicSearch(availableBooks.slice(1), availableHours, memo);
    if (hoursIfSelected + currentBook.hours > hoursIfNotSelected) {
      result = [hoursIfSelected + currentBook.hours, [...booksIfSelected, currentBook]];
    } else {
      result = [hoursIfNotSelected, booksIfNotSelected];
    }
  }

  memo[memoIndex] = result;
  return result;
}

let result = dynamicSearch(books, maxHours);
console.log({ selectedBooks: result[1], count });
