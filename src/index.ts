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
import { EmployeeController } from "./controller/EmployeeController";
import { CalenderController } from "./controller/CalenderController";
import { LeaveTypeController } from "./controller/LeaveTypeController";
import { CompanyHolidayController } from "./controller/CompanyHolidayController";
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


function auth(req, res, next) {new AuthController().CheckAccessToken(req, res, next);}


// Login
router.post('/login',(req,res)=>new AuthenticationController().Login(req,res))
router.put('/logout',(req,res)=>new AuthenticationController().Logout(req,res))

// Clients
router.get("/clients", auth,(req, res) =>  new ClientController().GetClients(req, res));
router.get("/clients", auth,(req, res) =>  new ClientController().GetClients(req, res));
router.post("/client",auth, (req, res) =>new ClientController().UpsertClient(req, res));
router.delete("/client/:Id",auth,(req,res)=>new ClientController().DeleteClient(req,res))

// company
router.get("/companies",auth, (req, res) =>new CompanyController().GetCompanies(req, res));
router.post("/company", auth,(req, res) =>new CompanyController().UpsertCompany(req, res));
router.delete("/company/:Id",auth,(req,res)=>new CompanyController().DeleteCompany(req,res))


// Department Routes
router.get("/departments",auth, (req, res) => new DepartmentController().GetDepartments(req, res));
router.post("/department",auth, (req, res) =>new DepartmentController().UpsertDepartment(req, res));
router.delete("/department/:Id", auth,(req, res) =>new DepartmentController().DeleteDepartment(req, res));


// FOR ROLES
router.get("/roles",auth, (req, res) => new RoleController().GetRoles(req, res));
router.post("/role",auth, (req, res) => new RoleController().UpsertRole(req, res));
router.delete("/role/:Id", auth,(req, res) =>new RoleController().DeleteRole(req, res));


// Positions Routes
router.get("/positions",auth, (req, res) =>new PositionController().GetPositions(req, res));
router.post("/position", auth,(req, res) =>new PositionController().UpsertPosition(req, res));
router.delete("/position/:Id",auth, (req, res) =>new PositionController().DeletePosition(req, res));

// Calender
router.get('/calander',auth,(req,res)=> new CalenderController().GetCalender(req,res))
router.post('/calander',auth,(req,res)=>new CalenderController().UpdateCalander(req,res));
router.get('/calanderspecific',auth,(req,res)=>new CalenderController().GetCalenderSpecific(req,res))

//  Employee
router.post("/staff",(req,res)=>new EmployeeController().UpsertEmployee(req,res))
router.get("/staffs",auth,(req,res)=>new EmployeeController().GetEmployees(req,res))
router.delete('/staff/:Id',auth,(req,res)=>new EmployeeController().DeleteEmployee(req,res))

// leave type 
router.post("/leavetype",auth,(req,res)=>new LeaveTypeController().UpsertLeaveType(req,res))
router.get("/leavetypes",auth,(req,res)=>new LeaveTypeController().GetLeaveTypes(req,res))
router.delete('/leavetype/:Id',auth,(req,res)=>new LeaveTypeController().DeleteLeaveType(req,res))

// Company 
// router.get("/companies",auth,(req,res)=>new CompanyController().UpsertCompany(req,res))
// router.post("/company",auth,(req,res)=>new CompanyController().UpsertCompany(req,res))

// Company Holiday
router.post('/companyholiday',auth,(req,res)=>new CompanyHolidayController().UpsertCompanyHoliday(req,res))
router.get('/companyholidays',auth,(req,res) => new CompanyHolidayController().GetCompanyHoliday(req,res))
router.delete('/companyholiday/:Id',auth,(req,res)=> new CompanyHolidayController().DeleteCompanyHoliday(req,res))





app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
