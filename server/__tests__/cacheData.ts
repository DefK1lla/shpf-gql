import fs from "fs";
import { cacheData } from "../src/db";

jest.mock("fs");

const mockWriteFile = fs.writeFile as unknown as jest.Mock;

describe("cacheData функция", () => {
  const mockData = { key: "value" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("должна записывать данные в файл и не вызывать console.log из блока catch", async () => {
    mockWriteFile.mockImplementationOnce((path, content, callback) => {
      callback(null);
    });

    const consoleLogMock = jest
      .spyOn(console, "log")
      .mockImplementationOnce(() => {});

    cacheData(mockData);

    expect(fs.writeFile).toHaveBeenCalledWith(
      "db/products.json",
      JSON.stringify(mockData),
      expect.any(Function)
    );

    expect(consoleLogMock).toHaveBeenCalledTimes(1);
  });

  it("должна обрабатывать ошибку при записи в файл и не вызывать console.log из блока try", async () => {
    const errorMessage = "Write error";

    mockWriteFile.mockImplementationOnce((path, content, callback) => {
      callback(new Error(errorMessage));
    });

    const consoleLogMock = jest
      .spyOn(console, "log")
      .mockImplementationOnce(() => {});

    cacheData(mockData);

    expect(fs.writeFile).toHaveBeenCalledWith(
      "db/products.json",
      JSON.stringify(mockData),
      expect.any(Function)
    );

    expect(consoleLogMock).toHaveBeenCalledTimes(2);
  });
});
