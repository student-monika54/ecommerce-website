import { useEffect, useMemo, useState } from 'react';
import { login as loginRequest } from '../services/authService';
import { persistAuthSession } from '../utils/authStorage';

const initialFormState = {
  email: '',
  password: '',
  rememberMe: true,
};

function validateEmail(email) {
  if (!email.trim()) {
    return 'Email is required.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.trim())) {
    return 'Enter a valid email address.';
  }

  return '';
}

function validatePassword(password) {
  if (!password) {
    return 'Password is required.';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  return '';
}

function getFieldError(fieldName, formState) {
  if (fieldName === 'email') {
    return validateEmail(formState.email);
  }

  if (fieldName === 'password') {
    return validatePassword(formState.password);
  }

  return '';
}

function Login() {
  const [formState, setFormState] = useState(initialFormState);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [serverMessageType, setServerMessageType] = useState('');

  useEffect(() => {
    document.title = 'ShopEase | Login';

    return () => {
      document.title = 'ShopEase';
    };
  }, []);

  const hasVisibleFieldError = useMemo(
    () => Boolean(fieldErrors.email || fieldErrors.password),
    [fieldErrors.email, fieldErrors.password],
  );

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    const nextValue = type === 'checkbox' ? checked : value;

    setFormState((currentState) => ({
      ...currentState,
      [name]: nextValue,
    }));

    setServerMessage('');
    setServerMessageType('');

    if (name === 'email' || name === 'password') {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        [name]: getFieldError(name, {
          ...formState,
          [name]: nextValue,
        }),
      }));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouchedFields((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));

    if (name === 'email' || name === 'password') {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        [name]: getFieldError(name, formState),
      }));
    }
  };

  const validateForm = () => {
    const nextErrors = {
      email: validateEmail(formState.email),
      password: validatePassword(formState.password),
    };

    setFieldErrors(nextErrors);
    setTouchedFields({
      email: true,
      password: true,
    });

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateForm();
    const hasErrors = Boolean(nextErrors.email || nextErrors.password);

    if (hasErrors) {
      setServerMessage('Please fix the highlighted fields before continuing.');
      setServerMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setServerMessage('');
    setServerMessageType('');

    try {
      const response = await loginRequest(formState);

      persistAuthSession({
        token: response.token,
        user: response.user,
        rememberMe: formState.rememberMe,
      });

      setServerMessageType('success');
      setServerMessage('Login successful. Redirecting you now.');

      window.location.assign('/');
    } catch (error) {
      setServerMessageType('error');
      setServerMessage(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-panel auth-panel--intro">
        <div className="auth-intro">
          <p className="auth-eyebrow">Secure member access</p>
          <h1>Sign in to continue your ShopEase experience.</h1>
          <p className="auth-intro__description">
            Return to saved carts, faster checkout, and order history with a
            login screen designed for clarity on every device.
          </p>

          <div className="auth-highlights" aria-hidden="true">
            <div className="auth-highlight">
              <strong>Responsive by design</strong>
              <span>Optimized for phones, tablets, and larger screens.</span>
            </div>
            <div className="auth-highlight">
              <strong>Graceful failure states</strong>
              <span>Validation and server errors are shown inline.</span>
            </div>
            <div className="auth-highlight">
              <strong>Token-aware auth flow</strong>
              <span>Backend-ready with a mock fallback for local development.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="auth-panel auth-panel--form">
        <div className="auth-form-shell">
          <a className="auth-back-link" href="/">
            Back to ShopEase
          </a>

          <div className="auth-card">
            <p className="auth-eyebrow">Welcome back</p>
            <h2>Login to your account</h2>
            <p className="auth-description">
              Use your email and password to continue. Fields are validated in
              real time and before submission.
            </p>

            {serverMessage ? (
              <p className={`auth-status auth-status--${serverMessageType}`} role="alert">
                {serverMessage}
              </p>
            ) : null}

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <fieldset className="auth-fieldset" disabled={isSubmitting}>
                <label className="auth-field" htmlFor="login-email">
                  <span>Email address</span>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    value={formState.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(
                      fieldErrors.email && (touchedFields.email || hasVisibleFieldError),
                    )}
                    aria-describedby={fieldErrors.email ? 'login-email-error' : undefined}
                  />
                  {fieldErrors.email && (touchedFields.email || hasVisibleFieldError) ? (
                    <span className="auth-field-error" id="login-email-error" role="alert">
                      {fieldErrors.email}
                    </span>
                  ) : null}
                </label>

                <label className="auth-field" htmlFor="login-password">
                  <span>Password</span>
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={formState.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(
                      fieldErrors.password && (touchedFields.password || hasVisibleFieldError),
                    )}
                    aria-describedby={fieldErrors.password ? 'login-password-error' : undefined}
                  />
                  {fieldErrors.password && (touchedFields.password || hasVisibleFieldError) ? (
                    <span className="auth-field-error" id="login-password-error" role="alert">
                      {fieldErrors.password}
                    </span>
                  ) : null}
                </label>

                <div className="auth-row">
                  <label className="auth-checkbox" htmlFor="login-remember-me">
                    <input
                      id="login-remember-me"
                      name="rememberMe"
                      type="checkbox"
                      checked={formState.rememberMe}
                      onChange={handleChange}
                    />
                    <span>Remember me</span>
                  </label>

                  <a className="auth-link" href="mailto:support@shopease.com?subject=Password%20reset">
                    Forgot Password?
                  </a>
                </div>

                <button className="button button--primary auth-submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing in...' : 'Login'}
                </button>
              </fieldset>
            </form>

            <p className="auth-footnote">
              TODO: connect this screen to the production auth cookie flow when the backend endpoint is available.
              For now, the app uses a backend-aware service with a local mock fallback.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;