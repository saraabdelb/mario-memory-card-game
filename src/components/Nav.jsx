import React from 'react';

function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-md">
        <div className="container">
          <a className="navbar-brand" href="">
            <img src="./assets/mario_logo.png" alt="Mario Logo" className="navbar-brand" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link game-btn" href="">
                  Game
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
