import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(422).json({ error: 'User already exists' });
    }
    const user = await User.create(req.body);

    return res.status(201).json(user);
  }
}

export default new UserController();
