export const addThousandSeparator = (number) =>
  Array.from(String(number))
    .reverse()
    .map((n, i, arr) =>
      (i + 1) % 3 === 0 && i < arr.length - 1 ? `.${n}` : n
    )
    .reverse()
    .join('')
