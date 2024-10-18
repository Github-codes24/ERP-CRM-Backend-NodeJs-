const { connectToMongoDB} = require("../config/db")
const CompanyModel = require("../models/company");

const companiesData = [
    {
      name: "Surgisol",
      address: "123 Medical Park Ave, San Francisco, CA 94103",
      industry: "Healthcare",
      founded: "2005-04-18",
      employees: 150,
      website: "https://www.surgisol.com"
    },
    {
      name: "Unisol",
      address: "456 Tech Road, Austin, TX 78701",
      industry: "Technology",
      founded: "2010-09-12",
      employees: 500,
      website: "https://www.unisol.com"
    },
    {
      name: "Envirosolution",
      address: "789 Greenway Blvd, Seattle, WA 98109",
      industry: "Environmental Services",
      founded: "1998-02-24",
      employees: 200,
      website: "https://www.envirosolution.com"
    },
    {
      name: "Ignitesphere",
      address: "321 Innovation St, Boston, MA 02110",
      industry: "Energy",
      founded: "2015-11-30",
      employees: 300,
      website: "https://www.ignitesphere.com"
    }
  ];

async function seedCompanies(req, res) {
    try {
        const companyCount = await CompanyModel.countDocuments();

        // If the collection is empty, insert companiesData
        if (companyCount === 0) {
            const result = await CompanyModel.insertMany(companiesData);
            
            // Return success response
            return res.status(200).json({
                status: true,
                message: "Company seeding successfull",
            });
        }
    } catch (error) {
      return res.status(500).json({status: false, message : error.message})
    }
};

async function getAllCompanies(req, res){
    try {
        const companies = await CompanyModel.find().select({name: 1});
        if(companies.length === 0){
            return res.status(400).json({message : "Failed to fetch companies"})
        }
        return res.status(200).json(companies);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
};

async function selectCompany(req, res){
    try {
        const {id} = req.body;
        const {name} = req.body;
        const company = await CompanyModel.findOne({ $or: [
            { _id: id },       // Match by id
            { name: name }     // Match by name (make sure `name` is passed in the request)
          ]});
        if (!company) {
          return res.status(404).json({ message: 'Company not found' });
        }
        // Define logic to select which MongoDB cluster to connect to
        let mongoURI;
        if (company.name === "Surgisol") {
            mongoURI = process.env.MONGO_URL2;
        }
        // else if (id === 'someConditionForCluster2') {
        // mongoURI = process.env.MONGO_CLUSTER_2;
        // } else {
        // return res.status(400).json({ message: 'Invalid condition for database switching' });
        // }
console.log("87", mongoURI)
        // Switch MongoDB connection to the selected cluster
        await connectToMongoDB(mongoURI);

        return res.status(200).json(company);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

async function getUsersByCompany(req, res){
  try {
    const companyId = req.params.companyId;

    const users = await User.find({ company: companyId }).populate('company');

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
    seedCompanies,
    getAllCompanies,
    selectCompany,
    getUsersByCompany,
}
