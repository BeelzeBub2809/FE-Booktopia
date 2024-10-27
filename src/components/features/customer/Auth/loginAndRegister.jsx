import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ValidatorsControl } from '../../../../utils/validators-control';
import { Rules } from '../../../../utils/rules';
import AuthService from '../../../../services/auth/loginService';


function LoginAndRegister() {
  // Define state to track the active tab (login or register)
  const [activeTab, setActiveTab] = useState('login');
  const navigation = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Register form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  let formControl = new ValidatorsControl({
    username: { value: username, validators: Rules.noValidate }, // Use username instead of email
    password: { value: password, validators: Rules.password },
  });
  const rolePriority = ['customer', 'marketer', 'sale', 'admin'];

  const handleRedirect = (roles) => {
    const highestRole = roles.reduce((highest, role) => {
      if (rolePriority.indexOf(role) > rolePriority.indexOf(highest)) {
        return role;
      }
      return highest;
    }, 'customer');

    switch (highestRole) {
      case 'customer':
        navigation('/');
        window.location.reload();
        break;
      case 'marketer':
        navigation('/marketer');
        window.location.reload();
        break;
      case 'sale':
        navigation('/sale');
        window.location.reload();
        break;
      case 'admin':
        navigation('/admin');
        window.location.reload();
        break;
      default:
        navigation('/');
        window.location.reload();
        break;
    }
  };

  const handleSubmitLoginForm = async (e) => {
    let isSubmit = formControl.submitForm(e);
    if (isSubmit) {
      try {
        const response = await AuthService.login(username, password);
        console.log(response);
        const roles = response.data.roles;
        localStorage.setItem('userRoles', JSON.stringify(roles));
        localStorage.setItem('userId', JSON.stringify(response.data.id));
        handleRedirect(roles);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    }
  };

  // Validate register form
  const validate = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/; // No whitespace allowed
    const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    const phoneRegex = /^0\d{9}$/; // 10 digits, starts with 0

    // Trim all input fields
    const trimmedData = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      repeatPassword: formData.repeatPassword.trim(),
      phone: formData.phone.trim()
    };

    // Username validation
    if (!trimmedData.username) {
      newErrors.username = "Username is required";
    }

    // Email validation
    if (!trimmedData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(trimmedData.email)) {
      newErrors.email = "Invalid email format. Please use only letters, numbers, dots (.), hyphens (-), and underscores (_) before the '@' symbol, followed by a domain name (e.g., example@domain.com). The domain must end with at least two letters (e.g., .com, .net).";
    }

    // Password validation
    if (!trimmedData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(trimmedData.password)) {
      newErrors.password = "Password must contain at least 8 characters, including letters and numbers, and no whitespace";
    }

    // Repeat password validation
    if (!trimmedData.repeatPassword) {
      newErrors.repeatPassword = "Please confirm your password";
    } else if (trimmedData.repeatPassword !== trimmedData.password) {
      newErrors.repeatPassword = "Passwords do not match";
    }

    // Phone validation for Vietnamese format
    if (!trimmedData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(trimmedData.phone)) {
      newErrors.phone = "Phone number must be 10 digits and start with 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmitRegisterForm = async (e) => {
    e.preventDefault();

    // Trim all input values
    const trimmedData = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      phone: formData.phone.trim()
    };

    // Update the formData with trimmed values
    setFormData((prevData) => ({
      ...prevData,
      ...trimmedData
    }));

    if (validate()) {
      let isSubmit = formControl.submitForm(e);
      if (isSubmit) {
        try {
          const response = await AuthService.register(trimmedData.username, trimmedData.email, trimmedData.password, trimmedData.phone);
          console.log(response);
          Swal.fire({
            title: 'Success',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      }
    }
  };


  return (
    <div className='container min-vh-100 position-relative'>
      <div className="container border border-primary shadow p-3 mb-5 bg-body rounded position-absolute top-50 start-50 translate-middle" style={{ width: '40%' }}>
        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
              role="tab"
              aria-controls="pills-login"
              aria-selected={activeTab === 'login'}>
              Login
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
              role="tab"
              aria-controls="pills-register"
              aria-selected={activeTab === 'register'}>
              Register
            </a>
          </li>
        </ul>

        <div className="tab-content">
          {/* Login Tab Content */}
          {activeTab === 'login' && (
            <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
              <form>
                <div className="text-center mb-3">
                  <p>Sign in with:</p>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google"></i>
                  </button>
                </div>

                <div className="form-outline mb-4 d-flex flex-column text-start">
                  <label className="form-label">User Name</label>
                  <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="form-outline mb-4 d-flex flex-column text-start">
                  <label className="form-label" htmlFor="loginPassword">Password</label>
                  <input type="password" id="loginPassword" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="row mb-4">
                  <div className="col-md-6 d-flex justify-content-center">
                    <div className="form-check mb-3 mb-md-0">
                      <input className="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                      <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
                    </div>
                  </div>

                  <div className="col-md-6 d-flex justify-content-center">
                    <a href="#!">Forgot password?</a>
                  </div>
                </div>

                <div className='d-flex justify-content-around'>
                  <button type="submit" className="btn btn-primary btn-block mb-4" onClick={(e) => handleSubmitLoginForm(e)}>Sign in</button>
                </div>
              </form>
            </div>
          )}

          {/* Register Tab Content */}
          {activeTab === 'register' && (
            <div className="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
              <form>
                <div className="text-center mb-3">
                  <p>Sign up with:</p>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google"></i>
                  </button>
                </div>

                <div className="form-outline mb-4 d-flex flex-column text-start">
                  <label className="form-label" htmlFor="username">Username<span className="text-danger">*</span></label>
                  <input type="text" id="username" className="form-control" value={formData.username} onChange={handleInputChange} />
                  {errors.username && <small className="text-danger">{errors.username}</small>}
                </div>

                <div className="form-outline mb-4 d-flex flex-column text-start">
                  <label className="form-label" htmlFor="email">Email<span className="text-danger">*</span></label>
                  <input type="email" id="email" className="form-control" value={formData.email} onChange={handleInputChange} />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className="form-outline mb-4 d-flex flex-column text-start">
                  <label className="form-label" htmlFor="password">Password<span className="text-danger">*</span></label>
                  <input type="password" id="password" className="form-control" value={formData.password} onChange={handleInputChange} />
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>

                <div className="form-outline mb-4 d-flex flex-column text-start">
                  <label className="form-label" htmlFor="repeatPassword">Repeat password<span className="text-danger">*</span></label>
                  <input type="password" id="repeatPassword" className="form-control" value={formData.repeatPassword} onChange={handleInputChange} />
                  {errors.repeatPassword && <small className="text-danger">{errors.repeatPassword}</small>}
                </div>

                <div className="form-outline mb-4 d-flex flex-column text-start">
                  <label className="form-label">Phone<span className="text-danger">*</span></label>
                  <input type="text" id="phone" className="form-control" value={formData.phone} onChange={handleInputChange} />
                  {errors.phone && <small className="text-danger">{errors.phone}</small>}
                </div>


                <div className='d-flex justify-content-around'>
                  <button type="submit" className="btn btn-primary btn-block mb-3" onClick={(e) => handleSubmitRegisterForm(e)}>Sign up</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginAndRegister;
