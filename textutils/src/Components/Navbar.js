import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ title = 'Default Title', about = 'About', themes, currentTheme, setTheme }) {
  const theme = themes[currentTheme];

  const showTheme = (key) => {
    setTheme(key);
    document.body.style.backgroundColor = themes[key].bg;
    document.body.style.color = themes[key].text;
    document.title = `TextUtils - ${key.charAt(0).toUpperCase() + key.slice(1)} Theme`;
  }
  return (
      <nav className={`navbar navbar-expand navbar-${theme.navbar}`} style={{ backgroundColor: theme.bg, borderBottom: `3px solid ${theme.text}` }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">{title}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">{about}</Link>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-primary" type="submit">Search</button>
            </form>
            {/* <div className={`form-check form-switch mx-3 text-${theme.navbar === 'light' ? 'dark' : 'light'}`}>
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
            </div> */}
            <div className="d-flex align-items-center mx-3" style={{ gap: '8px' }}>
                {Object.keys(themes).map((key) => (
                    <button
                        key={key}
                        onClick={() => showTheme(key)}
                        title={key}
                        style={{
                            backgroundColor: themes[key].bg,
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            border: currentTheme === key ? '3px solid #fff' : '2px solid #aaa',
                            cursor: 'pointer',
                            padding: 0,
                            outline: currentTheme === key ? '2px solid #333' : 'none'
                        }}
                    />
                ))}
            </div>            
          </div>
        </div>
      </nav>   
    )
}
