/* eslint-disable camelcase */
// utilizar sempre o formato de CLASSE
import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        date,
        provider_id,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date); // startOfHour = aqui faz com o que o agendamento seja feito apenas de hora em hora, ou seja, REGRA DE NEGÓCIO

        const findAppointmentInSameDate =
            await this.appointmentsRepository.findByDate(appointmentDate); // verificação por data, se ja tem algum agendamento naquela hora

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked!');
        }

        const appointment = await this.appointmentsRepository.create({
            // se não tiver, cria um novo agendamento
            provider_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
