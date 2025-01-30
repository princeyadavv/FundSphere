const express = require('express');
const multer = require('multer');
const {createAndProcessPost } = require('../controllers/content');
const { fundingRound, fundingdata, sectorDistribution, investorParticipation, regionFunding, topPerformingCompanies } = require('../services/functions');
const { getDataFromDatabase,newfundingdata,newfundingRound,newinvestorParticipation,newsectorDistribution,newtopPerformingCompanies,newregionFunding } = require('../services/newfunction');

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Routes for file upload and post creation
router.post('/create',upload.single("file"), createAndProcessPost);

// API routes for various data analyses


router.get('/api/fundingdata', async(req, res) => {
    console.log("request aagyi")
    const { id } = req.query;  // Extracting id from query params
    const data =  await getDataFromDatabase(id);
    const result = fundingdata(data);
    res.status(200).json(result);
});

router.get('/api/sector-distribution', async(req, res) => {
    const { id } = req.query;  // Extracting id from query params
    const data = await getDataFromDatabase(id);
    const result = sectorDistribution(data);
    res.json(result);
});

router.get('/api/top-companies', async(req, res) => {
    const { id } = req.query;  // Extracting id from query params
    const data = await getDataFromDatabase(id);
    const result = topPerformingCompanies(data);
    res.json(result);
});

router.get('/api/funding-round', async(req, res) => {
    const { id } = req.query;  // Extracting id from query params
    const data = await getDataFromDatabase(id);
    const result = fundingRound(data);
    res.json(result);
});

router.get('/api/region-funding', async(req, res) => {
    const { id } = req.query;  // Extracting id from query params
    const data = await getDataFromDatabase(id);
    const result = regionFunding(data);
    res.json(result);
});

router.get('/api/investor-participation', async(req, res) => {
    const { id } = req.query;  // Extracting id from query params
    const data = await getDataFromDatabase(id);
    const result = investorParticipation(data);
    res.json(result);
});
router.get('/api/fundingdata/data', async(req, res) => {
    console.log("request aagyi")
    const id = req.query.id;  // Extracting id from query params
    console.log(id)
        const year = req.query.year
    const city = decodeURI(req.query.region)
    const round = decodeURI(req.query.round)
    const sector = decodeURI(req.query.sector)
    const data =  await getDataFromDatabase(id);
    console.log("data ==")
    console.log(data)
    const result = newfundingdata(data,year,round,sector,city);
    console.log(result)
    res.status(200).json(result);
});

router.get('/api/sector-distribution/data', async(req, res) => {
    const { id } = req.query;  // Extracting id from query params
        const year = req.query.year
    const city = decodeURI(req.query.region)
    const round = decodeURI(req.query.round)
    const sector = decodeURI(req.query.sector)
    const data = await getDataFromDatabase(id);
    const result = newsectorDistribution(data,year,round,sector,city);
    res.json(result);
});

router.get('/api/top-companies/data', async(req, res) => {
    const { id } = req.query;  // Extracting id from query params
        const year = req.query.year
    const city = decodeURI(req.query.region)
    const round = decodeURI(req.query.round)
    const sector = decodeURI(req.query.sector)
    const data = await getDataFromDatabase(id);
    const result = newtopPerformingCompanies(data,year,round,sector,city);
    res.json(result);
});

router.get('/api/funding-round/data', async(req, res) => {
    const { id } = req.query;  // Extracting id from query params
        const year = req.query.year
    const city = decodeURI(req.query.region)
    const round = decodeURI(req.query.round)
    const sector = decodeURI(req.query.sector)
    const data = await getDataFromDatabase(id);
    const result = newfundingRound(data,year,round,sector,city);
    res.json(result);
});

router.get('/api/region-funding/data', async(req, res) => {
    const { id } = req.query;  // Extracting id from query params
        const year = req.query.year
    const city = decodeURI(req.query.region)
    const round = decodeURI(req.query.round)
    const sector = decodeURI(req.query.sector)
    const data = await getDataFromDatabase(id);
    const result = newregionFunding(data,year,round,sector,city);
    res.json(result);
});

router.get('/api/investor-participation/data', async(req, res) => {
    const { id } = req.query;  // Extracting id from query params
        const year = req.query.year
    const city = decodeURI(req.query.region)
    const round = decodeURI(req.query.round)
    const sector = decodeURI(req.query.sector)
    const data = await getDataFromDatabase(id);
    const result = newinvestorParticipation(data,year,round,sector,city);
    res.json(result);
});

module.exports = router;
