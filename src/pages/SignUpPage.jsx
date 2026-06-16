import { useDocumentTitle } from '../hooks/useDocumentTitle';
import AuthLayout from '../components/auth/AuthLayout';
import SignUpForm from '../components/auth/SignUpForm';

export default function SignUpPage() {
  useDocumentTitle('Sign Up');

  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
