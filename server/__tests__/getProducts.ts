import fs from "fs";
import { getProducts } from "../src/db";

jest.mock("fs");

describe("getProducts функция", () => {
  const mockData = '{"key": "value"}';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("должна возвращать данные из файла", () => {
    (fs.readFileSync as jest.Mock).mockReturnValueOnce(mockData);

    const result = getProducts();

    expect(fs.readFileSync).toHaveBeenCalledWith("db/products.json", "utf8");

    expect(result).toEqual(mockData);
  });

  it("должна возвращать null при ошибке чтения файла", () => {
    const errorMessage = "Read error";

    (fs.readFileSync as jest.Mock).mockImplementationOnce(() => {
      throw new Error(errorMessage);
    });

    const consoleLogMock = jest
      .spyOn(console, "log")
      .mockImplementationOnce(() => {});

    const result = getProducts();

    expect(fs.readFileSync).toHaveBeenCalledWith("db/products.json", "utf8");

    expect(consoleLogMock).toHaveBeenCalledWith(expect.any(Error));

    expect(result).toBeNull();
  });
});
