import { CompanyService } from './../services/CompanyServices';
import { Request, Response } from "express";
import { CompanyMapper } from "../mapper/CompanyMapper";

export class CompanyController {


  async GetCompanies(req: Request, res: Response): Promise<void> {
    try {
      const companyService = new CompanyService();
      const companies = await companyService.GetCompanies();
  
      if (companies.length === 0) {
        res.status(404).json({ Message: "No companies" });
        return; // Stop further execution
      }
  
      res.status(200).json(companies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ Error: "Internal Server Error" });
    }
  }
  

  // Get a single company by GUID
  async GetCompany(req: Request, res: Response): Promise<void> {
    try {
      const companyGUID = req.params.guid;

      // Validate GUID
      if (!companyGUID || companyGUID.trim() === "") {
        res.status(400).json({ message: "Guid is required" });
        return;
      }

      const companyService = new CompanyService();
      const companyData = await companyService.GetCompany(companyGUID);

      // Check if company data is found
      if (!companyData) {
        res.status(404).json({ message: "Company not found" });
        return;
      }

      const companyMapper = new CompanyMapper();
      const mappedCompany = companyMapper.ModelToDto(companyData);

      // Return the mapped company data
      res.status(200).json(mappedCompany);
    } catch (error) {
      console.error("Error fetching company:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Upsert (create or update) a company
  async UpsertCompany(req: Request, res: Response): Promise<void> {
    try {
      const companyData = req.body;
  
      // Validate required fields
      if (
        !companyData.Name ||
        !companyData.Address ||
        !companyData.EmailAddress ||
        !companyData.PhoneNumber ||
        !companyData.PAN ||
        !companyData.ClientId // Validate client ID
      ) {
        res.status(422).json({ error: "All fields are required, including ClientId." });
        return;
      }
  
      const companyService = new CompanyService();
      const companyMapper = new CompanyMapper();
      const mappedCompany = companyMapper.DtoToModel(companyData);
  
      // Pass the mapped company data to the service
      const result = await companyService.UpsertCompany(mappedCompany);
  
      // Return the appropriate response
      if (result.error) {
        res.status(400).json(result); // Return error response
      } else {
        res.status(200).json(result); // Return success response
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  

  // Delete a company by GUID
  async DeleteCompany(req: Request, res: Response): Promise<void> {
    try {
      const companyGUID = req.params.guid;

      // Validate GUID
      if (!companyGUID || companyGUID.trim() === "") {
        res.status(400).json({ message: "Guid is required" });
        return;
      }

      const companyService = new CompanyService();
      const result = await companyService.DeleteCompany(companyGUID);

      // Return the appropriate response based on deletion result
      if (result) {
        res.status(200).json({ message: "Company deleted successfully" });
      } else {
        res.status(404).json({ message: "Company not found" });
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
