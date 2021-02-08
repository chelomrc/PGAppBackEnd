const User = require('../models/user')
const readCsv = require('../utils/importcsv');


const getUsers = async ( req, res ) => {

    const desde = Number(req.query.desde) || 0;
    const limit = Number(req.query.limit) || 0;

    const [ users, total ] = await Promise.all([
        User.find()
            .skip( desde )
            .limit( limit ),
        User.countDocuments(),
    ])
                                
    res.json({
        ok: true,
        users,
        total
    })
}

const getUserById = async ( req, res ) => {
    const { id } = req.params

    try {
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })    
        }
        res.json({
            ok: true,
            user
        })                
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error reading User'
        })
    }

}

const deleteUser = async ( req, res ) => {
    const { id } = req.params

        try {
        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        }

        await User.findByIdAndDelete( id )
        
        res.json({
            ok: true,
            msg: 'User deleted'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error Deleting User'
        })
    }
}

const updateUser = async ( req, res ) => {
    const { id } = req.params

    try {
        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        }

        const changesUser = {
            ...req.body
        }
        const userUpdated = await User.findByIdAndUpdate( id, changesUser, {new: true, useFindAndModify: false})
        
        res.json({
            ok: true,
            user: userUpdated
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error updating User'
        })
    }
}

const addUser = async ( req, res ) => {

    const { SubscriberID } = req.body
    const user = new User({
        ...req.body,
        _id: req.body.SubscriberID
    });
    try {        
        const tempUser = await User.findById(SubscriberID);
        if(tempUser){
            return res.status(404).json({
                ok: false,
                msg: 'SubscriberID is already in use'
            })
        }
        await user.save();
        res.json({
            ok: true,
            user
        })        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error creating User'
        })
    }
}

const importCsv = async ( req, res ) => {
       
    await readCsv().then((data) => {
        User.insertMany( data )
            .then(function(){ 
                console.log("Data inserted") 
                res.json({
                    ok: true,
                    msg: "Datos importados Correctamente"
                })
            }).catch(function(error){ 
                res.json({
                    ok: false,
                    msg: error
                })
            }); 
    });
}

module.exports = {
    getUsers,
    addUser,
    importCsv,
    getUserById,
    updateUser,
    deleteUser
}