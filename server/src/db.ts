import fs from "fs";

export function cacheData(data: object) {
  try {
    fs.writeFile("db/products.json", JSON.stringify(data), (error) => {
      if (error) throw new Error("Write error");
      console.log("Кэширование данных завершено");
    });
  } catch (e) {
    console.log("Ошибка при кэшировании данных");
    console.log(e);
  }
}

export function getProducts(): string | null {
  try {
    const data = fs.readFileSync("db/products.json", "utf8");

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
