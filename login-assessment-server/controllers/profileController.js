const mockProfile = require('../mock_data/mockData');

const getProfile = (req, res) => {
    res.json({
        status: true,
        profile: {
            fullName: mockProfile.fullName,
            dateOfBirth: mockProfile.dateOfBirth,
            email: mockProfile.email,
            phone: mockProfile.phone
        }
    })
};

const updateProfile = (req, res) => {
    const fullname = req.body.fullName;
    const dateOfBirth = req.body.dateOfBirth;
    const email = req.body.email;
    const phone = req.body.phone;

    // Missing information
    if (fullname === '' || dateOfBirth === '' || email === '' || phone === ''){
        res.json({
            status: false,
            message: 'Missing required field(s)!'
        })
    }
    // Invalid email
    else if (!(email.toLowerCase()
    .match(
        /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    ))){
        res.json({
            status: false,
            message: 'Email is invalid!'
        })
    }
    // Invalid phone number
    else if (!(phone.match(
        /^[0-9\-\+]{10}$/
    ))){
        res.json({
            status: false,
            message: 'Phone is invalid!'
        })
    }
    // OK, update
    else {
        mockProfile.fullName = fullname;
        mockProfile.dateOfBirth = dateOfBirth;
        mockProfile.email = email;
        mockProfile.phone = phone;

        res.json({
            status: true,
            message: 'Update success'
        })
    }
};

module.exports = {
    getProfile,
    updateProfile
}