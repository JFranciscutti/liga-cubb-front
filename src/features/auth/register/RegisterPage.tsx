import { Helmet } from 'react-helmet-async';
import { APP_NAME } from 'src/config';
import Register from './Register';
// sections

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Register | {APP_NAME}</title>
      </Helmet>

      <Register />
    </>
  );
}
