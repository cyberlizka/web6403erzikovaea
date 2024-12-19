async function fetchAndDisplayBooks(booksTable) {
    try {
        const response = await fetch('http://localhost:3000/books');

        if (!response.ok) {
            const message = `Ошибка загрузки данных! Статус: ${response.status} ${response.statusText}`;
            throw new Error(message);
        }
        const data = await response.json();

        if (!data || !data.data || !Array.isArray(data.data)) {
            throw new Error("Некорректные данные от сервера!  Ожидается объект с массивом 'data'.");
        }
        const books = data.data;

        if (books.length === 0) {
            booksTable.innerHTML = '<p>Список книг пуст.</p>';
            return;
        }

        booksTable.innerHTML = '';
        const fragment = document.createDocumentFragment();
        const header = document.createElement("section");
        header.classList.add("books-row");
        header.innerHTML = `
            <span class="books-cell"><strong>Название</strong></span>
            <span class="books-cell"><strong>Автор</strong></span>
            <span class="books-cell"><strong>Статус</strong></span>
        `;
        fragment.appendChild(header);

        books.forEach(book => {
          const bookRow = document.createElement("section");
          bookRow.classList.add("books-row");
          bookRow.innerHTML = `
              <span class="books-cell">${book.title}</span>
              <span class="books-cell">${book.author}</span>
              <span class="books-cell">${book.status}</span>
          `;
          fragment.appendChild(bookRow);
        });

        booksTable.appendChild(fragment);

    } catch (error) {
        console.error("Ошибка:", error);
        const errorMessage = `Не удалось получить информацию о книгах! ${error.message}`;
        booksTable.innerHTML = `<p>${errorMessage}</p>`;
    }
}
document.addEventListener("DOMContentLoaded", async () => {
    const booksTable = document.getElementById("books-table");
    if (booksTable) {
        await fetchAndDisplayBooks(booksTable);
    } else {
        console.error("Элемент с id 'books-table' не найден.");
    }
});
