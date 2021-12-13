describe("组合", () => {
  const fn = jest.fn(() => "香")
  test("香 还是不 香", () => {
    const result = fn()
    expect(result == "香").toBe(true)
    expect(fn).toBeCalled()
  })
})