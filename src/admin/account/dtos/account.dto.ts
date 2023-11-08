export class UpdateAdminProfileDTO {
  name: string;
  mobile: string;
  email: string;
}

export class ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}
