import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
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

    /**
     * Check for past dates
     */
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ erro: 'Past dates are not permitted' });
    }

    /**
     * check date availability
     */
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    const { id, user_id, provider_is, canceled_at } = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });
    return res
      .status(201)
      .json({ id, user_id, provider_is, date, canceled_at });
  }
}
export default new AppointmentControlller();
