const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, username, email } });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User does not exist' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, username: user.username, email } });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Upload ProfileImage
exports.uploadImage = async (req, res) => {
  const { imageUrl, _id, bioInput} = req.body;
  
  try {
    const user = await User.findOneAndUpdate(
      { _id },{
        $set: {imageUrl, bioInput},
      },
      {new:true}
    );

    if(!user) {
      return res.status(404).send('User not found.')
    }
    res.status(200).json(user);
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

// User Info
exports.profileInfo = async(req, res) => {
  const id = req.params.id;
  try {
    const data = await User.findOne({"_id":id});
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
}
