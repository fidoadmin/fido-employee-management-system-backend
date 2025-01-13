import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config/index";
import { ClientController } from "./controller/ClientController";
import { CompanyController } from "./controller/CompanyController";
import { DepartmentController } from "./controller/DepartmentController";
import { RoleController } from "./controller/RoleController";
import { PositionController } from "./controller/PositionController";



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

router.get

router.get("/ping", (req, res) => { res.send("Inventory Management System!");});

router.get('/clients',(req,res)=> new ClientController().GetClients(req,res))
router.get('/client/:guid',(req,res)=>new ClientController().GetClient(req,res))
router.delete('/client/:guid',(req,res)=>new ClientController().DeleteClient(req,res))


router.post('/client',(req,res)=>new ClientController().UpsertClient(req,res))
router.get("/companies", (req, res) => new CompanyController().GetCompanies(req, res));
router.get("/company/:guid", (req, res) =>new CompanyController().GetCompany(req, res));
router.post("/company", (req, res) => new CompanyController().UpsertCompany(req, res))


// Department Routes
router.get("/departments", (req, res) => new DepartmentController().GetDepartments(req, res))
router.post("/department", (req, res) => new DepartmentController().UpsertDepartment(req, res));
router.delete("/department/:id", (req, res) =>new DepartmentController().DeleteDepartment(req, res));
router.get("/department/:guid", (req, res) => new DepartmentController().GetDepartment(req, res));

// FOR ROLES

router.get("/roles", (req, res) => new RoleController().GetRoles(req, res));
router.post("/role", (req, res) => new RoleController().UpsertRole(req, res));
router.delete("/role/:guid", (req, res) => new RoleController().DeleteRole(req, res));
router.get("/role/:guid", (req, res) => new RoleController().GetRole(req, res));
// Company Routes
// router.post("/company", (req, res) =>
//   companyController.UpsertCompany(req, res)
// );
// router.get("/companies", (req, res) =>
//   companyController.GetCompanies(req, res)
// );
// router.delete("/company/:guid", (req, res) =>
//   companyController.DeleteCompany(req, res)
// );
// router.get("/company/:guid", (req, res) =>
//   companyController.GetCompany(req, res)
// );

// Positions Routes
router.get("/positions", (req, res) =>new PositionController().GetPositions(req, res))
router.post("/position", (req, res) =>new PositionController().UpsertPosition(req, res))
router.get("/position/:guid", (req, res) =>new PositionController().GetPosition(req, res))
router.delete("/position/:guid", (req, res) =>new PositionController().DeletePosition(req, res))

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
