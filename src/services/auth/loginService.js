const login = async (userName, password) => {
  const formData = {
      userName: userName,
      password: password,
  };

  try {
      let response = await fetch('http://localhost:9999/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include',
      });
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      throw error;
  }
};

const register = async (userName, email, password, phone) => {
    const formData = {
        userName: userName,
        email: email,
        password: password,
        phone: phone,
    }
    try {
        let response = await fetch('http://localhost:9999/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include',
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Network response was not ok');
        }
  
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}



const getUserRoles = () => JSON.parse(localStorage.getItem('userRoles')) || []

const AuthService = {
  login,getUserRoles, register
};
export default AuthService;