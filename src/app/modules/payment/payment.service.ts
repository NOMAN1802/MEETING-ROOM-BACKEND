/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { join } from 'path';
import { verifyPayment } from './payment.utils';
import { readFileSync } from 'fs';
import { Booking } from '../Booking/booking.model';

const confirmationService = async (transactionId: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let result;
  let message = '';
  let templateFile = '';

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    result = await Booking.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: 'paid',
        isConfirmed: 'confirmed',
      },
    );
    message = 'Successfully Paid!';
    templateFile = 'payment-success.html';
  } else {
    message = 'Payment Failed!';
    templateFile = 'payment-failed.html';
  }

  const filePath = join(__dirname, '../../../../public', templateFile);
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', message);

  return template;
};

export const paymentServices = {
  confirmationService,
};
