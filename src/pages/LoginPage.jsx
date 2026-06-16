import { useDocumentTitle } from '../hooks/useDocumentTitle';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  useDocumentTitle('Login');

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
