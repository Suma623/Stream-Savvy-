import { useMemo } from 'react';
import { FiMail, FiUser, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';

const Account = () => {
  const { user, hasCompletedPayment } = useAuth();

  const profile = useMemo(
    () => ({
      name: user?.fullName || 'StreamSavvy Member',
      email: user?.email || 'Not provided',
      status: hasCompletedPayment ? 'Active' : 'Incomplete'
    }),
    [user, hasCompletedPayment]
  );

  return (
    <div className="page page--account">
      <div className="page__content">
        <header className="page__header">
          <h1>Account Overview</h1>
          <p>View the core details associated with your StreamSavvy profile.</p>
        </header>

        <section className="card">
          <h2 className="card__title">Profile</h2>
          <ul className="card__list">
            <li>
              <FiUser />
              <span>
                <strong>Name:</strong> {profile.name}
              </span>
            </li>
            <li>
              <FiMail />
              <span>
                <strong>Email:</strong> {profile.email}
              </span>
            </li>
            <li>
              <FiCheckCircle />
              <span>
                <strong>Membership status:</strong> {profile.status}
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Account;
