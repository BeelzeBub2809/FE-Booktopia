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
                  <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div className="form-outline mb-4 d-flex flex-column text-start">
                  <label className="form-label" htmlFor="loginPassword">Password</label>
                  <input type="password" id="loginPassword" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
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
                  <label className="form-label" htmlFor="registerName">Name<span className="text-danger">*</span></label>
                  <input type="text" id="registerName" className="form-control" />
                </div>

                <div className="form-outline mb-4 d-flex flex-column text-start">
                  <label className="form-label" htmlFor="registerUsername">Username<span className="text-danger">*</span></label>
                  <input type="text" id="registerUsername" className="form-control" />
                </div>

                <div className="form-outline mb-4 d-flex flex-column text-start">
                  <label className="form-label" htmlFor="registerEmail">Email<span className="text-danger">*</span></label>
                  <input type="email" id="registerEmail" className="form-control" />
                </div>

                <div className="form-outline mb-4 d-flex flex-column text-start">
                  <label className="form-label" htmlFor="registerPassword">Password<span className="text-danger">*</span></label>
                  <input type="password" id="registerPassword" className="form-control" />
                </div>

                <div className="form-outline mb-4 d-flex flex-column text-start">
                  <label className="form-label" htmlFor="registerRepeatPassword">Repeat password<span className="text-danger">*</span></label>
                  <input type="password" id="registerRepeatPassword" className="form-control" />
                </div>

                <div className="form-outline mb-4 d-flex flex-column text-start">
                  <label className="form-label">Phone<span className="text-danger">*</span></label>
                  <input type="text" className="form-control" />
                </div>

                <div className="form-outline mb-4 d-flex flex-column text-start">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" />
                </div>

                <div className="form-check d-flex justify-content-center mb-4">
                  <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                    aria-describedby="registerCheckHelpText" />
                  <label className="form-check-label" htmlFor="registerCheck">
                    I have read and agree to the terms
                  </label>
                </div>

                <div className='d-flex justify-content-around'>
                  <button type="submit" className="btn btn-primary btn-block mb-3">Sign up</button>
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
