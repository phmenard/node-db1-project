// DB helper file used in the accounts router
const db = require('../data/dbConfig');

// get all accounts
function get() {
    return db('accounts');
}

// get an account by it's id
function getById(id) {
    return db('accounts')
        .where({ id })
        .first();
}

// get an account by the account holders name  
function getByName(name) {
    return db('accounts')
        .where('name', name)
        .first();

}

// get an account if buget is greater than or = to given budget  
function getByBudget(budget) {
    return db('accounts')
        .where('budget', '>=', budget)


}

// create a new account
function insert(account) {
    return db('accounts')
        .insert(account)
        .then(ids => {
            return getById(ids[0]);
        });
}

// update an existing account
function update(id, changes) {
    return db('accounts')
        .where({ id })
        .update(changes);
}

// remove an account
function remove(id) {
    return db('accounts')
        .where('id', id)
        .del();
}

module.exports = {
    get,
    getByName,
    getById,
    insert,
    update,
    remove,
    getByBudget
};