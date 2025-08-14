export interface SignupData {
  // Step 1
  name: string;
  email: string;
  // Step 2
  password: string;
  confirmPassword: string;
  phoneNo: string;
  age?: number;
  profileImageUrl?: string;
}
