/* 
    Route:  /api/users
*/

const { Router } = require('express');
const { 
        getUsers, 
        addUser, 
        importCsv, 
        getUserById, 
        updateUser,
        deleteUser
} = require('../controllers/users');

const router = Router();

router.get( '/', getUsers );
router.get( '/:id', getUserById );
router.post( '/', addUser );
router.post( '/import', importCsv );
router.put( '/:id', updateUser );
router.delete( '/:id', deleteUser );




module.exports = router;