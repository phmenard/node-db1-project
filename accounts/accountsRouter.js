const express = require('express');
const accountsDb = require('../accounts/acountsDb');

const { validateAccountId } = require('../middleware/accounts');
const accounts = require('../middleware/accounts');

const router = express.Router();

// get all accounts
router.get('/', async (req, res, next) => {
    try {
        const accounts = await accountsDb.get();
        res.status(201).json(accounts);

    } catch (err) {
        next(err);
    }
})

// get an account by id
router.get('/:id', async (req, res, next) => {
    try {
        const account = await accountsDb.getById(req.params.id);
        if (!account) {
            res.status(404).json({ message: "invalid account id" });
        } else {
            res.status(200).json(account);
        }

    } catch (err) {
        next(err);
    }
})

// get an account by name
router.get('/account/:name', async (req, res, next) => {
    try {
        const account = await accountsDb.getByName(req.params.name);
        if (!account) {
            res.status(404).json({ message: `no account found with the name ${req.params.name}` });
        } else {
            res.status(200).json(account);
        }

    } catch (err) {
        next(err);
    }
})

// add a new account
router.post('/', async(req, res, next) => {
    try{
        const account = await accountsDb.insert(req.body);
        res.status(200).json(account);
    }catch(err){
        next(err);
    }
})

// update an account 
router.put('/:id', async(req, res, next) =>{
    try{
        const account = await accountsDb.update(req.params.id, req.body);
        res.status(200).json(account);
        
        
    }catch(err){
        next(err);
    }
})

// remove am account
router.delete('/:id', async(req, res, next) =>{
    try{
        const account = await accountsDb.remove(req.params.id);
        if (account) { res.status(200).json({ message: "user removed" }); }
    }catch(err){
        next(err);
    }
})


module.exports = router
