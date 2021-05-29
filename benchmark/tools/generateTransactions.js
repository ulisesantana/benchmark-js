const faker = require('faker')

function generateTransactions(amountOfTransactions) {
    const data = []

    for (let i = 1; i <= amountOfTransactions; i++) {
        data.push(faker.helpers.createTransaction())
        if (i % 10_000 === 0) {
            console.log(`[${new Date().toISOString()}] Generated ${i} transactions.`)
        }
    }
    
    return data
}

module.exports = { generateTransactions}

