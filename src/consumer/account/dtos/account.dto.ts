export class UpdateConsumerProfileDTO {
  name: string;
  mobile: string;
  address: string;
  deliveryAddress: string;
}

export class ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}
