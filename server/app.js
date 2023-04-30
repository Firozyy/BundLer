import  express  from "express";
import dotenv from 'dotenv';
import ErrerMiddleware from './midlewares/errer.js'
import cookieparser from "cookie-parser"
import path from "path"
import {fileURLToPath} from 'url'
// import cors from  'cors'


const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename)

dotenv.config({path:'./config/.env'});

const app= express();

// const _dirname = path.dirname('')
// const buildpath = path.join(_dirname ,"../cousebundler/build/") ;


// app.use(express.static(buildpath))

// app.get('/',function( req, res)  {
//     res.sendFile(path.join(buildpath,"/index.html"));

// })

//
// const __dirname = path.dirname('')
const buildPath = path.join(__dirname, '../cousebundler/build/');
// console.log(buildPath,"dadadsadasd");
const indexPage = path.join(buildPath, '/index.html');

app.use(express.static(buildPath));



app.get('/', (req,res)=>{
    res.sendFile(indexPage);
});

//cors platform

// app.use(cors({
//     origin:process.env.frontend_url,
//     credentials:true,
//     methods:["GET","POST","DELETE","PUT",]

// }))

app.use(cookieparser());

//using midleares
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
//importing use routes &routes
import course from './routes/courseRoute.js';
import user from './routes/userRoutes.js';
import payment from './routes/paymentRout.js'
import other from './routes/othertRoutes.js'
app.use("/api/v1",course);
app.use("/api/v1",user);
app.use("/api/v1",payment);
app.use("/api/v1",other);
export default app;
//import 
app.use(ErrerMiddleware);