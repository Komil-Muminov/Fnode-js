const sqlite = require("sqlite3");
const fs = require("fs");

const db = new sqlite.Database("kmDB.db", (err) => {
	if (err) {
		console.log(`Ошибка при подключении:`, err);
	} else {
		console.log("Подключено к базе данных SQLite");
	}
});

db.serialize(() => {
	// Создаем таблицу, если она не существует
	db.run("CREATE TABLE IF NOT EXISTS users (id INT, name TEXT)");

	// Вставляем данные в таблицу
	db.run("INSERT INTO users (id, name) VALUES (?, ?)", [1, "Komil"], (err) => {
		if (err) {
			console.error("Ошибка при вставке данных:", err);
		} else {
			// Запрашиваем данные из таблицы после вставки
			db.all("SELECT * FROM users", (err, rows) => {
				if (err) {
					console.error("Ошибка выполнения запроса:", err);
				} else {
					console.log("Результаты запроса:", rows);
				}
			});
		}
	});
});

// Чтение данных из файла
fs.readFile("file.txt", "utf8", (err, data) => {
	if (err) {
		console.error("Ошибка чтения файла:", err);
	} else {
		console.log("Данные из файла:", data);
	}
});
