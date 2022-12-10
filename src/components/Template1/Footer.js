import React from 'react'

const Footer = ({data}) => {
  return (
    <footer className="dark-wrapper inverse-text">
            <div className="sub-footer">
              <div className="container inner pt-50 pb-50 text-center">
                <p>© 2022 All rights reserved</p>
                <div className="space20" />
                <ul className="social social-bg social-s">
                  <li>
                    <a href={data.youtube}>
                      <i className="et-youtube" />
                    </a>
                  </li>

                  <li>
                    <a href={data.instagram}>
                      <i className="et-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
  )
}

export default Footer