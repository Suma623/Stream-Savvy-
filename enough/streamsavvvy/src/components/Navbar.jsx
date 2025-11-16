import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useMemo } from 'react';
import {
  FiSearch,
  FiSun,
  FiMoon,
  FiBell,
  FiUser,
  FiChevronDown,
  FiLogOut,
  FiCreditCard,
  FiDownload,
  FiSettings,
  FiHelpCircle,
  FiMic,
  FiMicOff,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { useNotifications } from '../context/NotificationContext.jsx';


const navLinks = [
  { to: '/', label: 'Home', exact: true },
  { to: '/movies', label: 'Movies' },
  { to: '/tv', label: 'TV Shows' },
  { to: '/watchlist', label: 'Watchlist' },
];

const Navbar = ({ onSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('streamsavvy_theme') || 'dark';
  });
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const recognitionRef = useRef(null);
  const { user, signOut } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();

  const displayName = useMemo(() => {
    if (user?.fullName) return user.fullName;
    if (user?.email) {
      const [name] = user.email.split('@');
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return 'StreamSavvy User';
  }, [user]);

  const initials = useMemo(() => displayName?.charAt(0)?.toUpperCase() || 'S', [displayName]);

  const profileMenuItems = useMemo(
    () => [
      { key: 'account', label: 'Account', Icon: FiUser },
      { key: 'subscription', label: 'Subscription', Icon: FiCreditCard },
      { key: 'downloads', label: 'Downloads', Icon: FiDownload },
      { key: 'settings', label: 'Settings', Icon: FiSettings },
      { key: 'help', label: 'Help Center', Icon: FiHelpCircle },
      { key: 'signout', label: 'Sign Out', Icon: FiLogOut, destructive: true },
    ],
    []
  );

  const notificationsToDisplay = useMemo(
    () => notifications.slice(0, 6),
    [notifications]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setQuery('');
    setMobileSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('streamsavvy_theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (notificationsOpen && unreadCount > 0) {
      markAllAsRead();
    }
  }, [notificationsOpen, unreadCount, markAllAsRead]);

  useEffect(() => {
    // Check if Web Speech API is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        onSearch?.(transcript.trim());
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        // Handle specific errors
        if (event.error === 'not-allowed') {
          alert('Microphone permission denied. Please allow microphone access to use voice search.');
        } else if (event.error === 'no-speech') {
          alert('No speech detected. Please try again.');
        } else {
          alert('Voice search failed. Please try again.');
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onSearch]);

  const handleProfileOptionClick = (key) => {
    setProfileOpen(false);
    switch (key) {
      case 'signout':
        signOut();
        navigate('/signin');
        break;
      case 'account':
        navigate('/account');
        break;
      case 'subscription':
        navigate('/subscription');
        break;
      case 'downloads':
        navigate('/downloads');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'help':
        navigate('/help');
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query.trim()) return;

    onSearch?.(query.trim());
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleVoiceClick = () => {
    if (!isSupported) {
      alert('Voice search is not supported in this browser. Please use a modern browser like Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  return (
    <header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${
        theme === 'dark' ? 'navbar--dark' : 'navbar--light'
      }`}
    >
      <div className="navbar__inner">
        <Link
          to="/"
          className="navbar__logo"
          onClick={() => {
            // Clear search when clicking logo
            if (location.pathname === '/') {
              onSearch?.('');
            }
          }}
        >
          <div className="navbar__logo-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="32"
                height="32"
                rx="6"
                fill="#E50914"
              />
              <path
                d="M12 9L23 16L12 23V9Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="navbar__logo-text">
            <div className="navbar__logo-title">
              <span className="navbar__logo-stream">Stream</span>
              <span className="navbar__logo-savvy">Savvy</span>
            </div>
            <div className="navbar__logo-tagline">PREMIUM ENTERTAINMENT</div>
          </div>
        </Link>

        <nav className="navbar__links">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              end={link.exact}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <form className="navbar__search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search titles..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {isSupported && (
            <motion.button
              type="button"
              className={`navbar__voice ${isListening ? 'is-listening' : ''}`}
              onClick={handleVoiceClick}
              aria-label={isListening ? 'Stop voice search' : 'Start voice search'}
              whileTap={{ scale: 0.95 }}
            >
              {isListening ? <FiMicOff /> : <FiMic />}
            </motion.button>
          )}
          <button type="submit" aria-label="Search StreamSavvy">
            <FiSearch />
          </button>
        </form>

        <div className="navbar__actions">
          <button
            className="navbar__theme-toggle"
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>

          <div className="navbar__notifications" ref={notificationsRef}>
            <button
              type="button"
              className="navbar__icon-button"
              aria-label="Notifications"
              onClick={() => setNotificationsOpen((prev) => !prev)}
            >
              <FiBell />
              {unreadCount > 0 && (
                <span className="navbar__icon-badge">{Math.min(unreadCount, 9)}</span>
              )}
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  className="navbar__notifications-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="navbar__notifications-header">Notifications</div>
                  <div className="navbar__notifications-list">
                    {notificationsToDisplay.length === 0 ? (
                      <div className="navbar__notifications-empty">You're all caught up!</div>
                    ) : (
                      notificationsToDisplay.map((notification) => (
                        <div key={notification.id} className="navbar__notification-item">
                          <div className="navbar__notification-title">{notification.title}</div>
                          <div className="navbar__notification-message">{notification.message}</div>
                          {notification.timestamp && (
                            <div className="navbar__notification-time">
                              {new Date(notification.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="navbar__profile" ref={profileRef}>
            <button
              type="button"
              className="navbar__profile-trigger"
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-label="User menu"
            >
              <div className="navbar__profile-avatar">
                <span>{initials}</span>
              </div>
              <FiChevronDown
                className={`navbar__profile-caret ${profileOpen ? 'is-open' : ''}`}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  className="navbar__profile-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="navbar__profile-summary">
                    <div className="navbar__profile-summary-avatar">
                      <FiUser />
                    </div>
                    <div className="navbar__profile-summary-info">
                      <span>{displayName}</span>
                      <small>Premium Member</small>
                    </div>
                  </div>
                  <div className="navbar__profile-divider" />
                  <div className="navbar__profile-items">
                    {profileMenuItems.map(({ key, label, Icon, destructive }) => (
                      <button
                        key={key}
                        type="button"
                        className={`navbar__profile-item ${destructive ? 'is-destructive' : ''}`}
                        onClick={() => handleProfileOptionClick(key)}
                      >
                        <Icon aria-hidden="true" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className="navbar__search-toggle"
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            aria-label="Open search"
          >
            <FiSearch />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.form
            className="navbar__mobile-search"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="text"
              placeholder="Search titles..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit">
              <FiSearch />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;


