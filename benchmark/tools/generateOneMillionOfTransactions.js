const fs = require('fs')
const faker = require('faker')

function generateOneMillionOfTransactions() {
    const data = []

    for (let i = 1; i <= 1_000_000; i++) {
        data.push(faker.helpers.createTransaction())
        if (i % 10_000 === 0) {
            console.log(`[${new Date().toISOString()}] Generated ${i} transactions.`)
        }
    }
    
    return data
}

module.exports = { generateOneMillionOfTransactions}

