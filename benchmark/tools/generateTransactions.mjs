import faker from 'faker'

export function generateTransactions(amountOfTransactions) {
    const data = []

    for (let i = 1; i <= amountOfTransactions; i++) {
        data.push(faker.helpers.createTransaction())
    }

    return data
}
