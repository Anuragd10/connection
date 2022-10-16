import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import pool from './data/pgdb.js';

import detailsRoutes from './routes/details.js';
import userRouter from './routes/user.js';

const app = express();

//middleware
app.use(cors());
app.use(express.json());//req.body

//Database connection

pool.connect(function(err){
    if(err)
    {
        console.log(err);
    }
});

//ROUTES

app.use('/details', detailsRoutes);
app.use('/user', userRouter);
// app.post('/login', async(req, res) => {
//     const {username, password} = req.body;
    
//     try {
//         const loginuser = await pool.query('SELECT * FROM users WHERE username = $1', 
//             [username]
//         );
//         console.log(loginuser.rowCount);

//         if(loginuser.rowCount != 0){
//             const validPassword = await bcrypt.compare(
//                 password, loginuser.rows[0].password
//             );

//             if(!validPassword){
//                 res.json({status: 'error', error: 'Invalid Password'})
//             }
//             else{
//                 const token = jwt.sign(
//                     {
//                         username: req.body.username
//                     }, 
//                     'SECRET'
//                     )
//                     return res.json({status: 'ok', user: token})
//             }
//         }
//         else{
//             res.json({status: 'error', error: 'Username does not exist'})
//         }
//     } catch (err) {
//         console.error(err.message);        
//     }
// });

app.listen(5000, () =>{
    console.log('server has started on port 5000');
});

 