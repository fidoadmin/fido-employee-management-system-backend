import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config/index";

import { AuthController } from "./middleware/AuthController";
import { AuthenticationController } from "./controller/AuthenticationController";
import { BranchController } from "./controller/BranchController";
import { CategoryController } from "./controller/CategoryController";
import { CompanyController } from "./controller/CompanyController";
import { PasswordChangeRequestController } from "./controller/PasswordChangeRequestController";
import { UserController } from "./controller/UserController";
import { InventoryController } from "./controller/InventoryController";
import { DashboardController } from "./controller/DashboardController";
import { InventoryDescriptionController } from "./controller/InventoryDescriptionController";
import { ReportController } from "./controller/ReportController";
import { BarcodeController } from "./controller/BarcodeController";
import { ClientController } from "./controller/ClientController";
import { CompanyTypeController } from "./controller/CompanyTypeController";
import { RoleController } from "./controller/RoleController";

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

function auth(req, res, next) {
  new AuthController().CheckAccessToken(req, res, next);
}

router.get("/ping", (req, res) => { res.send("Inventory Management System!");});

router.post("/login", (req, res) =>  new AuthenticationController().Login(req, res));
router.put("/logout", auth, (req, res) => new AuthenticationController().Logout(req, res));


router.get("/branches", auth, (req, res) =>  new BranchController().GetBranches(req, res));
router.post("/branches", auth, (req, res) =>  new BranchController().UpsertBranch(req, res));
router.delete("/branches/:Id", auth, (req, res) =>  new BranchController().DeleteBranch(req, res));

router.get("/categories", auth, (req, res) =>  new CategoryController().GetCategories(req, res));
router.post("/categories", auth, (req, res) =>  new CategoryController().UpsertCategory(req, res));
router.delete("/categories/:Id", auth, (req, res) => new CategoryController().DeleteCategory(req, res));


router.get("/companies", auth, (req, res) =>  new CompanyController().GetCompanies(req, res));
router.post("/companies", auth, (req, res) =>  new CompanyController().UpsertCompany(req, res));
router.delete("/companies/:Id", auth, (req, res) => new CompanyController().DeleteCompany(req, res));

router.get("/companytypes", auth, (req, res) =>  new CompanyTypeController().GetCompanyTypes(req, res));


router.get("/clients", auth, (req, res) =>  new ClientController().GetClients(req, res));
router.post("/clients", auth, (req, res) =>  new ClientController().UpsertClient(req, res));

router.post("/resetpassword", (req, res) =>  new PasswordChangeRequestController().AddPasswordChangeRequest(req, res));
router.put("/verifypassword/:Id", (req, res) =>  new PasswordChangeRequestController().VerifyAndUpdatePassword(req, res));



router.get("/roles", auth, (req, res) =>  new RoleController().GetRoles(req, res));
router.post("/roles", auth, (req, res) =>  new RoleController().UpsertRole(req, res));
router.delete("/roles/:Id", auth, (req, res) =>  new RoleController().DeleteRole(req, res));

router.get("/users",  (req, res) =>  new UserController().GetUsers(req, res));
router.post("/users",  (req, res) =>  new UserController().UpsertUser(req, res));
router.delete("/users/:Id",  (req, res) =>  new UserController().DeleteUser(req, res));
router.get("/users/profile/:Id",  (req, res) =>  new UserController().GetUserProfile(req, res));
router.post("/users/profile/changepassword",  (req, res) =>  new UserController().UpdatePassword(req, res));




app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
