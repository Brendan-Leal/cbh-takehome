const { deterministicPartitionKey } = require("./dpk");

const mockDpk = jest.fn(deterministicPartitionKey)

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("accepts an event object with partitionKey property", () => {
    const key = mockDpk({
      partitionKey: "key"
    });

    expect(mockDpk).toHaveBeenCalledWith({ partitionKey: "key" })
  })

  it("returns a string when passed a number", () => {
    const key = deterministicPartitionKey(123)
    expect(typeof key).toBe("string")
  })

  it("returns a string when passed an object partition is also a string", () => {
    const key = deterministicPartitionKey({
      partitionKey: "123"
    })
    expect(typeof key).toBe("string")
  })

  it("returns a string when passed an object partition is a number", () => {
    const key = deterministicPartitionKey({
      partitionKey: 123
    })
    expect(typeof key).toBe("string")
  })

  it("Short keys don't get hashed with event object", () => {
    const key = deterministicPartitionKey({
      partitionKey: "Hello world"
    })
    expect(key).toBe("Hello world")
  })

  it("no event object hashes input", () => {
    const key = deterministicPartitionKey("hello world")
    expect(key).toBe("59c0d8f192e89d8bcc0c7411bdc2c3ee3d50b152b7b1e5e006c9e71e7e6a8b12343b0fe02be7091bac1d485ad2d76f7734a8be02b2495cfa3d11cae2fa5e4947")
  })

  it("Long inputs get hashed", () => {
    const key = deterministicPartitionKey(
      "this string is greater than 256 characters. Hello world! I hope this test works. Thanks for reading. My favorite movie is Blade Runner 2049 I think it's very cool. I like to read books. My favorite book is the Hitch Hikers Guide To The Galaxy. So long and thanks for all the fish"
    )
    expect(key).toBe(
      "89530a7ec76ebbbf88c01cb7805bd43c14d217c5d577a2bfa7ff867b5973d67a5c9572bb2ee3168676d00f930b14853a4506adaceee27137f085c723e71ff926"
    )
  })

  it("", () => {

  })

  it("", () => {

  })

  it("", () => {

  })
});
