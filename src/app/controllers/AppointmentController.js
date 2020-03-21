import * as Yup from 'yup';
import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentControlller {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { provider_id, date } = req.body;

    /**
     * check if provider_id is provider
     */

    const isProcider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProcider) {
      return res
        .status(401)
        .json({ error: 'You can only creat appointments with providers' });
    }

    const {
      id,
      user_id,
      date: dateSave,
      provider_is,
      canceled_at,
    } = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });
    return res
      .status(201)
      .json({ id, user_id, provider_is, dateSave, canceled_at });
  }
}
export default new AppointmentControlller();
