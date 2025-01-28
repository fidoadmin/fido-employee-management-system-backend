import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config/index";
import { ClientController } from "./controller/ClientController";
import { CompanyController } from "./controller/CompanyController";
import { DepartmentController } from "./controller/DepartmentController";
import { RoleController } from "./controller/RoleController";
import { PositionController } from "./controller/PositionController";
import { AuthenticationController } from "./controller/AuthenticationController";
import { AuthController } from "./middleware/AuthController";
const sequelize = require("./connect/index");
const app = express();
const port = config.port || 7000;
const router = express.Router();
app.use(bodyParser.json());

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://10.10.1.119:3004",
    "http://10.10.1.117:3000",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Referer",
    "User-Agent",
    "authkey",
  ],
  exposedHeaders: ["x-page-totalcount"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


router.get("/hello", (req, res) => {
  res.send("Inventory Management System!");
});


function auth(req, res, next) {
new AuthController().CheckAccessToken(req, res, next);
}


// Login
router.post('/login',(req,res)=>new AuthenticationController().Login(req,res))
router.put('/logout',(req,res)=>new AuthenticationController().Logout(req,res))

// Clients
router.get("/clients", auth,(req, res) =>  new ClientController().GetClients(req, res));
router.post("/client",auth, (req, res) =>new ClientController().UpsertClient(req, res));
router.delete("/client/:id",auth,(req,res)=>new ClientController().DeleteClient(req,res))

// company
router.get("/companies",auth, (req, res) =>new CompanyController().GetCompanies(req, res));
router.post("/company", auth,(req, res) =>new CompanyController().UpsertCompany(req, res));

// Department Routes
router.get("/departments", (req, res) => new DepartmentController().GetDepartments(req, res))
router.post("/department", (req, res) => new DepartmentController().UpsertDepartment(req, res));
router.delete("/department/:id", (req, res) =>new DepartmentController().DeleteDepartment(req, res));

// FOR ROLES
router.get("/roles",auth, (req, res) => new RoleController().GetRoles(req, res));
router.post("/role",auth, (req, res) => new RoleController().UpsertRole(req, res));
router.delete("/role/:id", auth,(req, res) =>new RoleController().DeleteRole(req, res));


// Positions Routes
router.get("/positions",auth, (req, res) =>new PositionController().GetPositions(req, res));
router.post("/position", auth,(req, res) =>new PositionController().UpsertPosition(req, res));
router.delete("/position/:id",auth, (req, res) =>new PositionController().DeletePosition(req, res));

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
